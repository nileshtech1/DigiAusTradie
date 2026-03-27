const convertToDate = (timeString, date) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
  
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  };
  
  export const calculateEstimatedTime = (startTime, endTime, date) => {
    const startDate = convertToDate(startTime, date);
    const endDate = convertToDate(endTime, date);
  
    const diffInMilliseconds = endDate - startDate;
  
    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${hours} Hour ${minutes} Min`;
  };