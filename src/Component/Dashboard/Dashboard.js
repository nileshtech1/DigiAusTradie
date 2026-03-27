import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Linking,
  ActivityIndicator,
  Text,
} from 'react-native';
import Header from '../../ReusableComponent/Header';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../Assets/Style/Color';
import DashboardStyle from '../../utils/Stylesheet/DashboardStyle';
import {useDispatch, useSelector} from 'react-redux';
import {useTimer} from '../../ReusableComponent/TimerContext';
import useDashboardAPI from './components/hooks/useDashboardAPI';
import DashboardCharts from './components/DashboardCharts';
import RevenueTarget from './components/RevenueTarget';
import ScheduleBox from './components/ScheduleBox';
import DashboardButtons from './components/DashboardButtons';
import ReminderModal from '../../ReusableComponent/ReminderModal';
import useScheduleData from './components/hooks/useScheduleData';
import useRevenueData from './components/hooks/useRevenueData';
import {GetScheduleApi} from '../../Redux/API/GetScheduleApi';
import DashedLoader from '../../ReusableComponent/DashedLoader';

const Dashboard = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const {LoginData} = useSelector(state => state.Login);
  const {InvoiceList} = useSelector(state => state.InvoiceList);
  const {ScheduleList} = useSelector(state => state.ScheduleList);
  const {sentQuotes} = useSelector(state => state.XeroQuoteSlice);
  const {timeTrackerData} = useSelector(state => state.GetTimeTracking);
  const [isReminderModalVisible, setIsReminderModalVisible] = useState(false);
  const {TrailBalanceData} = useSelector(state => state.TrailBalance);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(sentQuotes, 'sentQuotes');
  
  
  useDashboardAPI(LoginData, setLoading);
  const {todaySchedule, tomorrowSchedule, reminderSchedule} = useScheduleData(ScheduleList);
  const {pieData, target, booked, actual, percentage} = useRevenueData(
    InvoiceList,
    sentQuotes,
  );

  // const {elapsedTime, startTimer, stopTimer, setElapsedTime} = useTimer();

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

  // useEffect(() => {
  //   if (
  //     timeTrackerData?.TimeTrack?.start_time &&
  //     timeTrackerData?.TimeTrack?.status == 'active'
  //   ) {
  //     const startTimeString = timeTrackerData?.TimeTrack?.start_time;
  //     const startTimeDate = convertToDate(startTimeString, new Date());
  //     const now = new Date();
  //     const diffInSeconds = Math.floor((now - startTimeDate) / 1000);
  //     setElapsedTime(diffInSeconds);
  //     startTimer();
  //   } else {
  //     stopTimer();
  //   }
  // }, [timeTrackerData]);

  useEffect(() => {
    if (
      reminderSchedule?.length > 0 &&
      reminderSchedule[0]?.customer_id !== null
    ) {
      setIsReminderModalVisible(true);
    }
  }, [reminderSchedule]);

  const handleSchedule = (route, jobId) => {
    navigation.navigate(route, {jobId});
  };

  const handleStartButton = () => {
    navigation.navigate('Start Store');
  };

  const handleSendReminder = item => {
    const customerName = item?.quotation?.customer_name || 'there';
    const franchiseeName = LoginData?.user?.first_name;
    const dateOfSchedule = item?.date || 'your scheduled date';
    const timeOfSchedule = item?.start_time || 'your scheduled time';
    const message = smsReminderTemplate(
      customerName,
      franchiseeName,
      dateOfSchedule,
      timeOfSchedule,
    );
    handleTextMessage('7000131484', message);
  };

  const handleTextMessage = (phoneNumber, message) => {
    const smsURL = `sms:${phoneNumber}${
      message ? `?body=${encodeURIComponent(message)}` : ''
    }`;
    Linking.openURL(smsURL).catch(err =>
      console.error('Failed to send SMS:', err),
    );
  };

  const smsReminderTemplate = (
    customerName,
    franchiseeName,
    dateOfSchedule,
    timeOfSchedule,
  ) => `Hi ${customerName},
  
  This is ${franchiseeName} from JH Group Cleaning 
  Services.
  
  We're getting things ready for your 
  appointment on 
  ${dateOfSchedule} at ${timeOfSchedule}. 
  Does this still work for you?
  
  Looking forward to bringing the shine to 
  your windows.
  
  Cheers,  
  ${franchiseeName}  
  JH Group Cleaning Services`;

  // Chart data
  const data1 = [
    {value: 100, color: Colors.Neon_Blue_Theme_Color, text: 'Invoice UnPaid'},
    {value: 150, color: Colors.Neon_Pink_Theme_Color, text: 'Quotes Sent'},
    {value: 150, color: Colors.green_color, text: 'Invoice Paid'},
  ];

  const extractAccountAndYTD = trailBalanceData => {
    if (!trailBalanceData || !trailBalanceData.accounts) {
      return [];
    }

    return trailBalanceData.accounts.map(account => ({
      account: account.name,
      ytdCredit: account.ytdCredit || 0,
      ytdDebit: account.ytdDebit || 0,
    }));
  };

  const accountData = extractAccountAndYTD(TrailBalanceData);
  const Wages = accountData?.filter(account =>
    account.account.includes('Cost of Goods Sold'),
  );
  const Material = accountData?.filter(account =>
    account.account.includes('Wages and Salaries'),
  );
  const Marketing = accountData?.filter(account =>
    account.account.includes('Advertising & Marketing'),
  );

  const data2 = [
    {value: Wages[0]?.ytdCredit, color: Colors.pink_theme_color},
    {value: Material[0]?.ytdCredit, color: Colors.blue_theme_Color},
    {value: Marketing[0]?.ytdCredit, color: Colors.Neon_Pink_Theme_Color},
  ];

  const labels = ['Invoices Unpaid', 'Quotes Sent', 'Invoices Paid'];
  const labels1 = ['Wages', 'Material', 'Marketing'];

  const colorCategories = [
    {name: 'Residential', color: Colors.green_color},
    {name: 'Storefront', color: Colors.blue_theme_Color},
    {name: 'Quote', color: Colors.banana_Yellow_color},
    {name: 'Reserved', color: Colors.gray_text_color},
    {name: 'Commercial', color: Colors.Neon_Pink_Theme_Color},
    {name: 'Meeting', color: Colors.pink_theme_color},
  ];

  const shouldShowLoader =
    loading &&
    (!ScheduleList?.Schedule || ScheduleList?.Schedule.length === 0) &&
    (!sentQuotes?.data ||
      sentQuotes?.data?.length === 0);

  const handleRefresh = async () => {
    
    const token = LoginData.token;
    const id = LoginData?.user?.id;
    const franchiseid = {franchise_id: id};

    setRefreshing(true);
    setLoading(true);

    try {
      await Promise.all([
        dispatch(GetScheduleApi({token, franchiseid})),
      ]);
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  return (
    <View style={DashboardStyle.container}>
      <Header notificationIcon={true} backButton={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        >
        <RevenueTarget
          target={target}
          booked={booked}
          actual={actual}
          percentage={percentage}
          navigation={navigation}
        />

        <DashboardCharts
          pieData={pieData}
          data1={data1}
          labels={labels}
          data2={data2}
          labels1={labels1}
          navigation={navigation}
        />

        <View style={DashboardStyle.scheduleContainer}>
          <ScheduleBox
            title="Today's"
            schedules={todaySchedule}
            colorCategories={colorCategories}
            handleSchedule={handleSchedule}
            routeName="Todays Schedule"
            handleRefresh={handleRefresh}
          />

          <ScheduleBox
            title="Tomorrow"
            schedules={tomorrowSchedule}
            colorCategories={colorCategories}
            handleSchedule={handleSchedule}
            handleRefresh={handleRefresh}
            routeName="Tommorow Schedule"
          />
        </View>

        <DashboardButtons handleStartButton={handleStartButton} handleRefresh={handleRefresh} />
      </ScrollView>

      <ReminderModal
        visible={isReminderModalVisible}
        onClose={() => setIsReminderModalVisible(false)}
        data={reminderSchedule}
        onSendReminder={handleSendReminder}
      />
      {shouldShowLoader && (
        <View style={DashboardStyle.loaderContainer}>
          <View style={DashboardStyle.loader}>
          <DashedLoader color={Colors.Neon_Blue_Theme_Color} size={100} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Dashboard;