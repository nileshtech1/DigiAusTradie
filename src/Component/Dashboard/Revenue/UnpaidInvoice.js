import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Colors from '../../../Assets/Style/Color';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import RevenueUnpaidInvoiceStyle from '../../../utils/Stylesheet/RevenueUnpaidInvoiceStyle';

const UnpaidInvoice = () => {
  const navigation = useNavigation();
  const [unpaidInvoiceList, setUnpaidInvoiceList] = useState([]);
  const {InvoiceList} = useSelector(state => state.InvoiceList);
  

  useEffect(() => {
    const fetchInvoices = async () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
  
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

      if (InvoiceList.status === true) {
        const validStatuses = ['UNPAID'];
  
        const unpaidInvoices = currentMonthInvoices
          .filter(invoice => validStatuses.includes(invoice.status))
          .map(invoice => {
            const totalAmount = invoice.line_items.reduce(
              (sum, item) => sum + parseFloat(item.LineAmount || 0),
              0
            );
  
            return {
              ...invoice,
              totalAmount,
              daysOverdue: calculateDaysOverdue(invoice.due_date),
            };
          });
  
        setUnpaidInvoiceList(unpaidInvoices);
      }
    };
  
    fetchInvoices();
  }, [InvoiceList]);
  

  const calculateDaysOverdue = dueDateString => {
    if (!dueDateString) return 0;
  
    const [year, month, day] = dueDateString.split('-').map(Number);
    const dueDate = new Date(year, month - 1, day);
  
    const currentDate = new Date();
    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ); 
    if (today > dueDate) {
      const diffTime = today - dueDate;
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
      return days;
    }
    return 0;
  };
  
  const totalUnpaid = unpaidInvoiceList.length;
  const grandTotal = unpaidInvoiceList.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0,
  );
  
  
  const handleItemPress = item => {
    navigation.navigate('Details', { quote: item });
  };

  const renderHeader = () => (
    <View style={RevenueUnpaidInvoiceStyle.headerRow}>
      <Text style={RevenueUnpaidInvoiceStyle.headerText}>Customer</Text>
      <Text style={RevenueUnpaidInvoiceStyle.headerText}>Invoice</Text>
      <Text style={RevenueUnpaidInvoiceStyle.headerText}>Amount</Text>
      <Text style={RevenueUnpaidInvoiceStyle.headerText}>Due Date</Text>
      <VectorIcon
        icon="MaterialIcons"
        name="arrow-right"
        color={'#00000000'}
        size={30}
      />
    </View>
  );

  return (
    <View style={unpaidInvoiceList.length > 6 ? RevenueUnpaidInvoiceStyle.container : RevenueUnpaidInvoiceStyle.container1}>
      {/* Summary Header */}
      <View style={RevenueUnpaidInvoiceStyle.summaryContainer}>
        <View style={RevenueUnpaidInvoiceStyle.summaryItem}>
          <Text style={RevenueUnpaidInvoiceStyle.summaryLabel}>Total Unpaid</Text>
          <Text style={RevenueUnpaidInvoiceStyle.summaryValue}>{totalUnpaid}</Text>
        </View>
        <View style={RevenueUnpaidInvoiceStyle.summaryItem}>
          <Text style={RevenueUnpaidInvoiceStyle.summaryLabel}>Total Amount</Text>
          <Text style={RevenueUnpaidInvoiceStyle.summaryValue}>$ {grandTotal?.toFixed(2)}</Text>
        </View>
      </View>

      {/* List Header */}
      {renderHeader()}

      {/* List of Invoices */}
      {unpaidInvoiceList.length > 0 ? (
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={RevenueUnpaidInvoiceStyle.listContainer}>
          {unpaidInvoiceList?.map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={RevenueUnpaidInvoiceStyle.row}
              onPress={() => handleItemPress(item)}
            >
              <Text style={RevenueUnpaidInvoiceStyle.cell}>{item?.customer_name}</Text>
              <Text style={RevenueUnpaidInvoiceStyle.cell}>{item?.invoice_id}</Text>
              <Text style={RevenueUnpaidInvoiceStyle.cell}>${item?.totalAmount}</Text>
              <Text style={RevenueUnpaidInvoiceStyle.cell}>{item?.due_date}</Text>
              {/* <Text style={RevenueUnpaidInvoiceStyle.cell}>{
              item.daysOverdue !== 0 ?`${item.daysOverdue} days` : '-'}</Text> */}
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
        <View style={RevenueUnpaidInvoiceStyle.noDataContainer}>
          <Text style={RevenueUnpaidInvoiceStyle.noDataText}>No data</Text>
        </View>
      )}
    </View>
  );
};

export default UnpaidInvoice;
