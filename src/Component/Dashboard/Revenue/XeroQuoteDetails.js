import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '../../../ReusableComponent/Header'; // Assuming this is your custom header
import {GetInvoicePdfUrl} from '../../../Redux/API/GetInvoiceApi';
import {PDF_Base_Url} from '../../../Redux/NWConfig';
import Colors from '../../../Assets/Style/Color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const XeroQuoteDetails = ({route}) => {
  const {LoginData} = useSelector(state => state.Login);
  const {QuotationList} = useSelector(state => state.QuotationList);

  const [downloadPdf, setDownloadPdf] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const {quote} = route.params;

  useEffect(() => {
    if (QuotationList?.Quotation?.length > 0) {
      const foundQuote = QuotationList.Quotation.find(
        q => q.quotation_serial_no === quote?.quotation_serial_no,
      );
      setDownloadPdf(foundQuote);
    } else {
      setDownloadPdf(null);
    }
  }, [QuotationList, quote]);

  useEffect(() => {
    if (quote?.InvoiceID && LoginData?.token && LoginData?.user?.id) {
      setLoading(true);
      const token1 = LoginData.token;
      const id = quote.InvoiceID;
      const franchiseid = {
        franchise_id: LoginData.user.id,
      };

      dispatch(GetInvoicePdfUrl({token1, id, franchiseid}))
        .catch(err => console.error('Failed to fetch invoice PDF URL:', err))
        .finally(() => setLoading(false));
    }
  }, [quote, LoginData, dispatch]);

  const handleDownloadPress = () => {
    const rawPath = downloadPdf?.pdf_path;
    if (!rawPath) return;
  
    // Get the relative path starting from storage/
    const storageIndex = rawPath.indexOf('storage/');
    const relativePath = storageIndex !== -1 ? rawPath.substring(storageIndex) : rawPath;
  
    // Construct final PDF URL
    const finalPdfUrl = PDF_Base_Url + relativePath.replace(/^storage\/app\/public\//, '');
  
    // Construct Google Docs Viewer URL
    const googleViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(finalPdfUrl)}`;
  
    console.log(finalPdfUrl, 'PDF URL');
    console.log(googleViewerUrl, 'Google Viewer URL');
  
    setPdfUrl(googleViewerUrl); // now opens in Google Docs Viewer
    setShowModal(true);
  };
  
  
  
  const calculateInvoiceTotal = item => {
    const parseJobArray = jobStr => {
      if (!jobStr || jobStr === 'null' || jobStr === '[]') return [];
      try {
        return JSON.parse(jobStr);
      } catch (e) {
        console.error('Invalid JSON:', jobStr);
        return [];
      }
    };

    const commercialJobs = parseJobArray(item.commercial_job);
    const residentialJobs = parseJobArray(item.residential_job);
    const storefrontJobs = parseJobArray(item.storefront_job);

    let total = 0;
    commercialJobs.forEach(job => (total += parseFloat(job.price || 0)));
    residentialJobs.forEach(job => (total += parseFloat(job.price || 0)));
    storefrontJobs.forEach(job => (total += parseFloat(job.price || 0)));

    return total;
  };

  const getStatusStyle = status => {
    switch (status?.toUpperCase()) {
      case 'ACCEPTED':
      case 'PAID':
        return styles.statusPaid;
      case 'DRAFT':
      case 'SENT':
        return styles.statusDefault;
      case 'DECLINED':
      case 'DUE':
        return styles.statusDue;
      default:
        return styles.statusDefault;
    }
  };

  const DetailRow = ({label, value}) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, {paddingBottom: insets.bottom}]}>
      <Header notificationIcon={true} backButton={true} route="Revenue" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <View style={styles.headerSection}>
            <Text style={styles.title}>Quote Details</Text>
            <View style={[styles.statusBadge, getStatusStyle(quote?.status)]}>
              <Text style={styles.statusText}>{quote?.status || 'N/A'}</Text>
            </View>
          </View>

          {/* Customer Details Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Customer Information</Text>
            <DetailRow label="Name" value={quote?.customer_name || 'N/A'} />
            <DetailRow label="Email" value={quote?.customer_email || 'N/A'} />
            <DetailRow label="Phone" value={quote?.customer_phone || 'N/A'} />
          </View>

          {/* Financials Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quote Financials</Text>
            <DetailRow
              label="Quote Number"
              value={quote?.quotation_serial_no || '-'}
            />
            <DetailRow
              label="Subtotal"
              value={`$${(quote?.SubTotal || 0).toFixed(2)}`}
            />
            <DetailRow
              label="Total Tax"
              value={`$${(quote?.TotalTax || 0).toFixed(2)}`}
            />
            <DetailRow
              label="Total Amount"
              value={`$${calculateInvoiceTotal(quote).toFixed(2)}`}
            />
          </View>

          {/* Dates Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Important Dates</Text>
            <DetailRow
              label="Issued Date"
              value={
                moment(quote?.DateString).isValid()
                  ? moment(quote.DateString).format('DD MMM YYYY')
                  : 'N/A'
              }
            />
            <DetailRow
              label="Expiry Date"
              value={
                moment(quote?.ExpiryDateString).isValid()
                  ? moment(quote.ExpiryDateString).format('DD MMM YYYY')
                  : 'N/A'
              }
            />
            {quote?.daysOverdue > 0 && (
              <DetailRow label="Days Overdue" value={quote.daysOverdue} />
            )}
          </View>

          {/* Download Button */}
          {downloadPdf?.pdf_path && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleDownloadPress}
                style={styles.actionButton}>
                <Icon
                  name="cloud-download"
                  size={20}
                  color={Colors.white_text_color}
                  style={styles.buttonIcon}
                />
                <Text style={styles.actionButtonText}>View PDF</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* PDF Modal */}
      <Modal
        visible={showModal}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Quote PDF</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}>
              <Icon name="close" size={24} color={Colors.white_text_color} />
            </TouchableOpacity>
          </View>
          {pdfUrl ? (
            <WebView
              source={{uri: pdfUrl}}
              style={styles.webView}
              originWhitelist={['*']}
              javaScriptEnabled
              domStorageEnabled
            />
          ) : (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={Colors.blue_theme_Color} />
              <Text style={{color: Colors.white_text_color, marginTop: 10}}>
                Loading PDF...
              </Text>
            </View>
          )}
        </SafeAreaView>
      </Modal>

      {/* Full-screen Loader */}
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.blue_theme_Color} />
          <Text style={styles.loaderText}>Loading Details...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.eerie_black_color, // Dark background
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.white_text_color,
  },
  card: {
    backgroundColor: Colors.grey_bg_Color, // Slightly lighter dark for cards
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.sidebar_Active_grey, // Subtle border for depth
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.blue_crayola_color,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.charcol_color, // Darker border
    paddingBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 15,
    color: Colors.philippine_silver_color, // Greyish text for labels
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: Colors.white_text_color,
    fontWeight: '600',
    textAlign: 'right',
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: Colors.white_text_color,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statusPaid: {
    backgroundColor: Colors.green_color, // Green from your color palette
  },
  statusDue: {
    backgroundColor: Colors.lava_color, // Red from your color palette
  },
  statusDefault: {
    backgroundColor: Colors.banana_Yellow_color, // Grey from your color palette
  },
  buttonContainer: {
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue_theme_Color, // Primary button color
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: Colors.blue_theme_Color,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  actionButtonText: {
    color: Colors.white_text_color,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.grey_bg_Color, // Dark modal background
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.charcol_color,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white_text_color,
  },
  closeButton: {
    padding: 5,
  },
  webView: {
    flex: 1,
    backgroundColor: Colors.grey_bg_Color, // Set a background for the WebView container
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.white_text_color,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grey_bg_Color,
  },
});

export default XeroQuoteDetails;