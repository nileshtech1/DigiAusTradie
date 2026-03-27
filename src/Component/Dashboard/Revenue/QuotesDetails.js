// QuoteDetails.js (Updated)
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Share,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GetInvoicePdfUrl} from '../../../Redux/API/GetInvoiceApi';
import {useNavigation, useRoute} from '@react-navigation/native';
import {IMAGE_BASE_URL} from '../../../Redux/NWConfig';
import WebView from 'react-native-webview';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Header from '../../../ReusableComponent/Header';
import Colors from '../../../Assets/Style/Color';
import InvoiceDetailsStyle from '../../../utils/Stylesheet/InvoiceDetailsStyle';

import EditPaymentModal from './EditPaymentModal';
import { AddPaymentHistoryApi } from '../../../Redux/API/AddPaymentHistory';
import { GetPaymenthistoryApi } from '../../../Redux/API/GetPaymentHistoryApi';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import DashboardStyle from '../../../utils/Stylesheet/DashboardStyle';
import DashedLoader from '../../../ReusableComponent/DashedLoader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const QuoteDetails = () => {
  const {LoginData} = useSelector(state => state.Login);
  const {PdfInvoiceList} = useSelector(state => state.InvoiceList);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { quote } = route.params;
  const insets = useSafeAreaInsets();

  const [showModal, setShowModal] = useState(false);
  const [amountPaid, setAmountPaid] = useState(0);
  const [finalStatus, setFinalStatus] = useState("unpaid");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { GetPaymentHistoryData, GetPaymentHistoryLoading } = useSelector(state => state.GetPaymentHistory);
  const { AddPaymentHistoryLoading } = useSelector(state => state.AddPaymentHistory);
  useEffect(() => {
    const GetPaymentHistory = async () => {
      const id = quote.id;
      const franchiseid = LoginData?.user?.id;
      const token = LoginData.token;
      dispatch(GetPaymenthistoryApi({token, id, franchiseid}))
    }
    GetPaymentHistory();
  }, [quote]);

  useEffect(() => {
    if (
      GetPaymentHistoryData?.status === true &&
      GetPaymentHistoryData?.payment_history
    ) {
      const paymentsForThisInvoice = GetPaymentHistoryData.payment_history.filter(
        (payment) => String(payment.invoice_id) === String(quote.id)
      );
  
      const totalPaid = paymentsForThisInvoice.reduce(
        (sum, payment) => sum + parseFloat(payment.amount || 0),
        0
      );
  
      setAmountPaid(totalPaid); // <- set state
      console.log("Amount Paid:", totalPaid);
  
      const hasPaid = paymentsForThisInvoice.some(
        (p) => p.status?.toLowerCase() === "paid"
      );
  
      const hasPartial = paymentsForThisInvoice.some(
        (p) => p.status?.toLowerCase() === "partial"
      );
  
      let status = "unpaid";
  
      if (hasPaid) status = "paid";
      else if (hasPartial) status = "partial";
  
      setFinalStatus(status); // <- set state
      console.log("Final Status:", status);
    }
  }, [GetPaymentHistoryData]);
  

  useEffect(() => {
    if (quote && quote.InvoiceID) {
      const token1 = LoginData.token;
      const id = quote.InvoiceID;

      const sendInvoiceIdToApi = async () => {
        setLoading(true);
        const franchiseid = {
          franchise_id: LoginData?.user?.id,
        };
        try {
          await dispatch(GetInvoicePdfUrl({token1, id, franchiseid})).unwrap();
        } catch (error) {
          console.error('API error:', error);
          Alert.alert('Error', 'Failed to fetch invoice details.');
        } finally {
          setLoading(false);
        }
      };

      sendInvoiceIdToApi();
    }
  }, [quote?.InvoiceID, LoginData, dispatch]);

  const handleViewInvoice = () => {
    if (quote && quote?.pdf_path !== null) {
      const url = IMAGE_BASE_URL + quote.pdf_path;
      const googleDocUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;

      console.log(googleDocUrl, 'Google Docs PDF URL');

      setPdfUrl(googleDocUrl);
      setShowModal(true);
    } else {
      Alert.alert('Invoice Not Available', 'The invoice PDF could not be found.');
    }
  };


  const handleShareRatingLink = async () => {
    try {
      if (!quote?.rating_path) {
        Alert.alert('No rating link available');
        return;
      }

      await Share.share({
        message: `Please rate your experience: ${quote.rating_path}`,
        title: 'Rate Your Experience',
      });
    } catch (error) {
      console.error('Error sharing link:', error);
      Alert.alert('Error', 'Could not share the rating link.');
    }
  };

  const handleEditInvoice = () => {
    setShowPaymentModal(true);
  };

 
  const handlePaymentSuccess = async(paidAmount, paymentSource, paymentDetails, paymentStatus) => {
    console.log('Payment Recorded:', { paidAmount, paymentSource, paymentDetails, paymentStatus });

    const id = quote.InvoiceID;
    const franchiseid = LoginData?.user?.id;
    if (paymentSource === 'bank') {
      const postData = {
            invoice_id: quote.id,
            amount: paidAmount,
            status: paymentStatus,
            bsb: paymentDetails.bsb,
            accountNumber: paymentDetails.accountNumber,
            reference: paymentDetails.reference,
            datePaid: paymentDetails.datePaid,
            notes: paymentDetails.note,
            payment_method : 'bank',
            franchise_id: franchiseid
      }
     const res =  await dispatch(AddPaymentHistoryApi(postData));
     if (res.payload.status === true) {
      const id = quote.id;
      const franchiseid = LoginData?.user?.id;
      const token = LoginData.token;

      dispatch(GetPaymenthistoryApi({token, id, franchiseid}))
      Alert.alert('Success', `Payment of $${paidAmount.toFixed(2)} recorded successfully as ${paymentStatus}.`);
     }

    } else if (paymentSource === 'paypal') {
        const postData = {
            invoice_id: quote.id,
            amount: paidAmount,
            status: paymentStatus,
            transactionId: paymentDetails.transactionId,
            payerEmail: paymentDetails.payerEmail,
            datePaid: paymentDetails.datePaid,
            notes: paymentDetails.note,
            payment_method : 'paypal',
            franchise_id: franchiseid
        }
       const res =  await dispatch(AddPaymentHistoryApi(postData));
       if (res.payload.status === true) {
        const id = quote.id;
        const franchiseid = LoginData?.user?.id;
        const token = LoginData.token;
  
        dispatch(GetPaymenthistoryApi({token, id, franchiseid}))
        Alert.alert('Success', `Payment of $${paidAmount.toFixed(2)} recorded successfully as ${paymentStatus}.`);
       }
    } else if (paymentSource === 'cheque') {
        const postData = {
            invoice_id: quote.id,
            amount: paidAmount,
            status: paymentStatus,
            chequeNumber: paymentDetails.chequeNumber,
            bankName: paymentDetails.bankName,
            dateReceived: paymentDetails.dateReceived,
            notes: paymentDetails.note,
            payment_method : 'cheque',
            franchise_id: franchiseid
        }
        const res =  await dispatch(AddPaymentHistoryApi(postData));
        if (res.payload.status === true) {
          const id = quote.id;
          const franchiseid = LoginData?.user?.id;
          const token = LoginData.token;
    
          dispatch(GetPaymenthistoryApi({token, id, franchiseid}))
         Alert.alert('Success', `Payment of $${paidAmount.toFixed(2)} recorded successfully as ${paymentStatus}.`);
        }
    } else if (paymentSource === 'cash') {
        const postData = {
            invoice_id: quote.id,
            amount: paidAmount,
            status: paymentStatus,
            dateReceived: paymentDetails.dateReceived,
            notes: paymentDetails.note,
            payment_method : 'cash',
            franchise_id: franchiseid
        }
        const res =  await dispatch(AddPaymentHistoryApi(postData));
        if (res.payload.status === true) {
          const id = quote.id;
          const franchiseid = LoginData?.user?.id;
          const token = LoginData.token;
    
          dispatch(GetPaymenthistoryApi({token, id, franchiseid}))
         Alert.alert('Success', `Payment of $${paidAmount.toFixed(2)} recorded successfully as ${paymentStatus}.`);
        }
    } else if (paymentSource === 'upi') {
        const postData = {
            invoice_id: quote.id,
            amount: paidAmount,
            status: paymentStatus,
            transactionId: paymentDetails.transactionId,
            payerUPIId: paymentDetails.payerUPIId,
            datePaid: paymentDetails.datePaid,
            notes: paymentDetails.note,
            payment_method : 'upi',
            franchise_id: franchiseid
        }
        const res =  await dispatch(AddPaymentHistoryApi(postData));
        if (res.payload.status === true) {
          const id = quote.id;
          const franchiseid = LoginData?.user?.id;
          const token = LoginData.token;
    
          dispatch(GetPaymenthistoryApi({token, id, franchiseid}))
         Alert.alert('Success', `Payment of $${paidAmount.toFixed(2)} recorded successfully as ${paymentStatus}.`);
        }
    }


    // Client-side update for demonstration
    // setquote(prevQuote => {
    //   const newAmountPaid = (prevQuote.AmountPaid || 0) + paidAmount;
    //   const newStatus = newAmountPaid >= prevQuote.totalAmount ? 'PAID' : 'UNPAID';
    //   return {
    //     ...prevQuote,
    //     AmountPaid: newAmountPaid,
    //     status: newStatus,
    //     lastPaymentSource: paymentSource,
    //     lastPaymentDetails: paymentDetails, // Store all collected details
    //   };
    // });
  };


  const DetailRow = ({label, value, isStatus, status}) => (
    <View style={InvoiceDetailsStyle.detailRow}>
      <Text style={InvoiceDetailsStyle.detailLabel}>{label}</Text>
      {isStatus ? (
        <View style={[InvoiceDetailsStyle.statusBadge, getStatusStyle(status)]}>
          <Text style={InvoiceDetailsStyle.statusText}>{value}</Text>
        </View>
      ) : (
        <Text style={InvoiceDetailsStyle.detailValue}>{value}</Text>
      )}
    </View>
  );

  const getStatusStyle = status => {
    switch (status?.toUpperCase()) {
      case 'PAID':
        return InvoiceDetailsStyle.statusPaid;
      case 'UNPAID':
        return InvoiceDetailsStyle.statusDue;
        case 'PARTIAL':
          return InvoiceDetailsStyle.partialsDue;
      default:
        return InvoiceDetailsStyle.statusDefault;
    }
  };

  return (
    <SafeAreaView style={[InvoiceDetailsStyle.container, { paddingBottom: insets.bottom }]}>
      <Header notificationIcon={true} backButton={true} route="Revenue" />
      <ScrollView contentContainerStyle={InvoiceDetailsStyle.scrollViewContent}>
        <View style={InvoiceDetailsStyle.contentContainer}>
          <View style={InvoiceDetailsStyle.headerSection}>
            <Text style={InvoiceDetailsStyle.title}>Invoice Details</Text>
            {
              finalStatus !== 'paid' && (
                <TouchableOpacity onPress={handleEditInvoice} style={InvoiceDetailsStyle.editIconContainer}>
                <VectorIcon icon="MaterialIcons" name="edit" size={24} color={Colors.black_bg_Theme} />
              </TouchableOpacity>
              )
            }
          
            <View style={[InvoiceDetailsStyle.statusBadge, getStatusStyle(finalStatus? finalStatus : quote?.status)]}>
              <Text style={InvoiceDetailsStyle.statusText}>{finalStatus? finalStatus : quote?.status}</Text>
            </View>
          </View>

          {/* Customer Details Card */}
          <View style={InvoiceDetailsStyle.card}>
            <Text style={InvoiceDetailsStyle.cardTitle}>Customer Information</Text>
            <DetailRow label="Customer Name" value={quote?.customer_name || '-'} />
            {/* <DetailRow label="Invoice Type" value={quote?.Type || '-'} /> */}
            <DetailRow label="Category" value={quote?.category || '-'} />
            <DetailRow label="Reference" value={quote?.reference || '-'} />
          </View>

          {/* Financial Details Card */}
          <View style={InvoiceDetailsStyle.card}>
            <Text style={InvoiceDetailsStyle.cardTitle}>Financial Details</Text>
            <DetailRow label="Invoice Number" value={quote?.invoice_id || '-'} />
            <DetailRow label="Total Amount" value={`$${quote?.totalAmount?.toFixed(2) || '0.00'}`} />
            {amountPaid > 0 && (
              <DetailRow label="Amount Paid" value={`$${amountPaid?.toFixed(2) || '0.00'}`} />
            )}
            {quote?.status !== 'PAID' && (
              <DetailRow label="Amount Due" value={`$${(quote?.totalAmount - (amountPaid || 0)).toFixed(2) || '0.00'}`} />
            )}
            {/* <DetailRow label="Total Tax" value={`$${quote?.TotalTax?.toFixed(2) || '0.00'}`} /> */}
          </View>

          {/* Due Date Information */}
          {quote?.status !== 'PAID' && (
            <View style={InvoiceDetailsStyle.card}>
              <Text style={InvoiceDetailsStyle.cardTitle}>Payment Timeline</Text>
              <DetailRow
                label="Days Overdue"
                value={quote?.daysOverdue > 0 ? `${quote.daysOverdue} days` : '-'}
              />
              <DetailRow
                label="Due Date"
                value={quote?.due_date ? quote.due_date.split('T')[0] : '-'}
              />
            </View>
          )}

          {/* Action Buttons */}
          <View style={InvoiceDetailsStyle.buttonContainer}>
            <TouchableOpacity
              style={InvoiceDetailsStyle.actionButton}
              onPress={handleViewInvoice}>
              <VectorIcon icon="MaterialIcons" name="picture-as-pdf" size={20} color={Colors.white_text_color} style={InvoiceDetailsStyle.buttonIcon} />
              <Text style={InvoiceDetailsStyle.actionButtonText}>View Invoice</Text>
            </TouchableOpacity>

            {quote?.rating_path && (
              <TouchableOpacity
                style={[InvoiceDetailsStyle.actionButton, InvoiceDetailsStyle.shareButton]}
                onPress={handleShareRatingLink}>
                <VectorIcon icon="MaterialIcons" name="share" size={20} color={Colors.white_text_color} style={InvoiceDetailsStyle.buttonIcon} />
                <Text style={InvoiceDetailsStyle.actionButtonText}>Share Rating Link</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      {/* PDF Modal */}
      <Modal
        visible={showModal}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <SafeAreaView style={InvoiceDetailsStyle.modalContainer}>
          <View style={InvoiceDetailsStyle.modalHeader}>
            <Text style={InvoiceDetailsStyle.modalTitle}>Invoice PDF</Text>
            <TouchableOpacity
              style={InvoiceDetailsStyle.closeButton}
              onPress={() => setShowModal(false)}>
              <VectorIcon icon="MaterialIcons" name="close" size={24} color={Colors.white_text_color} />
            </TouchableOpacity>
          </View>
          {pdfUrl ? (
            <WebView
              source={{uri: pdfUrl}}
              style={InvoiceDetailsStyle.webView}
              originWhitelist={['*']}
              javaScriptEnabled
              domStorageEnabled
            />
          ) : (
            <View style={InvoiceDetailsStyle.centered}>
              <ActivityIndicator size="large" color={Colors.blue_crayola_color} />
              <Text>Loading PDF...</Text>
            </View>
          )}
        </SafeAreaView>
      </Modal>

      {/* Payment Modal */}
      <EditPaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        invoiceNumber={quote?.invoice_id}
        totalAmount={quote?.totalAmount || 0}
        amountPaid={amountPaid || 0}
        onPaymentSuccess={handlePaymentSuccess}
        
      />

      {/* Full-screen Loader */}
      {loading && (
        <View style={InvoiceDetailsStyle.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.blue_crayola_color} />
          <Text style={InvoiceDetailsStyle.loaderText}>Fetching invoice, hang tight...</Text>
        </View>
      )}
      {AddPaymentHistoryLoading || GetPaymentHistoryLoading && (
        <View style={DashboardStyle.loaderContainer}>
          <View style={DashboardStyle.loader}>
          <DashedLoader color={Colors.Neon_Blue_Theme_Color} size={100} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default QuoteDetails;