// Components/EditPaymentModal.js
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-date-picker'; // Import the date picker
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Colors from '../../../Assets/Style/Color';
import InvoiceDetailsStyle from '../../../utils/Stylesheet/InvoiceDetailsStyle';

// Helper function to format date
const formatDate = (date) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

// Define payment options and their specific fields for Australia context
const paymentOptions = [
  {
    key: "bank",
    label: "Bank Transfer (EFT)",
    iconLib: "MaterialCommunityIcons",
    iconName: "bank",
    fields: [
      { id: "bsb", label: "BSB Number", type: "numeric", placeholder: "e.g., 000-000", maxLength: 6, required: true },
      { id: "accountNumber", label: "Account Number", type: "numeric", placeholder: "e.g., 123456789", maxLength: 9, required: true },
      { id: "reference", label: "Payment Reference/Description", type: "text", placeholder: "e.g., INV-2024-007", required: true },
      { id: "datePaid", label: "Date Paid (YYYY/MM/DD)", type: "date", placeholder: "e.g., 2024/07/25", required: true }, // Changed type to "date"
    ],
  },
  {
    key: "paypal",
    label: "PayPal",
    iconLib: "Fontisto",
    iconName: "paypal",
    fields: [
      { id: "transactionId", label: "PayPal Transaction ID", type: "text", placeholder: "e.g., ABC123DEF456", required: true },
      { id: "payerEmail", label: "Payer Email (Optional)", type: "email", placeholder: "e.g., example@email.com", required: false },
      { id: "datePaid", label: "Date Paid (YYYY/MM/DD)", type: "date", placeholder: "e.g., 2024/07/25", required: true }, // Changed type to "date"
    ],
  },
  {
    key: "cheque",
    label: "Cheque",
    iconLib: "MaterialIcons",
    iconName: "payments",
    fields: [
      { id: "chequeNumber", label: "Cheque Number", type: "numeric", placeholder: "e.g., 000123", required: true },
      { id: "bankName", label: "Issuing Bank Name", type: "text", placeholder: "e.g., Commonwealth Bank", required: true },
      { id: "dateReceived", label: "Date Received (YYYY/MM/DD)", type: "date", placeholder: "e.g., 2024/07/25", required: true }, // Changed type to "date"
    ],
  },
  {
    key: "cash",
    label: "Cash",
    iconLib: "FontAwesome",
    iconName: "money",
    fields: [
      { id: "dateReceived", label: "Date Received (YYYY/MM/DD)", type: "date", placeholder: "e.g., 2024/07/25", required: true }, // Changed type to "date"
    ],
  },
  {
    key: "upi",
    label: "UPI ID (Not typical for AU)",
    iconLib: "MaterialCommunityIcons",
    iconName: "bank-transfer",
    fields: [
      { id: "transactionId", label: "UPI Transaction ID", type: "text", placeholder: "e.g., T1234567890", required: true },
      { id: "payerUPIId", label: "Payer UPI ID", type: "text", placeholder: "e.g., example@bank", required: true },
      { id: "datePaid", label: "Date Paid (YYYY/MM/DD)", type: "date", placeholder: "e.g., 2024/07/25", required: true }, // Changed type to "date"
    ],
  },
];


const EditPaymentModal = ({
  visible,
  onClose,
  invoiceNumber,
  totalAmount,
  amountPaid,
  onPaymentSuccess,
}) => {
  const remainingAmount = totalAmount - amountPaid;
  const [amountToPay, setAmountToPay] = useState(remainingAmount.toFixed(2));
  const [error, setError] = useState('');
  const [selectedPaymentSource, setSelectedPaymentSource] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [note, setNote] = useState(''); // New state for the note field

  // State for date picker
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [currentDateField, setCurrentDateField] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (visible) {
      setAmountToPay(remainingAmount.toFixed(2));
      setError('');
      setSelectedPaymentSource(null);
      setPaymentDetails({});
      setNote(''); 
      setSelectedDate(new Date()); 
    }
  }, [visible, remainingAmount]);

  const handlePaymentDetailChange = (fieldId, value) => {
    setPaymentDetails(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleDateConfirm = (date) => {
    setDatePickerOpen(false);
    if (currentDateField) {
      handlePaymentDetailChange(currentDateField, formatDate(date));
    }
    setSelectedDate(date);
  };

  const openDatePicker = (fieldId, currentValue) => {
    setCurrentDateField(fieldId);
    const initialDate = currentValue ? new Date(currentValue.replace(/\//g, '-')) : new Date();
    setSelectedDate(initialDate);
    setDatePickerOpen(true);
  };

  const validatePaymentDetails = () => {
    if (!selectedPaymentSource) {
      Alert.alert('Missing Information', 'Please select a payment method.');
      return false;
    }

    const currentSource = paymentOptions.find(opt => opt.key === selectedPaymentSource);
    if (!currentSource) return false;

    for (const field of currentSource.fields) {
      if (field.required && (!paymentDetails[field.id] || paymentDetails[field.id].trim() === '')) {
          Alert.alert('Missing Information', `Please enter the ${field.label}.`);
          return false;
      }
    }
    return true;
  };

  const handlePayment = () => {
    const payAmount = parseFloat(amountToPay);

    if (!validatePaymentDetails()) return;

    if (isNaN(payAmount) || payAmount <= 0) {
      setError('Please enter a valid amount greater than zero.');
      return;
    }

    if (payAmount > remainingAmount) {
        setError(`Entered amount ($${payAmount.toFixed(2)}) exceeds remaining amount ($${remainingAmount.toFixed(2)}). Please adjust the amount.`);
        return;
    }

    const paymentStatus = payAmount === remainingAmount ? 'paid' : 'partial';
    const alertTitle = paymentStatus === 'paid' ? 'Confirm paid Payment' : 'Confirm Partial Payment';
    const alertMessage = paymentStatus === 'paid'
      ? `You are about to record the full remaining payment of $${payAmount.toFixed(2)} from ${paymentOptions.find(opt => opt.key === selectedPaymentSource)?.label} for Invoice ${invoiceNumber}. Do you want to proceed?`
      : `You are about to record a partial payment of $${payAmount.toFixed(2)} from ${paymentOptions.find(opt => opt.key === selectedPaymentSource)?.label} for Invoice ${invoiceNumber}. Do you want to proceed?`;

    Alert.alert(
      alertTitle,
      alertMessage,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            console.log('Simulating Payment:', {
              invoiceNumber,
              amount: payAmount,
              source: selectedPaymentSource,
              details: { ...paymentDetails, note }, // Include note in details
              status: paymentStatus,
            });
            onPaymentSuccess(payAmount, selectedPaymentSource, { ...paymentDetails, note }, paymentStatus);

            onClose();
          },
        },
      ]
    );
  };


  const renderPaymentFields = () => {
    const currentSource = paymentOptions.find(opt => opt.key === selectedPaymentSource);
    if (!currentSource) return null;

    return currentSource.fields.map(field => (
      <View key={field.id} style={InvoiceDetailsStyle.paymentInputFieldContainer}>
        <Text style={InvoiceDetailsStyle.inputLabel}>{field.label}{field.required ? '*' : ''}:</Text>
        {field.type === 'date' ? (
          <TouchableOpacity onPress={() => openDatePicker(field.id, paymentDetails[field.id])} style={InvoiceDetailsStyle.dateInputButton}>
            <TextInput
              style={InvoiceDetailsStyle.amountInput}
              placeholder={field.placeholder}
              placeholderTextColor={Colors.philippine_silver_color}
              value={paymentDetails[field.id] || ''}
              editable={false} // Make it non-editable to force date picker
            />
            <VectorIcon
              icon="MaterialIcons"
              name="calendar-today"
              size={20}
              color={Colors.philippine_silver_color}
              style={InvoiceDetailsStyle.calendarIcon}
            />
          </TouchableOpacity>
        ) : (
          <TextInput
            style={InvoiceDetailsStyle.amountInput}
            keyboardType={field.type === 'numeric' ? 'numeric' : (field.type === 'email' ? 'email-address' : 'default')}
            placeholder={field.placeholder}
            placeholderTextColor={Colors.philippine_silver_color}
            value={paymentDetails[field.id] || ''}
            onChangeText={(text) => handlePaymentDetailChange(field.id, text)}
            maxLength={field.maxLength}
          />
        )}
      </View>
    ));
  };


  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={InvoiceDetailsStyle.modalOverlay}
      >
        <View style={InvoiceDetailsStyle.paymentModalContainer}>
          <TouchableOpacity style={InvoiceDetailsStyle.paymentModalCloseButton} onPress={onClose}>
            <VectorIcon icon="MaterialIcons" name="close" size={24} color={Colors.white_text_color} />
          </TouchableOpacity>
          <Text style={InvoiceDetailsStyle.paymentModalTitle}>Invoice Payment</Text>

          <ScrollView showsVerticalScrollIndicator={false} style={InvoiceDetailsStyle.paymentModalScrollView}>
            <View style={InvoiceDetailsStyle.paymentDetailRow}>
              <Text style={InvoiceDetailsStyle.paymentDetailLabel}>Invoice Number:</Text>
              <Text style={InvoiceDetailsStyle.paymentDetailValue}>{invoiceNumber || '-'}</Text>
            </View>
            <View style={InvoiceDetailsStyle.paymentDetailRow}>
              <Text style={InvoiceDetailsStyle.paymentDetailLabel}>Total Amount:</Text>
              <Text style={InvoiceDetailsStyle.paymentDetailValue}>${totalAmount?.toFixed(2) || '0.00'}</Text>
            </View>
            <View style={InvoiceDetailsStyle.paymentDetailRow}>
              <Text style={InvoiceDetailsStyle.paymentDetailLabel}>Amount Paid:</Text>
              <Text style={InvoiceDetailsStyle.paymentDetailValue}>${amountPaid?.toFixed(2) || '0.00'}</Text>
            </View>
            <View style={InvoiceDetailsStyle.paymentDetailRow}>
              <Text style={InvoiceDetailsStyle.paymentDetailLabel}>Remaining Amount:</Text>
              <Text style={InvoiceDetailsStyle.paymentDetailValue}>${remainingAmount.toFixed(2)}</Text>
            </View>

            {remainingAmount > 0 ? (
              <>
                <Text style={InvoiceDetailsStyle.inputLabel}>Amount to Pay:</Text>
                <TextInput
                  style={InvoiceDetailsStyle.amountInput}
                  keyboardType="numeric"
                  value={amountToPay}
                  onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9.]/g, '');
                    if (numericText.split('.').length > 2) {
                        setAmountToPay(numericText.substring(0, numericText.lastIndexOf('.')));
                    } else {
                        setAmountToPay(numericText);
                    }
                    setError('');
                  }}
                  placeholder={`Enter amount (max $${remainingAmount.toFixed(2)})`}
                  placeholderTextColor={Colors.philippine_silver_color}
                />
                {error ? <Text style={InvoiceDetailsStyle.errorText}>{error}</Text> : null}

                <Text style={InvoiceDetailsStyle.inputLabel}>Payment Method:</Text>
                <View style={InvoiceDetailsStyle.paymentMethodContainer}>
                  {paymentOptions.map((option) => (
                    <TouchableOpacity
                      key={option.key}
                      style={[
                        InvoiceDetailsStyle.paymentMethodButton,
                        selectedPaymentSource === option.key && InvoiceDetailsStyle.paymentMethodButtonSelected,
                      ]}
                      onPress={() => {
                          setSelectedPaymentSource(option.key);
                          setPaymentDetails({}); // Clear details when method changes
                      }}
                    >
                      <VectorIcon
                        icon={option.iconLib}
                        name={option.iconName}
                        size={20}
                        color={selectedPaymentSource === option.key ? Colors.white_text_color : Colors.philippine_silver_color}
                      />
                      <Text
                        style={[
                          InvoiceDetailsStyle.paymentMethodText,
                          selectedPaymentSource === option.key && InvoiceDetailsStyle.paymentMethodTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {selectedPaymentSource && renderPaymentFields()}

                {/* New Note Field */}
                <View style={InvoiceDetailsStyle.paymentInputFieldContainer}>
                    <Text style={InvoiceDetailsStyle.inputLabel}>Note (Optional):</Text>
                    <TextInput
                        style={[InvoiceDetailsStyle.amountInput, InvoiceDetailsStyle.noteInput]} // Added noteInput style
                        placeholder="Add any relevant notes here"
                        placeholderTextColor={Colors.philippine_silver_color}
                        value={note}
                        onChangeText={setNote}
                        multiline
                        numberOfLines={3}
                    />
                </View>

                <View style={InvoiceDetailsStyle.paymentButtonContainer}>
                  <TouchableOpacity
                    style={[InvoiceDetailsStyle.paymentButton, InvoiceDetailsStyle.fullPayButton]} // Reusing fullPayButton for the single Pay button
                    onPress={handlePayment}>
                    <Text style={InvoiceDetailsStyle.paymentButtonText}>Record Payment</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Text style={InvoiceDetailsStyle.paidStatusText}>This invoice has been fully paid.</Text>
            )}
          </ScrollView>

          {/* Date Picker Modal */}
          <DatePicker
            modal
            open={datePickerOpen}
            date={selectedDate}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => {
              setDatePickerOpen(false);
            }}
            fadeToColor={Colors.eerie_black_color} // Match modal background
            confirmText="Confirm"
            cancelText="Cancel"
            title="Select Date"
            theme="dark" // Use dark theme for the date picker
            // To ensure the date picker is usable, you might need to adjust min/max dates
            // minimumDate={new Date(2000, 0, 1)} // Example: Jan 1, 2000
            // maximumDate={new Date(2050, 11, 31)} // Example: Dec 31, 2050
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditPaymentModal;