import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Colors from '../../../Assets/Style/Color';
import {useSelector} from 'react-redux';

const HOUR_HEIGHT = 70;
const TOTAL_HOURS = 24;
const CALENDAR_START_HOUR = 0;

const getMinutesSinceMidnight = timeString => {
  const time = moment(timeString, 'h:mm A');
  if (!time.isValid()) return 0;
  return time.diff(time.clone().startOf('day'), 'minutes');
};

const getEventDurationInMinutes = (start, end) => {
  const startMoment = moment(start, 'h:mm A');
  const endMoment = moment(end, 'h:mm A');
  if (!startMoment.isValid() || !endMoment.isValid()) return 0;

  if (endMoment.isBefore(startMoment)) {
    return moment
      .duration(endMoment.add(1, 'day').diff(startMoment))
      .asMinutes();
  }
  return endMoment.diff(startMoment, 'minutes');
};

const colorCategories = [
  {name: 'Residential', color: Colors.green_color},
  {name: 'StoreFront', color: Colors.blue_theme_Color},
  {name: 'Quote', color: Colors.banana_Yellow_color},
  {name: 'Reserved', color: Colors.gray_text_color},
  {name: 'Commercial', color: Colors.Neon_Pink_Theme_Color},
  {name: 'Meeting', color: Colors.pink_theme_color},
];

const RenderItemComponent = ({
  scheduleList,
  date,
  handleTimeSelect,
  handleDelete,
  handleView,
  handleBookingShow,
  navigation,
  setUpdate,
  openUpdateScheduleModal,
  setTitle,
  setAddress,
  setSelectedType,
  setFreeBooking,
  dispatch,
  setDeleteAlertVisible,
}) => {
  const {LoginData} = useSelector(state => state.Login);
  const dailySchedules = scheduleList.filter(
    schedule => schedule.date === date,
  );

  const timeSlots = Array.from({length: TOTAL_HOURS}, (_, i) => {
    const hour = (CALENDAR_START_HOUR + i) % 24;
    return {
      label: moment().hour(hour).minute(0).format('h A'),
      hour: hour,
    };
  });
  const capitalizeFirstLetter = str => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.timeColumn}>
          {timeSlots.map((slot, index) => (
            <View
              key={`time-${index}`}
              style={[styles.timeSlotLabelContainer, {height: HOUR_HEIGHT}]}>
              <Text style={styles.timeLabel}>{slot.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.scheduleArea}>
          {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={`grid-${index}`}
              style={[styles.timeSlotGridLine, {height: HOUR_HEIGHT}]}
              onPress={() => {
                const startTime = moment()
                  .hour(slot.hour)
                  .minute(0)
                  .format('h:mm A');
                if (handleTimeSelect) handleTimeSelect(null, startTime);
              }}
              activeOpacity={0.2}></TouchableOpacity>
          ))}

          {dailySchedules.map(event => {
            if (!event.start_time || !event.end_time) return null;

            const startMinutes = getMinutesSinceMidnight(event.start_time);
            const durationMinutes = getEventDurationInMinutes(
              event.start_time,
              event.end_time,
            );

            if (durationMinutes <= 0) return null;

            const topPosition = (startMinutes / 60) * HOUR_HEIGHT;
            const eventHeight = Math.max(
              (durationMinutes / 60) * HOUR_HEIGHT,
              20,
            );

            const backgroundColor =
              colorCategories.find(category => {
                const categoryName = category?.name?.toLowerCase();
                const isCustomerMissing =
                  event?.customer_id === null ||
                  event?.customer_id === undefined;

                const matchType = isCustomerMissing
                  ? event?.type?.toLowerCase()
                  : event?.quotation?.category_type?.toLowerCase();

                return categoryName === matchType;
              })?.color ||
              (!event?.customer_id && Colors.gray_text_color);

            return (
              <View
                key={event.id || `event-${event.start_time}`}
                style={[
                  styles.eventBlock,
                  {
                    top: topPosition,
                    height: eventHeight,
                    backgroundColor: backgroundColor,
                  },
                ]}>
                <TouchableOpacity
                  style={styles.eventContentTouchable}
                  onPress={() =>
                    handleBookingShow(
                      event,
                      navigation,
                      setUpdate,
                      openUpdateScheduleModal,
                      setTitle,
                      setAddress,
                      setSelectedType,
                      setFreeBooking,
                    )
                  }
                  activeOpacity={0.8}>
                  {/** 🧍 Customer Name or Slot Booked */}
                  <Text style={styles.eventTextBold} numberOfLines={1}>
                    {event?.customer_id != null && '🧍 '}
                    {capitalizeFirstLetter(event.customer_name) ||
                      'Slot Booked'}{' '}
                    {'\n'}
                  </Text>

                  {/** 🕛 Time Range */}
                  {eventHeight > 35 && (
                    <Text style={styles.eventTextBold}>
                      {event?.customer_id != null && '🕛 '}
                      {event.start_time} - {event.end_time}
                    </Text>
                  )}

                  {/** 🏡 Quotation Address */}
                  {eventHeight > 50 &&
                    event.quotation?.category_address &&
                    !event?.customer_address && (
                      <Text style={[styles.eventTextBold, {width: 230}]}>
                        {event?.customer_id != null && '🏡 '}
                        {capitalizeFirstLetter(
                          event.quotation.category_address,
                        )}
                      </Text>
                    )}

                  {/** 🏡 Customer Address */}
                  {eventHeight > 50 && event?.customer_address && (
                    <Text
                      style={[
                        styles.eventTextBold,
                        eventHeight > 70 ? {width: 230} : null,
                      ]}>
                      {event?.customer_id != null && '🏡 '}
                      {capitalizeFirstLetter(event.customer_address)}
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    handleBookingShow(
                      event,
                      navigation,
                      setUpdate,
                      openUpdateScheduleModal,
                      setTitle,
                      setAddress,
                      setSelectedType,
                      setFreeBooking,
                    )
                  }
                  style={
                    event?.customer_id ? styles.editIcon : styles.editIcon1
                  }>
                  <VectorIcon
                    icon="MaterialIcons"
                    name="edit"
                    size={22}
                    color={Colors.white_Icon_Color || '#fff'}
                  />
                </TouchableOpacity>

                {handleView && event?.customer_id && (
                  <TouchableOpacity
                    onPress={() => handleView(event)}
                    style={styles.eventEyeButton}
                    hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                    <VectorIcon
                      icon="AntDesign"
                      name="eye"
                      size={22}
                      color={Colors.white_Icon_Color || '#fff'}
                    />
                  </TouchableOpacity>
                )}

                {handleDelete && (
                  <TouchableOpacity
                    onPress={() =>
                      handleDelete(
                        event,
                        dispatch,
                        setDeleteAlertVisible,
                        LoginData,
                      )
                    }
                    style={styles.eventDeleteButton}
                    hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                    <VectorIcon
                      icon="MaterialIcons"
                      name="delete"
                      size={22}
                      color={Colors.white_Icon_Color || '#fff'}
                    />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.black_bg_Theme,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  timeColumn: {
    width: 60,
    paddingHorizontal: 5,
  },
  timeSlotLabelContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 2,
  },
  timeLabel: {
    fontSize: 12,
    color: Colors.white_text_color,
  },
  scheduleArea: {
    flex: 1,
    position: 'relative',
    borderLeftWidth: 1,
    borderLeftColor: Colors.text_color,
  },
  timeSlotGridLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.text_color,
  },
  eventBlock: {
    position: 'absolute',
    left: 3,
    right: 3,
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    overflow: 'hidden',
    zIndex: 10,
  },
  eventContentTouchable: {
    flex: 1,
  },
  eventTextBold: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 2,
  },
  eventText: {
    color: '#fff',
    fontSize: 11,
    marginBottom: 1,
  },
  eventEyeButton: {
    position: 'absolute',
    top: 4,
    right: 33,
    padding: 4,
    zIndex: 11,
  },
  editIcon: {
    position: 'absolute',
    top: 4,
    right: 60,
    padding: 4,
    zIndex: 11,
  },
  editIcon1: {
    position: 'absolute',
    top: 4,
    right: 40,
    padding: 4,
    zIndex: 11,
  },
  eventDeleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    padding: 4,
    zIndex: 11,
  },
});

export default RenderItemComponent;
