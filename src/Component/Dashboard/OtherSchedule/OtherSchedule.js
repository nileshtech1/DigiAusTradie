import React, {useState} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import Header from '../../../ReusableComponent/Header';
import Colors from '../../../Assets/Style/Color';
import {useDispatch, useSelector} from 'react-redux';
import {CreateScheduleApi} from '../../../Redux/API/CreateScheduleApi';
import {useNavigation} from '@react-navigation/native';
import {GetScheduleApi} from '../../../Redux/API/GetScheduleApi';
import OtherScheduleStyle from '../../../utils/Stylesheet/OtherScheduleStyle';
import {DeleteScheduleApi} from '../../../Redux/API/DeleteScheduleApi';
import moment from 'moment';
import ScheduleModal from './ScheduleModal';
import RenderItemComponent from './RenderItemComponent';
import OtherQuoteModal from './OtherQuoteView';
import {UpdateScheduleApi} from '../../../Redux/API/UpdateScheduleApi';
import ToastAlert from '../../../ReusableComponent/ToastAlert';
import useCustomerData from './hooks/useCustomerData';
import useScheduleList from './hooks/useScheduleList';
import useQuotationList from './hooks/useQuotationList';
import {
  calculateTotalTimeEst,
  formatTime,
  handleBookingShow,
  handleDelete,
  handleSelectJob,
  parseSelectedQuote,
} from './Utils/scheduleUtils';
import { GetAllScheduleApi } from '../../../Redux/API/GetAllScheduleListApi';

const OtherSchedule = ({route}) => {
  const {QuotationList} = useSelector(state => state.QuotationList);
  const {LoginData} = useSelector(state => state.Login);
  const {DeleteScheduleLoading} = useSelector(state => state.DeleteSchedule);
  const {ScheduleList} = useSelector(state => state.ScheduleList);
  const {customerData, date} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalToastVisible, setModalToastVisible] = useState(false);
  const [isModalToastVisible1, setModalToastVisible1] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [initialEndTime, setInitialEndTime] = useState(null);
  const [selectedType, setSelectedType] = useState('Job');
  const [customerlist, setCustomerList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [cust, setCust] = useState([]);
  const [selectCustomer, setSelectCustomer] = useState('');
  const {createScheduleLoading} = useSelector(state => state.CreateSchedule);
  const [selectDropdownVisbile, setSelectDropdownVisbile] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [changeAddressToggled, setChangeAddressToggled] = useState(false);
  const [update, setUpdate] = useState(false);
  const [freeBooking, setFreeBooking] = useState('');
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const {UpdateScheduleLoading} = useSelector(state => state.UpdateSchedule);

  useCustomerData(
    customerData,
    startTime,
    date,
    setEndTime,
    setSelectCustomer,
    setCust,
  );
  useScheduleList(ScheduleList, setScheduleList);
  useQuotationList(QuotationList, scheduleList, date, setCustomerList);

  const showTimeSlotAlert = startTimeStr => {
    const startMoment = moment(startTimeStr, 'h:mm A');
    const defaultEndTimeStr = startMoment
      .clone()
      .add(1, 'hour')
      .format('h:mm A');
    openScheduleModalForEmptySlot(startTimeStr);
  };

  const openUpdateScheduleModal = (startTimeStr, endTimeStr) => {
    const startMoment = moment(startTimeStr, 'h:mm A');
    const endMoment = moment(endTimeStr, 'h:mm A');

    setStartTime({
      hour: startMoment.format('h'),
      minute: startMoment.format('mm'),
      daySection: startMoment.format('A'),
    });

    setEndTime({
      hour: endMoment.format('h'),
      minute: endMoment.format('mm'),
      daySection: endMoment.format('A'),
    });

    setInitialEndTime({
      hour: endMoment.format('h'),
      minute: endMoment.format('mm'),
      daySection: endMoment.format('A'),
    });

    setSelectCustomer('');
    setCust(null);
    setModalVisible(true);
  };

  const openScheduleModalForEmptySlot = startTimeStr => {
    const startMoment = moment(startTimeStr, 'h:mm A');
    const defaultEndTimeMoment = startMoment.clone().add(1, 'hour');

    setStartTime({
      hour: startMoment.format('h'),
      minute: startMoment.format('mm'),
      daySection: startMoment.format('A'),
    });

    setEndTime({
      hour: defaultEndTimeMoment.format('h'),
      minute: defaultEndTimeMoment.format('mm'),
      daySection: defaultEndTimeMoment.format('A'),
    });
    setInitialEndTime({
      hour: defaultEndTimeMoment.format('h'),
      minute: defaultEndTimeMoment.format('mm'),
      daySection: defaultEndTimeMoment.format('A'),
    });

    setSelectCustomer('');
    setCust(null);
    setModalVisible(true);
    setSelectedType('Job');
  };

  const handleTimeSelect = (customerName, startTimeStr, event = null) => {
    if (customerName === 'Slot Booked') {
      Alert.alert(
        'Slot Booked',
        'This time slot is marked as booked. Please delete the booking if you want to schedule a job here.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete Booking',
            onPress: () =>
              event
                ? handleDelete(event)
                : Alert.alert('Error', 'Cannot find booking to delete.'),
          },
        ],
      );
    } else if (customerName) {
      setSelectCustomer(customerName);
      const tappedEvent = scheduleList.find(e => e.id === event?.id) || event;

      if (!tappedEvent) {
        console.error(
          'Could not find event details for:',
          customerName,
          startTimeStr,
        );
        Alert.alert('Error', 'Could not load event details.');
        return;
      }

      const startMoment = moment(tappedEvent.start_time, 'h:mm A');
      setStartTime({
        hour: startMoment.format('h'),
        minute: startMoment.format('mm'),
        daySection: startMoment.format('A'),
      });

      const endMoment = moment(tappedEvent.end_time, 'h:mm A');
      setEndTime({
        hour: endMoment.format('h'),
        minute: endMoment.format('mm'),
        daySection: endMoment.format('A'),
      });
      setInitialEndTime({
        hour: endMoment.format('h'),
        minute: endMoment.format('mm'),
        daySection: endMoment.format('A'),
      });

      setCust(
        tappedEvent.quotation || {
          customer_name: tappedEvent.customer_name,
          id: tappedEvent.quotation_id,
          customer_id: tappedEvent.customer_id,
        },
      );

      setModalVisible(true);
    } else {
      showTimeSlotAlert(startTimeStr);
    }
  };

  const handleView = async customer => {
    if (!customer?.quotation) {
      Alert.alert(
        'No Details',
        'No quotation details available for this schedule entry.',
      );
      return;
    }
    const formattedData = parseSelectedQuote(customer.quotation);
    if (formattedData) {
      setSelectedQuote(formattedData);
      setModalVisible1(true);
    } else {
      Alert.alert('Error', 'Could not process quotation details.');
    }
  };

  const handleUpdate = async () => {
    if (
  selectedType === 'Quote' ||
  (selectedType === 'Job' && !freeBooking.customer_id)
){
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(endTime);
      const id = LoginData?.user?.id;
      const token = LoginData.token;
      const franchiseid = {
        franchise_id: id,
      };

      let postData = {};

      if (selectedType === 'Meeting') {
        postData = {
          franchise_id: id,
          quotation_id: '',
          customer_id: '',
          customer_name: title,
          customer_address: address,
          date: date,
          start_time: formattedStartTime,
          end_time: formattedEndTime,
          type: selectedType,
        };

        if (
          !title ||
          !address ||
          !date ||
          !formattedStartTime ||
          !formattedEndTime
        ) {
          Alert.alert(
            'Missing Information',
            'Please enter title, address, date, and both start and end times for the Meeting.',
          );
          return;
        }
      } else if (selectedType === 'Quote') {
        postData = {
          franchise_id: id,
          quotation_id: '',
          customer_id: '',
          customer_name: title,
          customer_address: address,
          date: date,
          start_time: formattedStartTime,
          end_time: formattedEndTime,
          type: selectedType,
        };

        if (
          !title ||
          !address ||
          !date ||
          !formattedStartTime ||
          !formattedEndTime
        ) {
          Alert.alert(
            'Missing Information',
            'Please enter title, address, date, and both start and end times for the Meeting.',
          );
          return;
        }
      } else if (selectedType === 'Job') {
        postData = {
          franchise_id: id,
          quotation_id: cust?.id || customerData?.id,
          customer_id:
            cust?.customer_id ||
            customerData?.customer?.id ||
            customerData?.customer_id,
          customer_name:
            cust?.customer_name || customerData?.customer_name || 'Job',
          date: date,
          start_time: formattedStartTime,
          customer_address: updatedAddress,
          end_time: formattedEndTime,
          type: selectedType,
        };
      }

      setModalVisible(false);

      try {
        dispatch(DeleteScheduleApi(freeBooking?.id)).then(res => {
          if (res.payload.status === true) {
            dispatch(CreateScheduleApi(postData)).then(res => {
              console.log('res 1', res.payload);
              if (res.payload?.status === true) {
                if (res.payload?.status === true) {
                  const id = LoginData?.user?.id;
                  const token = LoginData.token;
                  const franchiseid = {
                    franchise_id: id,
                  };
                  console.log('helloooo calling get schedule api 1');
                  
                  dispatch(GetScheduleApi({token, franchiseid}));
                  dispatch(GetAllScheduleApi({token, franchiseid}));
                  setCust(null);
                  setSelectCustomer('');
                  setStartTime(null);
                  setEndTime(null);
                  setAddress('');
                  setTitle('');
                  setUpdate(false);
                  setSelectedType('Job');
                  setChangeAddressToggled(false);
                  if (selectedType === 'Job') {
                    setModalToastVisible(true);
                  } else {
                    setModalToastVisible1(true);
                  }
                } else {
                  Alert.alert(
                    'Save Failed',
                    res.payload?.message || 'Could not save the schedule.',
                  );
                }
              }
            });
          }
        });
      } catch (error) {
        console.error('Error saving schedule:', error);
        Alert.alert('Error', 'An error occurred while saving the schedule.');
      }
    } else {
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(endTime);
      const postData = {
        id: freeBooking?.id,
        customer_name: title,
        type: selectedType,
        date: freeBooking?.date,
        customer_address: address,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
      };
      setModalVisible(false);
      const id = LoginData?.user?.id;
      const franchiseid = {
        franchise_id: id,
      };
      const token = LoginData.token;

      dispatch(UpdateScheduleApi(postData))
        .then(res => {
          if (res.payload?.status === true) {
            dispatch(GetScheduleApi({token, franchiseid}));
            setCust(null);
            setSelectCustomer('');
            setStartTime(null);
            setEndTime(null);
            setAddress('');
            setTitle('');
            setSelectedType('Job');
            setChangeAddressToggled(false);
            setUpdate(false);
            setUpdateModalVisible(true);
          }
        })
        .catch(error => {
          console.error('Error updating booking:', error);
        });
    }
  };

  const handleSave = async () => {
    if (update === true) {
      handleUpdate();
      return;
    }
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
    const id = LoginData?.user?.id;
    const token = LoginData.token;
    const franchiseid = {
      franchise_id: id,
    };

    let postData = {};

    if (selectedType === 'Meeting') {
      postData = {
        franchise_id: id,
        quotation_id: '',
        customer_id: '',
        customer_name: title,
        customer_address: address,
        date: date,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        type: selectedType,
      };

      if (
        !title ||
        !address ||
        !date ||
        !formattedStartTime ||
        !formattedEndTime
      ) {
        Alert.alert(
          'Missing Information',
          'Please enter title, address, date, and both start and end times for the Meeting.',
        );
        return;
      }
    } else if (selectedType === 'Quote') {
      postData = {
        franchise_id: id,
        quotation_id: '',
        customer_id: '',
        customer_name: title,
        customer_address: address,
        date: date,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        type: selectedType,
      };

      if (
        !title ||
        !address ||
        !date ||
        !formattedStartTime ||
        !formattedEndTime
      ) {
        Alert.alert(
          'Missing Information',
          'Please enter title, address, date, and both start and end times for the Meeting.',
        );
        return;
      }
    } else if (selectedType === 'Job') {
      postData = {
        franchise_id: id,
        quotation_id: cust?.id || customerData?.id || '',
        customer_id:
          cust?.customer_id ||
          customerData?.customer?.id ||
          customerData?.customer_id ||
          '',
        customer_name:
          cust?.customer_name || customerData?.customer_name || 'Job',
        date: date,
        start_time: formattedStartTime,
        customer_address: updatedAddress,
        end_time: formattedEndTime,
        type: selectedType,
      };
    }

    setModalVisible(false);

    try {
      const res = await dispatch(CreateScheduleApi(postData));
      console.log('res 2', res.payload);
      
      if (res.payload?.status === true) {
        if (selectedType === 'Job') {
          setModalToastVisible(true);
        } else {
          setModalToastVisible1(true);
        }
        dispatch(GetScheduleApi({token, franchiseid}));
        dispatch(GetAllScheduleApi({token, franchiseid}));
        setCust(null);
        setSelectCustomer('');
        setStartTime(null);
        setEndTime(null);
        setAddress('');
        setTitle('');
        setSelectedType('Job');
        setChangeAddressToggled(false);
      } else {
        Alert.alert(
          'Save Failed',
          res.payload?.message || 'Could not save the schedule.',
        );
      }
    } catch (error) {
      console.error('Error saving schedule:', error);
      Alert.alert('Error', 'An error occurred while saving the schedule.');
    }
  };

  const handleRemove = () => {
    setSelectCustomer('');
    setCust(null);
    setSelectDropdownVisbile(!selectDropdownVisbile);
    setChangeAddressToggled(false);
    if (startTime) {
      const startMoment = moment(
        `${startTime.hour}:${startTime.minute} ${startTime.daySection}`,
        'h:mm A',
      );
      const defaultEndTimeMoment = startMoment.clone().add(1, 'hour');
      setEndTime({
        hour: defaultEndTimeMoment.format('h'),
        minute: defaultEndTimeMoment.format('mm'),
        daySection: defaultEndTimeMoment.format('A'),
      });
    }
  };

  return (
    <View style={OtherScheduleStyle.container}>
      {createScheduleLoading && (
        <View style={OtherScheduleStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
          <Text style={OtherScheduleStyle.loaderText}>
            Creating Schedule...
          </Text>
        </View>
      )}

      {DeleteScheduleLoading && (
        <View style={OtherScheduleStyle.loaderContainer}>
          <ActivityIndicator color={Colors.red_crayola_color} size={100} />
        </View>
      )}

      {UpdateScheduleLoading && (
        <View style={OtherScheduleStyle.loaderContainer}>
          <ActivityIndicator color={Colors.green_color} size={100} />
        </View>
      )}

      <Header notificationIcon={true} backButton={true} route="Schedule" />
      <View style={OtherScheduleStyle.contentContainer}>
        <Text style={OtherScheduleStyle.header}>
          Schedule for {moment(date).format('LL') || 'Selected Date'}
        </Text>

        <RenderItemComponent
          scheduleList={scheduleList}
          date={date}
          handleTimeSelect={handleTimeSelect}
          handleDelete={handleDelete}
          handleView={handleView}
          handleBookingShow={handleBookingShow}
          navigation={navigation}
          setUpdate={setUpdate}
          openUpdateScheduleModal={openUpdateScheduleModal}
          setTitle={setTitle}
          setAddress={setAddress}
          setSelectedType={setSelectedType}
          setFreeBooking={setFreeBooking}
          dispatch={dispatch}
          setDeleteAlertVisible={setDeleteAlertVisible}
        />
      </View>
      <ScheduleModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        date={date}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        selectCustomer={selectCustomer}
        setSelectCustomer={setSelectCustomer}
        customerlist={customerlist}
        handleSave={handleSave}
        cust={cust}
        calculateTotalTimeEst={calculateTotalTimeEst}
        setSelectDropdownVisbile={setSelectDropdownVisbile}
        selectDropdownVisbile={selectDropdownVisbile}
        handleSelectJob={handleSelectJob}
        handleRemove={handleRemove}
        title={title}
        setTitle={setTitle}
        setAddress={setAddress}
        address={address}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
        setUpdatedAddress={setUpdatedAddress}
        updatedAddress={updatedAddress}
        setChangeAddressToggled={setChangeAddressToggled}
        changeAddressToggled={changeAddressToggled}
        setCust={setCust}
      />
      <ToastAlert
        message="Job Added"
        visible={isModalToastVisible}
        onClose={() => setModalToastVisible(false)}
      />
      <ToastAlert
        message="Slot Booked"
        visible={isModalToastVisible1}
        onClose={() => setModalToastVisible1(false)}
      />
      <ToastAlert
        message="Booking Updated"
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
      />
      {deleteAlertVisible && (
        <ToastAlert
          message="Deleted Successfully"
          visible={deleteAlertVisible}
          onClose={() => setDeleteAlertVisible(false)}
        />
      )}

      {/* <ConfirmationAlert
        isVisible={updateModalVisible}
        onOK={onPressOkUpdate}
        successAnimation={successAnimation}
        message="Booking Updated"
        okText="OK"
        showCancelButton={false}
      /> */}
      {selectedQuote && (
        <OtherQuoteModal
          visible={isModalVisible1}
          onClose={() => setModalVisible1(false)}
          selectedQuote={selectedQuote}
        />
      )}
    </View>
  );
};

export default OtherSchedule;
