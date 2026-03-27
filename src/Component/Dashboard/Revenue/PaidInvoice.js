import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../../Assets/Style/Color';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import {useSelector} from 'react-redux';
import PaidInvoiceStyle from '../../../utils/Stylesheet/PaidInvoiceStyle';

const PaidInvoice = () => {
  const navigation = useNavigation();
  const [paidInvoiceList, setPaidInvoiceList] = useState([]);
  const {InvoiceList} = useSelector(state => state.InvoiceList);

  const calculateDaysOverdue = dueDateString => {
    const dueDate = new Date(dueDateString);
    const today = new Date();
    const timeDiff = today - dueDate;
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      if (InvoiceList.Status === 'OK') {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const filterInvoicesByMonth = (invoices, month, year) => {
          return invoices?.filter(invoice => {
            const invoiceDate = new Date(invoice.DateString);
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

        const unpaidInvoices = currentMonthInvoices
          ?.filter(
            invoice => invoice.Status === 'PAID' && invoice.AmountDue == 0,
          )
          .map(invoice => ({
            ...invoice,
            daysOverdue: calculateDaysOverdue(invoice.DueDateString),
          }));

        setPaidInvoiceList(unpaidInvoices);
      }
    };

    fetchInvoices();
  }, [InvoiceList]);

  const TotalPaid = paidInvoiceList.length;
  const totalAmount = paidInvoiceList.reduce(
    (sum, item) => sum + item.AmountPaid,
    0,
  );

  const handleItemPress = item => {
    navigation.navigate('Details', {quote: item});
  };

  const renderHeader = () => (
    <View style={PaidInvoiceStyle.headerRow}>
      <Text style={PaidInvoiceStyle.headerText}>Customer</Text>
      <Text style={PaidInvoiceStyle.headerText}>Invoice</Text>
      <Text style={PaidInvoiceStyle.headerText}>Amount</Text>
      <Text style={PaidInvoiceStyle.headerText}>Status</Text>
      <VectorIcon
        icon="MaterialIcons"
        name="arrow-right"
        color={'#00000000'}
        size={30}
      />
    </View>
  );

  return (
    <View
      style={
        paidInvoiceList.length > 6
          ? PaidInvoiceStyle.container
          : PaidInvoiceStyle.container1
      }>
      {/* Summary Section */}
      <View style={PaidInvoiceStyle.summaryContainer}>
        <View style={PaidInvoiceStyle.summaryItem}>
          <Text style={PaidInvoiceStyle.summaryLabel}>Total Sent</Text>
          <Text style={PaidInvoiceStyle.summaryValue}>{TotalPaid}</Text>
        </View>
        <View style={PaidInvoiceStyle.summaryItem}>
          <Text style={PaidInvoiceStyle.summaryLabel}>Total Amount</Text>
          <Text style={PaidInvoiceStyle.summaryValue}>$ {totalAmount}</Text>
        </View>
      </View>

      {/* Table Header */}
      {renderHeader()}

      {/* List */}
      {paidInvoiceList.length > 0 ? (
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={PaidInvoiceStyle.listContainer}>
          {paidInvoiceList?.reverse()?.map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={PaidInvoiceStyle.row}
              onPress={() => handleItemPress(item)}>
              <Text style={PaidInvoiceStyle.cell}>{item?.Contact?.Name}</Text>
              <Text style={PaidInvoiceStyle.cell}>{item?.InvoiceNumber}</Text>
              <Text style={PaidInvoiceStyle.cell}>${item?.Total}</Text>
              <Text style={PaidInvoiceStyle.cell}>{item?.Status}</Text>
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
        <View style={PaidInvoiceStyle.noDataContainer}>
          <Text style={PaidInvoiceStyle.noDataText}>No data</Text>
        </View>
      )}
    </View>
  );
};

export default PaidInvoice;
