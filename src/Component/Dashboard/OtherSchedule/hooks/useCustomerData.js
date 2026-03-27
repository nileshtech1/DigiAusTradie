import { useEffect } from 'react';
import moment from 'moment';

const useCustomerData = (customerData, startTime, date, setEndTime, setSelectCustomer, setCust) => {
  useEffect(() => {
    if (customerData?.customer_name) {
      setSelectCustomer(customerData?.customer_name);
      setCust(customerData);

      if (startTime) {
        const getTimeEst = customer => {
          if (customer?.commercial_job?.length) return customer.commercial_job[0].timeEst;
          if (customer?.residential_job?.length) return customer.residential_job[0].timeEst;
          if (customer?.storefront_job?.length) {
            const start = moment(customer.trading_hours_start, 'hh:mm A');
            const end = moment(customer.trading_hours_end, 'hh:mm A');
            if (start.isValid() && end.isValid()) {
              const durationMinutes = end.diff(start, 'minutes');
              const estHours = Math.floor(durationMinutes / 60);
              const estMinutes = durationMinutes % 60;
              return `${estHours}:${estMinutes.toString().padStart(2, '0')}`;
            }
          }
          return '1:00';
        };

        const timeEst = getTimeEst(customerData);
        if (!timeEst) return;

        const [estHours, estMinutes] = timeEst.split(':').map(Number);
        const totalEstMinutes = estHours * 60 + estMinutes;

        const startMoment = moment(startTime, 'h:mm A');
        if (!startMoment.isValid()) return;

        const endMoment = startMoment.clone().add(totalEstMinutes, 'minutes');
        const maxEndTime = moment(date).endOf('day').hour(23).minute(0);

        if (endMoment.isAfter(maxEndTime)) {
          endMoment.hour(23).minute(0);
        }

        setEndTime({
          hour: endMoment.format('h'),
          minute: endMoment.format('mm'),
          daySection: endMoment.format('A'),
        });
      }
    }
  }, [customerData, startTime, date, setEndTime, setSelectCustomer, setCust]);
};

export default useCustomerData;