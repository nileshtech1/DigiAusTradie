import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Header from '../../../ReusableComponent/Header';
import Colors from '../../../Assets/Style/Color';
import TommorowSchFlatlist from '../../../FlatList/TommorowSchFlatlist';
import {useSelector} from 'react-redux';

const TodayScheduled = ({navigation, route}) => {
  const JobId = route.params;
  const [jobData, setJobData] = useState([]);
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
      const today = new Date();
      today.setDate(today.getDate() + 1); // Tomorrow

      const tomorrowDate = today.toLocaleDateString('en-CA', {
        timeZone: 'Australia/Sydney',
      });

      const filteredData = ScheduleList.Schedule
        .filter((item) => {
          return item.date === tomorrowDate && item?.type !== 'Quote';
        })
        .sort(
          (a, b) => timeStringToMinutes(a.start_time) - timeStringToMinutes(b.start_time)
        );

      setJobData(filteredData);
    }
  }, [ScheduleList]);



  return (
    <View style={{flex: 1, backgroundColor: Colors.black_bg_Theme}}>
      <Header notificationIcon={true} backButton={true} />

      <TommorowSchFlatlist jobs={jobData} scrollToJobId={JobId} />
    </View>
  );
};

export default TodayScheduled;
