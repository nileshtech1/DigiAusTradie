import { useEffect, useState } from 'react';

const useScheduleData = (ScheduleList) => {
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [tomorrowSchedule, setTomorrowSchedule] = useState([]);
  const [reminderSchedule, setReminderSchedule] = useState([]);

 const getAusDate = (offset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date;
};

  useEffect(() => {
    if (ScheduleList && ScheduleList?.Schedule) {
    const today = getAusDate();
    const tomorrow = getAusDate(1);
    const threeDaysAhead = getAusDate(3);
    
    
      threeDaysAhead.setDate(today.getDate() + 3);

      const formattedToday = formatDate(today);
      const formattedTomorrow = formatDate(tomorrow);
      const formattedThreeDaysAhead = formatDate(threeDaysAhead);

      const todaySchedules = ScheduleList?.Schedule?.filter(
        item => item.date == formattedToday,
      );
      
      const tomorrowSchedules = ScheduleList?.Schedule?.filter(
        item => item.date == formattedTomorrow,
      );
      const threeDaysAheadSchedules = ScheduleList?.Schedule?.filter(
        item => item.date == formattedThreeDaysAhead,
      );

      const timeStringToMinutes = (timeString) => {
        if (!timeString) return 0;
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };


      const sortedTodaySchedules = todaySchedules.sort((a, b) => {
        return timeStringToMinutes(a.start_time) - timeStringToMinutes(b.start_time);
      });

      const todaySchedulesWithEstimate = sortedTodaySchedules.map(task => {
        const estimatedTime = calculateEstimatedTime(
          task.start_time,
          task.end_time,
          task.date,
        );
        return {...task, estimatedTime};
      });


      const sortedTomorrowSchedules = tomorrowSchedules.sort((a, b) => {
        return timeStringToMinutes(a.start_time) - timeStringToMinutes(b.start_time);
      });

      const tomorrowSchedulesWithEstimate = sortedTomorrowSchedules.map(task => {
        const estimatedTime = calculateEstimatedTime(
          task.start_time,
          task.end_time,
          task.date,
        );
        return { ...task, estimatedTime };
      });


      const threeDaysAheadWithEstimate = threeDaysAheadSchedules.map(task => {
        const estimatedTime = calculateEstimatedTime(
          task.start_time,
          task.end_time,
          task.date,
        );
        return {...task, estimatedTime};
      });

      setTodaySchedule(todaySchedulesWithEstimate);
      setTomorrowSchedule(tomorrowSchedulesWithEstimate);
      setReminderSchedule(threeDaysAheadWithEstimate);
    }
  }, [ScheduleList]);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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

  const calculateEstimatedTime = (startTime, endTime, date) => {
    const startDate = convertToDate(startTime, new Date(date));
    const endDate = convertToDate(endTime, new Date(date));

    const diffInMilliseconds = endDate - startDate;

    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    );

    return `${hours} Hour ${minutes} Min`;
  };

  return { todaySchedule, tomorrowSchedule, reminderSchedule };
};

export default useScheduleData;