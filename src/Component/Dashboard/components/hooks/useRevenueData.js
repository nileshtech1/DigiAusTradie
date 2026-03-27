import { useEffect, useState } from 'react';
import Colors from '../../../../Assets/Style/Color';

const useRevenueData = (InvoiceList, sentQuotes) => {
  const [pieData, setPieData] = useState([]);
  const [target, setTarget] = useState(0);
  const [booked, setBooked] = useState(0);
  const [actual, setActual] = useState(0);
  const [sentQuoteLength, setSentQuoteLength] = useState(0);
  const [percentage, setPercentage] = useState({
    targetAmount: 0,
    bookedPercentage: 0,
    paidPercentage: 0,
  });

  const parseJobArray = (jobStr) => {
    if (!jobStr || jobStr === "null" || jobStr === "[]") return [];
    try {
      return JSON.parse(jobStr);
    } catch (e) {
      console.error("Invalid JSON in job field:", jobStr);
      return [];
    }
  };
  

  useEffect(() => {
    if (sentQuotes?.status === true && sentQuotes?.data?.length > 0) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      const filterInvoicesByMonth = (invoices, month, year) => {
        return invoices?.filter(invoice => {
          const invoiceDate = new Date(invoice.created_at);
          return (
            invoiceDate.getMonth() === month && 
            invoiceDate.getFullYear() === year 
          );
        });
      };
      

      const currentMonthTargetAmount = filterInvoicesByMonth(
        sentQuotes?.data,
        currentMonth,
        currentYear,
      );
      
      const quoteLength = currentMonthTargetAmount?.length;
      
      setSentQuoteLength(quoteLength);
      

      const targetAmount = currentMonthTargetAmount?.reduce((sum, item) => {
        let total = 0;
  
        const commercialJobs = parseJobArray(item.commercial_job);
        const residentialJobs = parseJobArray(item.residential_job);
        const storefrontJobs = parseJobArray(item.storefront_job);
  
        // sum prices from each job type
        commercialJobs.forEach((job) => {
          total += parseFloat(job.price || 0);
        });
        residentialJobs.forEach((job) => {
          total += parseFloat(job.price || 0);
        });
        storefrontJobs.forEach((job) => {
          total += parseFloat(job.price || 0);
        });
  
        return sum + total;
      }, 0);
  
      setTarget(targetAmount);
    }
  }, [sentQuotes]);

  useEffect(() => {
    if (InvoiceList && InvoiceList?.Invoices?.length > 0) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      const filterInvoicesByMonth = (invoices, month, year) => {
        return invoices?.filter(invoice => {
          const invoiceDate = new Date(invoice.date);
          return (
            invoiceDate.getMonth() === month &&
            invoiceDate.getFullYear() === year
          );
        });
      };

      const currentMonthInvoices = filterInvoicesByMonth(
        InvoiceList?.Invoices,
        currentMonth,
        currentYear,
      );
      
      const previousMonthInvoices = filterInvoicesByMonth(
        InvoiceList?.Invoices,
        previousMonth,
        previousYear,
      );

      const paidInvoicesCurrentMonth = currentMonthInvoices.filter(invoice => invoice.status === 'PAID');
      const authorizedInvoicesCurrentMonth = currentMonthInvoices?.filter(
        invoice => invoice.status === 'UNPAID',
      );
      
      const draftOrSubmittedInvoicesCurrentMonth = currentMonthInvoices?.filter(
        invoice => invoice.Status === 'DRAFT' || invoice.Status === 'SUBMITTED',
      );

      const totalPaidCurrentMonth = paidInvoicesCurrentMonth?.length;
      
      const quoteSent = sentQuoteLength;
      const totalAuthorizedCurrentMonth = authorizedInvoicesCurrentMonth?.length;
      const totalSentCurrentMonth = draftOrSubmittedInvoicesCurrentMonth?.length;
      
      

      const bookedRevenue1 = draftOrSubmittedInvoicesCurrentMonth?.reduce(
        (sum, item) => sum + item.AmountDue,
        0,
      );
      const bookedRevenue2 = authorizedInvoicesCurrentMonth?.reduce(
        (sum, invoice) => 
          sum + (invoice.line_items?.reduce(
            (lineSum, item) => lineSum + parseFloat(item.LineAmount || 0),
            0
          ) || 0),
        0
      );
      
      
      const bookedRevenue = bookedRevenue1 + bookedRevenue2; 
      setBooked(bookedRevenue);

      const paidRevenue = paidInvoicesCurrentMonth?.reduce(
        (sum, item) => sum + item.AmountPaid,
        0,
      );
      setActual(paidRevenue);
      

      setPieData([
        {
          value: totalPaidCurrentMonth,
          color: Colors.green_color,
          label: 'Paid',
        },
        {
          value: totalAuthorizedCurrentMonth + totalSentCurrentMonth,
          color: Colors.blue_theme_Color,
          label: 'Authorized',
        },
        {
          value: sentQuoteLength,
          color: Colors.Neon_Pink_Theme_Color,
          label: 'Total Sent',
        },
      ]);
    }
    else {
      setPieData([
        {
          value: 0,
          color: Colors.green_color,
          label: 'Paid',
        },
        {
          value: 0,
          color: Colors.blue_theme_Color,
          label: 'Authorized',
        },
        {
          value: sentQuoteLength,
          color: Colors.Neon_Pink_Theme_Color,
          label: 'Total Sent',
        },
      ]);
    }
  }, [InvoiceList, sentQuoteLength]);

  useEffect(() => {
    calculatePercentages(booked, actual, target);
  }, [booked, actual, target]);

  const calculatePercentages = (booked, actual, target) => {
    const bookedPercentage = target > 0 ? Math.round((booked / target) * 100) : 0;
    const paidPercentage = target > 0 ? Number(((actual / target) * 100).toFixed(1)) : 0;
  
    setPercentage({
      targetAmount: target,
      bookedPercentage,
      paidPercentage,
    });
  };

  return { pieData, target, booked, actual, percentage };
};

export default useRevenueData;