import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Header from '../../ReusableComponent/Header';
import { useSelector, useDispatch } from 'react-redux';
import NotificationStyle from '../../utils/Stylesheet/NotificationStyle';
import { saveReadNotification, loadReadNotifications } from '../../Redux/Slice/readNotificationsSlice';

const Notification = ({ navigation }) => {
  const dispatch = useDispatch();

  const { NotificationQuoteStatusUpdateData } = useSelector(
    state => state.Notification,
  );
  const { InvoiceList } = useSelector(state => state.InvoiceList);
  const { readNotifications } = useSelector(
    state => state.readNotifications,
  );

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    dispatch(loadReadNotifications());
  }, [dispatch]);

  useEffect(() => {
    const { already_accepted_quotes } = NotificationQuoteStatusUpdateData || {};

    const parseJSONField = field => {
      try {
        const clean = field?.replace(/\\/g, '');
        return JSON.parse(clean);
      } catch (err) {
        return [];
      }
    };

    const loadNotifications = async () => {
      if (already_accepted_quotes?.length) {
        const invoiceRefs =
          InvoiceList?.invoices?.map(inv => inv.reference?.toString()) || [];

        // Filter out quotes already invoiced
        const filteredQuotes = already_accepted_quotes.filter(
          quote => !invoiceRefs.includes(quote?.quotation_serial_no?.toString()),
        );

        // Filter quotes created within last 30 days
        const now = new Date();
        const filteredRecentQuotes = filteredQuotes.filter(quote => {
          const createdDate = new Date(quote.updated_at);
          const diffTime = Math.abs(now - createdDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 30;
        });

        // Sort by latest updated
        const sortedQuotes = [...filteredRecentQuotes].sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
        );

        // Format for rendering
        const formatted = sortedQuotes.map(quote => {
          const cleanedQuote = {
            ...quote,
            storefront_job: parseJSONField(quote.storefront_job),
            residential_job: parseJSONField(quote.residential_job),
            commercial_job: parseJSONField(quote.commercial_job),
            image: parseJSONField(quote.image),
            swms: parseJSONField(quote.swms),
          };

          const createdDate = new Date(quote.updated_at);
          const diffTime = Math.abs(now - createdDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const quoteId = quote?.quotation_serial_no?.toString();

          return {
            id: quoteId,
            title: 'Quotation Accepted',
            body: `${quote.customer_name} accepted quotation`,
            image: cleanedQuote.image?.[0]?.path
              ? {
                  uri: cleanedQuote.image[0].path.startsWith('http')
                    ? cleanedQuote.image[0].path
                    : `https://your-base-url.com/${cleanedQuote.image[0].path}`,
                }
              : null,
            isNew: !readNotifications.includes(quoteId),
            read: readNotifications.includes(quoteId),
            originalQuote: cleanedQuote,
            daysOld: diffDays,
          };
        });

        setNotifications(formatted);
      }
    };

    loadNotifications();
  }, [NotificationQuoteStatusUpdateData, readNotifications]);

  // 🟩 Handle Notification Press
  const handleNotificationPress = notificationItem => {
    dispatch(saveReadNotification(notificationItem.id));

    const updatedNotifications = notifications.map(n =>
      n.id === notificationItem.id ? { ...n, read: true, isNew: false } : n,
    );
    setNotifications(updatedNotifications);

    const isInvoiced = InvoiceList?.Invoices?.some(
      invoice =>
        invoice?.reference ===
          notificationItem?.originalQuote?.quotation_serial_no ||
        invoice?.reference === notificationItem?.originalQuote?.quotation_no,
    );

    if (isInvoiced) {
      Alert.alert(
        'Already Invoiced',
        'This quote has already been invoiced.',
        [
          { text: 'OK', style: 'cancel' },
          {
            text: 'View Invoice',
            onPress: () => navigation.navigate('Revenue'),
          },
        ],
        { cancelable: true },
      );
      return;
    }

    navigation.navigate('QuoteView', {
      selectedQuote: notificationItem?.originalQuote,
    });
  };

  return (
    <View style={NotificationStyle.container}>
      <Header notificationIcon={true} backButton={true} />
      <View style={{ paddingHorizontal: 20, paddingTop: 15, flex: 1 }}>
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[NotificationStyle.notification]}
                onPress={() => handleNotificationPress(item)}>
                {item.image ? (
                  <Image
                    source={item.image}
                    style={NotificationStyle.notificationImage}
                  />
                ) : null}
                <View style={NotificationStyle.notificationHeader}>
                  <Text style={NotificationStyle.title}>
                    <Text style={NotificationStyle.idBackground}>
                      {' '}
                      {item.id}{' '}
                    </Text>{' '}
                    {item.title}
                  </Text>
                  <Text style={{ fontStyle: 'italic', color: 'gray' }}>
                    {item.daysOld} day{item.daysOld > 1 ? 's' : ''} ago
                  </Text>
                </View>
                <View style={NotificationStyle.notificationContent}>
                  <Text
                    style={[
                      NotificationStyle.message,
                      item.isNew && NotificationStyle.newMessage,
                    ]}>
                    {item.body}
                  </Text>
                  {!item.read && (
                    <Text
                      style={
                        item.daysOld <= 5 ? NotificationStyle.newTag : ''
                      }>
                      {item.daysOld <= 5 ? 'New' : ''}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'gray', fontSize: 16 }}>
              No notifications yet
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Notification;
