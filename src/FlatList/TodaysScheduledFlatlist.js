import React, { useRef, useEffect, useState } from 'react';
import { FlatList, View, Linking, Text } from 'react-native';
import { useSelector } from 'react-redux';
import ScheduleListStyle from '../utils/Stylesheet/TodaysScheduleStyle';
import { quote_image_path } from '../Redux/NWConfig';
import { calculateEstimatedTime } from './Utils/timeCalculation';
import { calculateTotalPrice, calculateJobPrice } from './Utils/priceCalculation';

// Import components
import JobItem from './Components/JobItem';
import NoJobs from './Components/NoJobs';
import SummaryRow from './Components/SummaryRow';

const TodaysScheduledFlatlist = ({ jobs, scrollToJobId }) => {
  const [itemHeight, setItemHeight] = useState(null);
  const [total, setTotal] = useState('');
  const flatListRef = useRef(null);
  const { LoginData } = useSelector(state => state.Login);
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0];
  const validJobs = jobs.filter(job => job.customer_id !== 'Quote');
  const length = validJobs.length;

  // Scroll to the job with the provided ID (scrollToJobId)
  useEffect(() => {
    if (scrollToJobId) {
      const index = jobs.findIndex(job => job.id === scrollToJobId);
      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }
  }, [scrollToJobId, jobs]);

  useEffect(() => {
    if (scrollToJobId && scrollToJobId.jobId) {
      const jobIndex = jobs.findIndex(job => job.id === scrollToJobId.jobId);
      if (jobIndex !== -1 && flatListRef.current) {
        flatListRef?.current?.scrollToIndex({ index: jobIndex, animated: true });
      }
    }
  }, [scrollToJobId, jobs]);

  useEffect(() => {
    setTotal(calculateTotalPrice(jobs));
  }, [jobs]);

  const handlePhoneClick = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleTextMessage = (phoneNumber, message) => {
    const smsURL = `sms:${phoneNumber}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
    Linking.openURL(smsURL).catch(err => console.error('Failed to send SMS:', err));
  };

  const handleAddressClick = address => {
    const formattedAddress = encodeURIComponent(address);
    Linking.openURL(`geo:0,0?q=${formattedAddress}`);
  };

  const handleItemLayout = event => {
    const { height } = event.nativeEvent.layout;
    if (!itemHeight) {
      setItemHeight(height);
    }
  };

  const getItemLayout = (data, index) => ({
    length: itemHeight || 100,
    offset: (itemHeight || 100) * index,
    index,
  });

  const handleScrollToIndexFailed = error => {
    const { index } = error;
    console.warn('Error scrolling to index:', index);
    flatListRef.current.scrollToIndex({ index: 0, animated: true });
  };

  const renderJobItem = ({ item, index }) => {
    const estimatedTime = calculateEstimatedTime(item?.start_time, item?.end_time, todayDate);
    const totalPrice = calculateJobPrice(item);

    return (
      <JobItem
        item={item}
        index={index}
        length={length}
        handlePhoneClick={handlePhoneClick}
        handleTextMessage={handleTextMessage}
        handleAddressClick={handleAddressClick}
        LoginData={LoginData}
        quote_image_path={quote_image_path}
        estimatedTime={estimatedTime}
        totalPrice={totalPrice}
        onLayout={handleItemLayout}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={ScheduleListStyle.titleContainer}>
        <Text style={ScheduleListStyle.titleMain}>Today Schedule's</Text>
      </View>
      
      {jobs.length === 0 ? (
        <NoJobs />
      ) : (
        <>
          <SummaryRow label="Jobs Booked" value={length} />
          <SummaryRow label="Est Revenue" value={`$ ${total}`} />
          
          <FlatList
            ref={flatListRef}
            data={jobs}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={renderJobItem}
            getItemLayout={getItemLayout}
            onScrollToIndexFailed={handleScrollToIndexFailed}
          />
        </>
      )}
    </View>
  );
};

export default TodaysScheduledFlatlist;