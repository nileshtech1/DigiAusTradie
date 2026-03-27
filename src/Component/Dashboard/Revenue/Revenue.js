import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import Header from '../../../ReusableComponent/Header';
import Quotes from './Quotes';
import PaidInvoice from './PaidInvoice';
import UnpaidInvoice from './UnpaidInvoice';
import RevenueRevenueStyle from '../../../utils/Stylesheet/RevenueRevenueStyle';
import useRevenueData from './hooks/useRevenueData';
import RevenuePieChart from './Components/RevenuePieChart';
import RevenueBarChart from './Components/RevenueBarChart';
import RevenueTabs from './Components/RevenueTabs';

const HEADER_HEIGHT = 60;

const Revenue = () => {
  const [activeTab, setActiveTab] = useState('Quotes');
  const [localPieData, setLocalPieData] = useState([]);
  const [localBarData, setLocalBarData] = useState([]);
  const { pieData, barData } = useRevenueData();

  useEffect(() => {
    if (pieData && barData) {
      setLocalPieData(pieData);
      setLocalBarData(barData);
    }
  }, [pieData, barData]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Quotes':
        return <Quotes />;
      case 'Paid':
        return <PaidInvoice />;
      case 'Unpaid':
        return <UnpaidInvoice />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={RevenueRevenueStyle.container}>
        <Header notificationIcon={true} backButton={true} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? HEADER_HEIGHT : 0}
        >
          <ScrollView
            style={RevenueRevenueStyle.contentContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
          >
            <RevenuePieChart pieData={localPieData} />
            <RevenueBarChart barData={localBarData} />
            <RevenueTabs activeTab={activeTab} setActiveTab={setActiveTab} renderContent={renderContent} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Revenue;
