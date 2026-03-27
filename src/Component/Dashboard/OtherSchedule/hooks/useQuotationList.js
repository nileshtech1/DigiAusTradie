import { useEffect } from 'react';

const useQuotationList = (QuotationList, scheduleList, date, setCustomerList) => {
  useEffect(() => {
    if (QuotationList?.Quotation) {
      const filteredQuotations = QuotationList.Quotation.filter(quotation => {
        if (!scheduleList) {
          return true;
        }
        return !scheduleList.some(
          scheduledItem =>
            scheduledItem.date === date &&
            scheduledItem?.quotation?.quotation_serial_no === quotation.quotation_serial_no,
        );
      });
      setCustomerList(filteredQuotations);
    }
  }, [QuotationList, scheduleList, date, setCustomerList]);
};

export default useQuotationList;