import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../../../ReusableComponent/Header';
import TodaysScheduledFlatlist from '../../../FlatList/TodaysScheduledFlatlist';
import Colors from '../../../Assets/Style/Color';
import { useSelector } from 'react-redux';

const TodayScheduled = ({ navigation, route }) => {
  const todayId = route.params;
  const [jobData, setJobData]= useState([])
  const {ScheduleList} = useSelector(state => state.ScheduleList);
  
 const timeStringToMinutes = (timeString) => {
   if (!timeString) return 0;
   const [time, modifier] = timeString.split(' ');
   let [hours, minutes] = time.split(':').map(Number);
   if (modifier === 'PM' && hours !== 12) hours += 12;
   if (modifier === 'AM' && hours === 12) hours = 0;
   return hours * 60 + minutes;
 };
 
 useEffect(() => {
   if (ScheduleList?.Schedule?.length > 0) {
     const todayDate = new Date().toLocaleDateString('en-CA', {
       timeZone: 'Australia/Sydney',
     });
     let filteredData = ScheduleList.Schedule.filter(
       (item) => item.date === todayDate && item?.type !== 'Quote',
     );
 
     filteredData = filteredData.sort(
       (a, b) => timeStringToMinutes(a.start_time) - timeStringToMinutes(b.start_time)
     );
 
     setJobData(filteredData);
   }
 }, [ScheduleList]);

  return (
    <View style={{ flex: 1, backgroundColor : Colors.black_bg_Theme }}>
      <Header notificationIcon={true} backButton={true} />
 
      <TodaysScheduledFlatlist jobs={jobData} scrollToJobId={todayId}/>
    </View>
  );
};

export default TodayScheduled;