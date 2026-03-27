// helpers.js
export const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  export const extractTimestamp = (dateString) => {
    return Number(dateString.match(/\d+/)[0]);
  };