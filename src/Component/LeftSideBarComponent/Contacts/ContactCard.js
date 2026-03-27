import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Linking, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Header from '../../../ReusableComponent/Header';
import ContactCardStyle from '../../../utils/Stylesheet/ContactCardStyle';
import ScheduleSection from './Components/ScheduleSection';
import ContactDetails from './Components/ContactDetails';
import ProfileSection from './Components/ProfileSection';
import StatsGrid from './Components/StatsGrid';
import { useContactStats } from './Hooks/useContactStats';

const ContactCard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { contactData } = route.params || {};
  const [item, setItem] = useState(contactData || {});
  

  const { ScheduleList } = useSelector(state => state.ScheduleList);
  const { GetFinishedJobData } = useSelector(state => state.GetFinishedJob);
  const { InvoiceList } = useSelector(state => state.InvoiceList);

  const [finishJobs, setFinishJobs] = useState([]);
  const [futureScheduleDates, setFutureScheduleDates] = useState([]);
console.log(contactData, 'contactData');

useEffect(() => {
  if (contactData) {
    setItem(contactData);
  }
}, [contactData]);


  const { phone, contact_category, email, id } = item || {};

  const openEmail = () => {
    if (email) {
      const emailUrl = `mailto:${email}`;
      Linking.openURL(emailUrl).catch(err =>
        console.error('Failed to open email client', err),
      );
    }
  };

  const handlePhonePress = () => {
    if (phone) {
      Alert.alert(
        'What do you want to do?',
        `Do you want to call ${phone} or send a text?`,
        [
          {
            text: 'Call',
            onPress: () => Linking.openURL(`tel:${phone}`),
          },
          {
            text: 'Text',
            onPress: () => Linking.openURL(`sms:${phone}`),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );
    }
  };

  const handleEditContact = () => {
    navigation.navigate('EditContact', { contactData: item });
  };

  useEffect(() => {
    setFinishJobs(GetFinishedJobData?.finishJob || []);
  }, [GetFinishedJobData]);

  useEffect(() => {
    if (item && ScheduleList?.Schedule) {
      const contactSchedules = ScheduleList.Schedule.filter(
        schedule => schedule.customer_id === String(item.id),
      );

      const futureSchedules = contactSchedules
        .filter(schedule => moment(schedule.date).isSameOrAfter(moment(), 'day'))
        .sort((a, b) => moment(a.date).diff(moment(b.date)));

      setFutureScheduleDates(futureSchedules.map(s => s.date));
    }
  }, [item, ScheduleList]);

  const {
    avgDaysToPay,
    latestInvoice,
    totalJobs,
    avgEnjoymentScale,
    avgEfficiency,
    totalAmount,
    lifeTimeValue,
  } = useContactStats({
    id: id,
    contactId: item?.ContactId,
    finishJobs,
    scheduleList: ScheduleList?.Schedule || [],
    invoices: InvoiceList?.Invoices || [],
  });

  if (!item) {
    return (
      <View style={ContactCardStyle.container}>
        <Header notificationIcon={true} backButton={true} route="Contacts" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={ContactCardStyle.container}>
      <Header notificationIcon={true} backButton={true} route="Contacts" />

      <ScrollView
        contentContainerStyle={ContactCardStyle.contentContainer}
        showsVerticalScrollIndicator={false}>
        <ProfileSection
          images={item?.images}
          firstName={item?.first_name}
          lastName={item?.last_name}
          id={id}
          onEdit={handleEditContact}
        />

        {!item?.contact_category?.includes('supplier') && (
          <StatsGrid
            totalJobs={totalJobs}
            lifeTimeValue={lifeTimeValue}
            latestInvoice={latestInvoice}
            avgDaysToPay={avgDaysToPay}
            avgEfficiency={avgEfficiency}
            referral={item?.referral}
            googleReview={item?.googleReview}
            avgEnjoymentScale={avgEnjoymentScale}
          />
        )}

        <ContactDetails
          phone={item?.phone}
          email={item?.email}
          contactCategory={item?.contact_category}
          businessName={item?.business_name}
          address={item?.address}
          onPhonePress={handlePhonePress}
          onEmailPress={openEmail}
        />

        {contact_category !== 'supplier' && (
          <ScheduleSection futureScheduleDates={futureScheduleDates} />
        )}
      </ScrollView>
    </View>
  );
};

export default ContactCard;