import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../../Assets/Style/Color';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import {useSelector} from 'react-redux';
import RevenueQuoteStyle from '../../../utils/Stylesheet/RevenueQuoteStyle';
import moment from 'moment';

const Quotes = () => {
  const navigation = useNavigation();
  const [unpaidInvoiceList, setUnpaidInvoiceList] = useState([]); 
  const {InvoiceList} = useSelector(state => state.InvoiceList);
  const {sentQuotes} = useSelector(state => state.XeroQuoteSlice);
  const [target, setTarget] = useState(0);


  const calculateDaysOverdue = dueDateString => {
    const dueDate = new Date(dueDateString);
    const today = new Date();
    const timeDiff = today - dueDate;
    return Math.floor(timeDiff / (1000 * 3600 * 24)); 
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      if (InvoiceList.Status === 'OK') {
        const unpaidInvoices = InvoiceList?.Invoices?.filter(
          invoice =>
            (invoice.Status === 'DRAFT' || invoice.Status === 'SUBMITTED') &&
            invoice.AmountDue > 0,
        ).map(invoice => ({
          ...invoice,
          daysOverdue: calculateDaysOverdue(invoice.DueDateString),
        }));

        setUnpaidInvoiceList(unpaidInvoices);
      }
    };

    fetchInvoices();
  }, [InvoiceList]); 

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

      const unpaidInvoices = currentMonthTargetAmount?.filter(
        invoice =>
          (invoice.status === 'DRAFT' || invoice.status === 'SENT' || invoice.status === 'ACCEPTED'),
      ).map(invoice => ({
        ...invoice,
        daysOverdue: calculateDaysOverdue(invoice.DateString),
      }));
      setUnpaidInvoiceList(unpaidInvoices);

      const targetAmount = currentMonthTargetAmount?.reduce(
        (sum, item) => sum + item.Total,
        0,
      );
      setTarget(targetAmount);
    }
  }, [sentQuotes]);

  const totalUnpaid = unpaidInvoiceList.length;
  const totalAmount = unpaidInvoiceList?.reduce((sum, item) => {
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

  const handleItemPress = item => {
    navigation.navigate('XeroQuoteDetails', {quote: item});
  };

  const renderHeader = () => (
    <View style={RevenueQuoteStyle.headerRow}>
      <Text style={RevenueQuoteStyle.headerText}>Customer</Text>
      <Text style={RevenueQuoteStyle.headerText}>Invoice</Text>
      <Text style={RevenueQuoteStyle.headerText}>Amount</Text>
      <Text style={RevenueQuoteStyle.headerText}>Date</Text>
      <VectorIcon
        icon="MaterialIcons"
        name="arrow-right"
        color={'#00000000'}
        size={30}
      />
    </View>
  );
  const calculateInvoiceTotal = (item) => {
    const parseJobArray = (jobStr) => {
      if (!jobStr || jobStr === "null" || jobStr === "[]") return [];
      try {
        return JSON.parse(jobStr);
      } catch (e) {
        console.error("Invalid JSON:", jobStr);
        return [];
      }
    };
  
    const commercialJobs = parseJobArray(item.commercial_job);
    const residentialJobs = parseJobArray(item.residential_job);
    const storefrontJobs = parseJobArray(item.storefront_job);
  
    let total = 0;
  
    commercialJobs.forEach((job) => {
      total += parseFloat(job.price || 0);
    });
    residentialJobs.forEach((job) => {
      total += parseFloat(job.price || 0);
    });
    storefrontJobs.forEach((job) => {
      total += parseFloat(job.price || 0);
    });
  
    return total;
  };
  

  return (
    <View style={unpaidInvoiceList.length > 6 ? RevenueQuoteStyle.container : RevenueQuoteStyle.container1}>

      <View style={RevenueQuoteStyle.summaryContainer}>
        <View style={RevenueQuoteStyle.summaryItem}>
          <Text style={RevenueQuoteStyle.summaryLabel}>Total Sent</Text>
          <Text style={RevenueQuoteStyle.summaryValue}>{totalUnpaid}</Text>
        </View>
        <View style={RevenueQuoteStyle.summaryItem}>
          <Text style={RevenueQuoteStyle.summaryLabel}>Total Amount</Text>
          <Text style={RevenueQuoteStyle.summaryValue}>
            $ {totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>

      {renderHeader()}

      {unpaidInvoiceList.length > 0 ? (
        <ScrollView 
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={RevenueQuoteStyle.listContainer}
        >
          {unpaidInvoiceList?.reverse()?.map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={RevenueQuoteStyle.row}
              onPress={() => handleItemPress(item)}
            >
              <Text style={RevenueQuoteStyle.cell}>{item?.customer_name}</Text>
              <Text style={RevenueQuoteStyle.cell}>{item?.quotation_serial_no || '-'}</Text>
              <Text style={RevenueQuoteStyle.cell}>${calculateInvoiceTotal(item).toFixed(2)}</Text>
              <Text style={RevenueQuoteStyle.cell}>
                {moment(item?.DateString).format('DD MMM YYYY')}
              </Text>
              <VectorIcon
                icon="MaterialIcons"
                name="arrow-right"
                color={Colors.theme_background_dark}
                size={30}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={RevenueQuoteStyle.noDataContainer}>
          <Text style={RevenueQuoteStyle.noDataText}>No data</Text>
        </View>
      )}
    </View>
  );
};

export default Quotes;
