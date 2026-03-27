import moment from 'moment';
import {Alert} from 'react-native';
import {DeleteScheduleApi} from '../../../../Redux/API/DeleteScheduleApi';
import {GetScheduleApi} from '../../../../Redux/API/GetScheduleApi';

export const handleSelectJob = (
  selectCustomer,
  startTime,
  setSelectCustomer,
  setCust,
  setEndTime,
  setSelectDropdownVisbile,
) => {
  if (selectCustomer) {
    setSelectCustomer(selectCustomer?.customer_name || '');
    setCust(selectCustomer);

    if (startTime) {
      const getTimeEst = job => {
        if (job?.commercial_job?.length) return job.commercial_job[0].timeEst;
        if (job?.residential_job?.length) return job.residential_job[0].timeEst;
          if (
    job?.category_type === 'storefront' &&
    job.trading_hours_start &&
    job.trading_hours_end
  ) {
    const start = moment(job.trading_hours_start, ['hh:mm A', 'h:mm A']);
    const end = moment(job.trading_hours_end, ['hh:mm A', 'h:mm A']);

    if (start.isValid() && end.isValid()) {
      const diffInMinutes = end.diff(start, 'minutes');
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      const formatted = `${hours}:${minutes.toString().padStart(2, '0')}`;

      return formatted;
    } else {
      console.warn('Invalid trading hours:', {
        start: job.trading_hours_start,
        end: job.trading_hours_end,
      });
    }
  }
        return null;
      };

      const timeEst = getTimeEst(selectCustomer);
      if (!timeEst) return;

      const [estHours, estMinutes] = timeEst.split(':').map(Number);
      const totalEstMinutes = estHours * 60 + estMinutes;

      let hour24 = parseInt(startTime.hour);
      let minute = parseInt(startTime.minute);
      if (startTime.daySection === 'PM' && hour24 !== 12) hour24 += 12;
      if (startTime.daySection === 'AM' && hour24 === 12) hour24 = 0;

      const startTimeMoment = moment(`${hour24}:${minute}`, 'HH:mm');
      startTimeMoment.add(totalEstMinutes, 'minutes');

      const maxEndTime = moment('23:00', 'HH:mm');
      if (startTimeMoment.isAfter(maxEndTime)) {
        startTimeMoment.hour(23);
        startTimeMoment.minute(0);
      }

      let nextHour24 = startTimeMoment.hours();
      const nextMinute = startTimeMoment.minutes();
      const nextPeriod = nextHour24 >= 12 ? 'PM' : 'AM';
      if (nextHour24 > 12) {
        nextHour24 -= 12;
      } else if (nextHour24 === 0) {
        nextHour24 = 12;
      }

      const formattedEndTime = {
        daySection: nextPeriod,
        hour: nextHour24.toString(),
        minute: nextMinute.toString().padStart(2, '0'),
      };

      setEndTime(formattedEndTime);
    }
  }
  setSelectDropdownVisbile(false);
};

export const handleBookingShow = (
  event,
  navigation,
  setUpdate,
  openUpdateScheduleModal,
  setTitle,
  setAddress,
  setSelectedType,
  setFreeBooking,
) => {
  if (event?.customer_id) {
    navigation.navigate('BookingDetail', {event});
  } else {
    setUpdate(true);
    openUpdateScheduleModal(event.start_time, event.end_time);
    setTitle(event.customer_name);
    setAddress(event.customer_address);
    setSelectedType(event.type || 'Meeting');
    setFreeBooking(event);
  }
};

export const handleDelete = async (
  customerOrBooking,
  dispatch,
  setDeleteAlertVisible,
  LoginData,
) => {
  const id = LoginData?.user?.id;
  const token = LoginData.token;
  const franchiseid = {
    franchise_id: id,
  };
  const isSlotBooking = customerOrBooking.customer_name === 'Slot Booked';
  const message = isSlotBooking
    ? 'Do you really want to delete this booked slot?'
    : `Do you really want to delete the schedule for ${customerOrBooking.customer_name}?`;
  const title = isSlotBooking
    ? 'Delete Booking?'
    : `${customerOrBooking.customer_name} 😊`;

  Alert.alert(
    title,
    message,
    [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: async () => {
          dispatch(DeleteScheduleApi(customerOrBooking.id))
            .then(res => {
              if (res.payload.status === true) {
                dispatch(GetScheduleApi({token, franchiseid}));
                setDeleteAlertVisible(true);
              } else {
                Alert.alert(
                  'Error',
                  res.payload.message || 'Failed to delete schedule.',
                );
              }
            })
            .catch(err => {
              console.error('Delete failed:', err);
              Alert.alert('Error', 'An error occurred during deletion.');
            });
        },
      },
    ],
    {cancelable: true},
  );
};

export const parseSelectedQuote = selectedQuote => {
  if (!selectedQuote) return null;
  try {
    return {
      ...selectedQuote,
      commercial_job: JSON.parse(selectedQuote.commercial_job || '[]'),
      residential_job: JSON.parse(selectedQuote.residential_job || 'null'),
      storefront_job: JSON.parse(selectedQuote.storefront_job || 'null'),
      image: JSON.parse(selectedQuote.image || '[]'),
      swms: JSON.parse(selectedQuote.swms || '[]'),
      created_at: selectedQuote.created_at
        ? selectedQuote.created_at.split('.')[0] + 'Z'
        : null,
    };
  } catch (e) {
    console.error('Error parsing quotation JSON:', e, selectedQuote);
    return selectedQuote;
  }
};

export const formatTime = time => {
  if (
    !time ||
    typeof time !== 'object' ||
    !time.hour ||
    !time.minute ||
    !time.daySection
  ) {
    console.warn('Invalid time object passed to formatTime:', time);
    const now = moment();
    return `${now.format('h')}:${now.format('mm')} ${now.format('A')}`;
  }
  const minute = time.minute.toString().padStart(2, '0');
  return `${time.hour}:${minute} ${time.daySection}`;
};

export const calculateTotalTimeEst = customer => {
  if (!customer) return {hours: 1, minutes: 0};

  let totalHours = 0;
  let totalMinutes = 0;
  let timeEst = null;

  if (customer?.commercial_job?.length)
    timeEst = customer.commercial_job[0]?.timeEst;
  else if (customer?.residential_job?.length)
    timeEst = customer.residential_job[0]?.timeEst;
  else if (customer?.storefront_job?.length)
    timeEst = customer.storefront_job[0]?.timeEst;
  else if (
    customer?.category_type === 'storefront' &&
    customer.trading_hours_start &&
    customer.trading_hours_end
  ) {
    const start = moment(customer.trading_hours_start, 'hh:mm A');
    const end = moment(customer.trading_hours_end, 'hh:mm A');
    if (start.isValid() && end.isValid()) {
      const durationMinutes = end.diff(start, 'minutes');
      timeEst = `${Math.floor(durationMinutes / 60)}:${(durationMinutes % 60)
        .toString()
        .padStart(2, '0')}`;
    }
  }

  if (timeEst) {
    const [hours, minutes] = timeEst.split(':').map(Number);
    totalHours += hours;
    totalMinutes += minutes;
  } else {
    totalHours = 1;
    totalMinutes = 0;
  }

  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes %= 60;

  return {
    hours: totalHours,
    minutes: totalMinutes,
  };
};
