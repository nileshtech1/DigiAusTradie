import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import VectorIcon from './VectorIcon';
import Colors from '../Assets/Style/Color';
import { logo, logo2, logo3, MainLogo, profileImagePlaceholder2 } from '../Assets/Images';
import { useTimer } from './TimerContext';
import { useSelector, useDispatch } from 'react-redux';
import HeaderStyle from '../utils/Stylesheet/HeaderStyle';
import { loadReadNotifications } from '../Redux/Slice/readNotificationsSlice';

const Header = ({
  notificationIcon = false,
  backButton = false,
  route = null,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { elapsedTime, startTimer, stopTimer, setElapsedTime, isRunning } = useTimer();
  const { timeTrackerData } = useSelector(state => state.GetTimeTracking);
  const { NotificationQuoteStatusUpdateData } = useSelector(
    state => state.Notification,
  );
  const {GetFinishedJobData} = useSelector(state => state.GetFinishedJob);
  const { readNotifications } = useSelector(state => state.readNotifications);
  const [notificationCount, setNotificationCount] = useState(0);

  const convertToDate = (timeString, date) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return new Date(date.setHours(hours, minutes, 0, 0));
  };
  // console.log(timeTrackerData, 'timeTrackerData');
  
  useEffect(() => {
    if (
      timeTrackerData?.TimeTrack?.start_time &&
      timeTrackerData?.TimeTrack?.status == 'active'
    ) {
      const startTimeString = timeTrackerData?.TimeTrack?.start_time;
      const startTimeDate = convertToDate(startTimeString, new Date());
      const now = new Date();
      const diffInSeconds = Math.floor((now - startTimeDate) / 1000);
      setElapsedTime(diffInSeconds);
      startTimer();
    } else {
      stopTimer();
    }
  }, [timeTrackerData]);

  useEffect(() => {
    dispatch(loadReadNotifications());
  }, [dispatch]);

  useEffect(() => {
    const updateNotificationCount = () => {
      try {
        const { already_accepted_quotes } = NotificationQuoteStatusUpdateData || {};
        if (!already_accepted_quotes?.length) {
          setNotificationCount(0);
          return;
        }

        const today = new Date();
        const fiveDaysAgo = new Date(today);
        fiveDaysAgo.setDate(today.getDate() - 5);

        const recentQuotes = already_accepted_quotes.filter(quote => {
          const updatedAt = new Date(quote.updated_at);
          const isValid = !isNaN(updatedAt);
          const isRecent = isValid && updatedAt >= fiveDaysAgo;
          return isRecent;
        });

        const unreadCount = recentQuotes.filter(
          quote => !readNotifications.includes(quote.quotation_serial_no?.toString()),
        ).length;

        setNotificationCount(unreadCount);
      } catch (error) {
        setNotificationCount(0);
      }
    };

    updateNotificationCount();
  }, [NotificationQuoteStatusUpdateData, readNotifications]);

  const formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };


  const handleBackButton = () => {
    if (route) navigation.navigate(route);
    else navigation.goBack();
  };


  return (
    <View style={HeaderStyle.headerContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.grey_bg_Color}
      />

      {/* LEFT SECTION */}
      <View style={HeaderStyle.headerLeft}>
        {backButton ? (
          <TouchableOpacity
            onPress={handleBackButton}
            style={HeaderStyle.iconButton}>
            <Icon
              name="arrow-back"
              size={26}
              color={Colors.white_Icon_Color}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={HeaderStyle.iconButton}>
            <Icon name="menu" size={26} color={Colors.white_Icon_Color} />
          </TouchableOpacity>
        )}
      </View>

      {/* CENTER (LOGO) */}
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={HeaderStyle.headerCenter}>
        <Image source={MainLogo} style={HeaderStyle.logo} />
      </TouchableOpacity>

      {/* TIMER */}
      {elapsedTime > 0 && isRunning && (
        <TouchableOpacity
          style={HeaderStyle.timeContainer}
          onPress={() => navigation.navigate('Start Store')}>
          <Text style={HeaderStyle.timeText}>
            {formatTime(elapsedTime)}
          </Text>
        </TouchableOpacity>
      )}

      {/* RIGHT SECTION */}
      <View style={HeaderStyle.headerRight}>
        {notificationIcon && (
          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              onPress={() => {
                setNotificationCount(0);
                navigation.navigate('Notification');
              }}
              style={HeaderStyle.iconButton}>
              <Icon
                name="notifications"
                size={26}
                color={Colors.white_Icon_Color}
              />
            </TouchableOpacity>
            {notificationCount > 0 && (
              <View style={HeaderStyle.notificationBadge}>
                <Text style={HeaderStyle.notificationText}>
                  {notificationCount}
                </Text>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('New Contact')}
          style={HeaderStyle.iconButton}>
          <VectorIcon
            icon="MaterialIcons"
            name="add"
            size={26}
            color={Colors.white_Icon_Color}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Header;
