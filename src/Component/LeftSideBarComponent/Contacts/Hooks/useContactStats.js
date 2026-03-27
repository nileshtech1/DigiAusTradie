import {useMemo} from 'react';
import moment from 'moment';
import {extractTimestamp} from '../Utils/helpers';

export const useContactStats = ({
  contactId,
  id,
  finishJobs = [],
  scheduleList = [],
  invoices = [],
}) => {
  const filterInvoice = invoices?.filter(
    invoice => invoice?.Contact?.ContactID === contactId,
  );

  const avgDaysToPay = useMemo(() => {
    if (!filterInvoice || filterInvoice.length === 0) return '-';

    const totalDays = filterInvoice.reduce((sum, invoice) => {
      const issueDate = moment(parseInt(invoice.Date.match(/\d+/)[0], 10));
      const dueDate = moment(parseInt(invoice.DueDate.match(/\d+/)[0], 10));
      return sum + dueDate.diff(issueDate, 'days');
    }, 0);

    return (totalDays / filterInvoice.length).toFixed(1);
  }, [filterInvoice]);

  const getLatestInvoice = () => {
    if (filterInvoice?.length === 1) return filterInvoice[0];

    return filterInvoice?.sort(
      (a, b) =>
        extractTimestamp(b.UpdatedDateUTC) - extractTimestamp(a.UpdatedDateUTC),
    )[0];
  };

  const latestInvoice = getLatestInvoice();

  const filterData = finishJobs?.filter(job => job?.customer_id == id);

  const scheduleData = scheduleList?.filter(sch => sch?.customer_id == id);

  const mergedData = useMemo(() => {
    return filterData?.map(job => {
      const match = scheduleData?.find(sch => sch.id == job.schedule_id);
      return match;
    });
  }, [filterData, scheduleData]);

  let totalPrice = 0;

  mergedData?.forEach(job => {
    if (!job?.quotation) return;

    const {commercial_job, storefront_job, residential_job} = job.quotation;

    const parseJobs = jobData => {
      try {
        const parsed = JSON.parse(jobData);
        if (!Array.isArray(parsed)) return 0;
        return parsed.reduce(
          (sum, item) => sum + (parseFloat(item.price) || 0),
          0,
        );
      } catch {
        return 0;
      }
    };

    totalPrice +=
      parseJobs(commercial_job) +
      parseJobs(storefront_job) +
      parseJobs(residential_job);
  });

  const totalJobs = filterData?.length || 0;

  const avgEnjoymentScale = totalJobs
    ? (
        filterData.reduce((sum, job) => sum + Number(job.enjoyment_scale), 0) /
        totalJobs
      ).toFixed(2)
    : '-';

  const avgEfficiency = totalJobs
    ? (
        filterData.reduce((sum, job) => sum + Number(job.efficiency), 0) /
        totalJobs
      ).toFixed(2) + ' %'
    : '-';

  const totalAmount = totalJobs
    ? filterData.reduce((sum, job) => sum + Number(job.amount), 0).toFixed(2)
    : '0.00';

  const lifeTimeValue = (totalPrice + parseFloat(totalAmount)).toFixed(2);

  return {
    avgDaysToPay,
    latestInvoice,
    totalJobs,
    avgEnjoymentScale,
    avgEfficiency,
    totalAmount,
    lifeTimeValue,
  };
};
