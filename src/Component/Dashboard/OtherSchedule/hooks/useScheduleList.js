import { useEffect } from 'react';

const useScheduleList = (ScheduleList, setScheduleList) => {
  useEffect(() => {
    if (ScheduleList?.Schedule) {
      setScheduleList(ScheduleList.Schedule);
    }
  }, [ScheduleList, setScheduleList]);
};

export default useScheduleList;