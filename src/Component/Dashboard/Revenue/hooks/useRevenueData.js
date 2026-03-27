import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Colors from '../../../../Assets/Style/Color';

const useRevenueData = () => {
  const { InvoiceList } = useSelector(state => state.InvoiceList);
  const { sentQuotes } = useSelector(state => state.XeroQuoteSlice);

  const pieData = useMemo(() => {
    if (sentQuotes?.status !== true || !sentQuotes?.data?.length) return [];

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
      currentYear
    );

    const quoteLength = currentMonthTargetAmount?.length || 0;

    // if (!InvoiceList?.Invoices?.length) return [];

    const currentInvoices = filterInvoicesByMonth(InvoiceList?.Invoices, currentMonth, currentYear);
    
    const authorized = currentInvoices?.filter(i => i.status === 'UNPAID').length;
    const paid = currentInvoices.filter(i => i.Status === 'PAID').length;
    const sent = currentInvoices.filter(i => ['DRAFT', 'SUBMITTED'].includes(i.Status)).length;

    return [
      { value: paid, color: Colors.green_color, label: 'Paid' },
      { value: sent + authorized, color: Colors.blue_theme_Color, label: 'Authorized' },
      { value: quoteLength, color: Colors.Neon_Pink_Theme_Color, label: 'Total Sent' }
    ];
  }, [sentQuotes, InvoiceList]);

  const barData = useMemo(() => {
    // if (!InvoiceList?.Invoices?.length) return [];
  
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    const filterInvoicesByMonth = (invoices, month, year) =>
      invoices?.filter(invoice => {
        const date = new Date(invoice.date);
        return date.getMonth() === month && date.getFullYear() === year;
      });
  
    const currentInvoices = filterInvoicesByMonth(InvoiceList.Invoices, currentMonth, currentYear);
    const previousInvoices = filterInvoicesByMonth(InvoiceList.Invoices, currentMonth, currentYear - 1);
  
    const getTotalAmount = invoices =>
      invoices?.reduce(
        (sum, inv) =>
          sum +
          (inv.line_items?.reduce((lineSum, item) => lineSum + parseFloat(item.LineAmount || 0), 0) || 0),
        0
      );
  
    const getAvgDays = invoices =>
      invoices?.length === 0
        ? 0
        : invoices?.reduce((acc, inv) => {
            const created = new Date(inv.date);
            const due = new Date(inv.due_date);
            return acc + Math.ceil((due - created) / (1000 * 60 * 60 * 24));
          }, 0) / invoices?.length;
  
    const getOwing = invoices =>
      invoices
        ?.filter(i => ['DRAFT', 'SUBMITTED', 'UNPAID'].includes(i.status))
        ?.reduce(
          (sum, inv) =>
            sum +
            (inv.line_items?.reduce((lineSum, item) => lineSum + parseFloat(item.LineAmount || 0), 0) || 0),
          0
        );
  
    const getSales = invoices =>
      invoices
        ?.filter(i => i.status === 'PAID' || i.status === 'UNPAID')
        .reduce(
          (sum, inv) =>
            sum +
            (inv.line_items?.reduce((lineSum, item) => lineSum + parseFloat(item.LineAmount || 0), 0) || 0),
          0
        );
  
    const getConversion = invoices => {
      const drafts = invoices.filter(i => ['DRAFT', 'SUBMITTED'].includes(i.status)).length;
      const converted = invoices.filter(i => i.status === 'UNPAID' || i.status === 'PAID').length;
      return drafts > 0 ? (converted / drafts) * 100 : 0;
    };
  
    return [
      { value: getAvgDays(previousInvoices), label: 'AD', spacing: 2, frontColor: Colors.red_crayola_color },
      { value: getAvgDays(currentInvoices), label: 'AD', spacing: 2, frontColor: Colors.green_color },
      { value: getTotalAmount(previousInvoices), label: 'R', spacing: 2, frontColor: Colors.red_crayola_color },
      { value: getTotalAmount(currentInvoices), label: 'R', spacing: 2, frontColor: Colors.green_color },
      { value: getSales(previousInvoices), label: 'S', spacing: 2, frontColor: Colors.red_crayola_color },
      { value: getSales(currentInvoices), label: 'S', spacing: 2, frontColor: Colors.green_color },
      { value: getConversion(previousInvoices), label: 'C', spacing: 2, frontColor: Colors.red_crayola_color },
      { value: getConversion(currentInvoices), label: 'C', spacing: 2, frontColor: Colors.green_color },
      { value: getOwing(previousInvoices), label: 'A', spacing: 2, frontColor: Colors.red_crayola_color },
      { value: getOwing(currentInvoices), label: 'A', spacing: 2, frontColor: Colors.green_color },
    ];
  }, [InvoiceList]);
  

  return { pieData, barData };
};

export default useRevenueData;
