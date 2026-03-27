import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
  FlatList,
  Modal,
} from "react-native";
import Header from "../../ReusableComponent/Header";
import VectorIcon from "../../ReusableComponent/VectorIcon";
import DropdownList from "../../ReusableComponent/DropdownList";
import Colors from "../../Assets/Style/Color";
import { useDispatch, useSelector } from "react-redux";
import { AddPaymentApi } from "../../Redux/API/AddPaymentDetailsApi";
import { GetPaymentDetailsApi } from "../../Redux/API/GetPaymentDetailsApi";
import { UpdatePaymentDetailsApi } from "../../Redux/API/UpdatePaymentDetailsAPi";
import { DeletePaymentDetailsApi } from "../../Redux/API/DeletePaymentDetailsApi"; // Correct API for deletion
import PaymentSettingsStyle from "../../utils/Stylesheet/PaymentSettings";


const PaymentSettings = () => {
  const [activeTab, setActiveTab] = useState("addPayment");
  const { LoginData } = useSelector(state => state.Login);
  const { GetPaymentData } = useSelector(state => state.GetPayment);

  const dispatch = useDispatch();

  const [paymentMethodsList, setPaymentMethodsList] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedMethod, setSelectedMethod] = useState("UPI ID");
  const [selectedMethodKey, setSelectedMethodKey] = useState("upi");

  const [upiId, setUpiId] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    bsb: "",
    accountNumber: "",
  });

  const [upiIdError, setUpiIdError] = useState("");
  const [paypalEmailError, setPaypalEmailError] = useState("");
  const [bankDetailsErrors, setBankDetailsErrors] = useState({
    accountName: "",
    bsb: "",
    accountNumber: "",
  });
  const [chequeNameError, setChequeNameError] = useState("");
  const [chequeName, setChequeName] = useState("");

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const paymentOptions = [
    { key: "upi", label: "UPI ID", iconLib: "MaterialCommunityIcons", iconName: "bank-transfer" },
    { key: "paypal", label: "PayPal", iconLib: "Fontisto", iconName: "paypal" },
    { key: "bank", label: "Bank Transfer", iconLib: "MaterialCommunityIcons", iconName: "bank" },
    { key : "cheque", label: "Cheque", iconLib: "MaterialIcons", iconName: "payments" },
  ];

  const paymentMethodLabels = paymentOptions.map(option => option.label);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    if (GetPaymentData?.status === true) {
     setPaymentMethodsList(GetPaymentData?.payment_details);
    }
  }, [GetPaymentData]);

  useEffect(() => {
    if (activeTab === 'managePayments') {
      fetchPaymentMethods();
    }
  }, [activeTab]);

  const fetchPaymentMethods = async () => {
    setLoadingPayments(true);
    const id = LoginData?.user?.id;
    const token = LoginData?.token;
    try {
     await dispatch(GetPaymentDetailsApi({ token, id }));
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      Alert.alert("Error", "An unexpected error occurred while fetching payment methods.");
    } finally {
      setLoadingPayments(false);
    }
  };

  const confirmDeletePayment = async (paymentId) => {
    console.log("paymentId in confirmDeletePayment:", paymentId);

    if (paymentId) {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this payment method?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: () => handleDeletePayment(paymentId),
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      const response = await dispatch(DeletePaymentDetailsApi(paymentId));
      if (response?.payload?.status) {
        fetchPaymentMethods();
        Alert.alert("Success", "Payment method deleted successfully.");
      } else {
        Alert.alert("Error", response?.payload?.message || "Failed to delete payment method.");
      }
    } catch (error) {
      console.error("Error deleting payment method:", error);
      Alert.alert("Error", "An unexpected error occurred while deleting the payment method.");
    }
  };

  const handleEditPress = (payment) => {
    setEditingPayment(payment);
    setIsEditModalVisible(true);
    if (payment.payment_method === 'upi') {
      setUpiId(payment.upi_id);
      setPaypalEmail("");
      setBankDetails({ accountName: "", bsb: "", accountNumber: "" });
      setChequeName("");
    } else if (payment.payment_method === 'paypal') {
      setPaypalEmail(payment.email);
      setUpiId("");
      setBankDetails({ accountName: "", bsb: "", accountNumber: "" });
      setChequeName("");
    } else if (payment.payment_method === 'bank') {
      setBankDetails({
        accountName: payment.account_name,
        bsb: payment.bsb,
        accountNumber: payment.account_number,
      });
      setChequeName("");
      setUpiId("");
      setPaypalEmail("");
    } else if (payment.payment_method === 'cheque') {
      setChequeName(payment.cheque_name);
      setUpiId("");
      setPaypalEmail("");
      setBankDetails({ accountName: "", bsb: "", accountNumber: "" });
    }
    setUpiIdError("");
    setPaypalEmailError("");
    setBankDetailsErrors({ accountName: "", bsb: "", accountNumber: "" });
    setChequeName("");
  };


  const togglePaymentMethodStatus = async (item) => {

    if (!item || !item.id) {
      Alert.alert("Error", "Invalid payment item for toggling status.");
      return;
    }

    const currentMethodKey = item.payment_method;
    const newStatus = item.status === "activate" ? "deactivate" : "activate";
    const currentFranchiseId = LoginData?.user?.id;

    const postData = {
      franchise_id: currentFranchiseId,
      status: newStatus,
      payment_method: currentMethodKey,
      ...(currentMethodKey === "upi" && { upi_id: item.upi_id }),
      ...(currentMethodKey === "paypal" && { email: item.email }),
      ...(currentMethodKey === "bank" && {
        account_name: item.account_name,
        bsb: item.bsb,
        account_number: item.account_number,
      }),
      ...(currentMethodKey === "cheque" && { cheque_name: item.cheque_name }), 
    };

    try {
      const response = await dispatch(
        UpdatePaymentDetailsApi({ postData, id: item.id })
      );

      if (response?.payload?.status === true) {
        Alert.alert("Success", `Payment method ${newStatus}d successfully!`);
        // Optimistically update the UI or refetch
        fetchPaymentMethods();
      } else {
        Alert.alert("Error", response?.payload?.message || "Failed to update status.");
      }

    } catch (error) {
      console.error("Payment status update error:", error);
      Alert.alert("Error", "An unexpected error occurred during payment status update.");
    }
  };


  const handleDropdownSelect = (itemLabel) => {
    setSelectedMethod(itemLabel);
    const selectedOption = paymentOptions.find(option => option.label === itemLabel);
    setSelectedMethodKey(selectedOption ? selectedOption.key : "");
    setIsDropdownVisible(false);
    setSearchQuery("");
    resetFormFields();
  };

  const resetFormFields = () => {
    setUpiId("");
    setPaypalEmail("");
    setBankDetails({
      accountName: "",
      bsb: "",
      accountNumber: "",
    });
    setChequeName(""); // Add this
    setUpiIdError("");
    setPaypalEmailError("");
    setBankDetailsErrors({ accountName: "", bsb: "", accountNumber: "" });
    setChequeNameError(""); // Add this
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidBsb = (bsb) => /^\d{6}$/.test(bsb);
  const isValidAccountNumber = (acc) => /^\d{6,9}$/.test(acc);
  const isValidUpiId = (upi) => /^[\w.-]+@[\w.-]+$/.test(upi);

  const validatePaymentFields = (methodKey) => { // Removed isEditing as it wasn't used
    setUpiIdError("");
    setPaypalEmailError("");
    setBankDetailsErrors({ accountName: "", bsb: "", accountNumber: "" });
    let hasError = false;

    switch (methodKey) {
      case "upi":
        if (!upiId || !isValidUpiId(upiId)) {
          setUpiIdError("Please enter a valid UPI ID (e.g., user@bank).");
          hasError = true;
        }
        break;
      case "paypal":
        if (!paypalEmail || !isValidEmail(paypalEmail)) {
          setPaypalEmailError("Please enter a valid PayPal email address.");
          hasError = true;
        }
        break;
      case "bank":
        if (!bankDetails.accountName) {
          setBankDetailsErrors(prev => ({ ...prev, accountName: "Please enter account name." }));
          hasError = true;
        }
        if (!isValidBsb(bankDetails.bsb)) {
          setBankDetailsErrors(prev => ({ ...prev, bsb: "Please enter a valid 6-digit BSB number." }));
          hasError = true;
        }
        if (!isValidAccountNumber(bankDetails.accountNumber)) {
          setBankDetailsErrors(prev => ({ ...prev, accountNumber: "Please enter a valid account number (6-9 digits)." }));
          hasError = true;
        }
        break;
        case "cheque":
        if (!chequeName) {
          setChequeNameError("Please enter cheque name.");
          hasError = true;
        }
        break;
      default:
        Alert.alert("Validation", "Please select a valid payment method with details.");
        hasError = true;
    }
    return !hasError;
  };

  const handleAddPayment = async () => {
    const currentMethodKey = selectedMethodKey;
    if (!validatePaymentFields(currentMethodKey)) return;

    const currentFranchiseId = LoginData?.user?.id;
    const postData = {
      franchise_id: currentFranchiseId,
      payment_method: currentMethodKey,
      status: "activate", // Default status for new additions
      ...(currentMethodKey === "upi" && { upi_id: upiId }),
      ...(currentMethodKey === "paypal" && { email: paypalEmail }),
      ...(currentMethodKey === "bank" && {
        account_name: bankDetails.accountName,
        bsb: bankDetails.bsb,
        account_number: bankDetails.accountNumber,
      }),
      ...(currentMethodKey === "cheque" && { cheque_name: chequeName }),
    };

    try {
      const response = await dispatch(AddPaymentApi(postData));
      if (response?.payload?.status === true) {
        Alert.alert("Success", "Payment details added successfully!");
        resetFormFields();
        fetchPaymentMethods();
      } else {
        Alert.alert("Error", response?.payload?.message || "Failed to add details.");
      }
    } catch (error) {
      console.error("Payment submission error:", error);
      Alert.alert("Error", "An unexpected error occurred during payment submission.");
    }
  };

  const handleUpdatePayment = async () => {
    if (!editingPayment) return;

    const currentMethodKey = editingPayment.payment_method;
    if (!validatePaymentFields(currentMethodKey)) return; // Removed isEditing here too

    const currentFranchiseId = LoginData?.user?.id;
    const postData = {
      franchise_id: currentFranchiseId,
      status: editingPayment.status, // Preserve the existing status during edit
      payment_method: currentMethodKey,
      ...(currentMethodKey === "upi" && { upi_id: upiId }),
      ...(currentMethodKey === "paypal" && { email: paypalEmail }),
      ...(currentMethodKey === "bank" && {
        account_name: bankDetails.accountName,
        bsb: bankDetails.bsb,
        account_number: bankDetails.accountNumber,
      }),
      ...(currentMethodKey === "cheque" && { cheque_name: chequeName }), 
    };

    try {
      const response = await dispatch(UpdatePaymentDetailsApi({ postData, id: editingPayment.id }));
      if (response?.payload?.status === true) {
        Alert.alert("Success", "Payment details updated successfully!");
        resetFormFields();
        setIsEditModalVisible(false);
        setEditingPayment(null);
        fetchPaymentMethods();
      } else {
        Alert.alert("Error", response?.payload?.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Payment update error:", error);
      Alert.alert("Error", "An unexpected error occurred during payment update.");
    }
  };

  const renderPaymentFields = (isEditing = false) => {
    const methodKey = isEditing ? editingPayment?.payment_method : selectedMethodKey;

    switch (methodKey) {
      case "upi":
        return (
          <View style={PaymentSettingsStyle.formSection}>
            <TextInput
              placeholder="UPI ID (e.g., user@bank)"
              style={[PaymentSettingsStyle.input, upiIdError && PaymentSettingsStyle.inputError]}
              placeholderTextColor="#ccc"
              value={upiId}
              onChangeText={(text) => {
                setUpiId(text);
                if (upiIdError) setUpiIdError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {upiIdError ? <Text style={PaymentSettingsStyle.errorText}>{upiIdError}</Text> : null}
          </View>
        );
      case "paypal":
        return (
          <View style={PaymentSettingsStyle.formSection}>
            <TextInput
              placeholder="PayPal Email"
              style={[PaymentSettingsStyle.input, paypalEmailError && PaymentSettingsStyle.inputError]}
              placeholderTextColor="#ccc"
              value={paypalEmail}
              onChangeText={(text) => {
                setPaypalEmail(text);
                if (paypalEmailError) setPaypalEmailError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {paypalEmailError ? <Text style={PaymentSettingsStyle.errorText}>{paypalEmailError}</Text> : null}
          </View>
        );
      case "bank":
        return (
          <View style={PaymentSettingsStyle.formSection}>
            <TextInput
              placeholder="Account Name"
              style={[PaymentSettingsStyle.input, bankDetailsErrors.accountName && PaymentSettingsStyle.inputError]}
              placeholderTextColor="#ccc"
              value={bankDetails.accountName}
              onChangeText={(text) => {
                setBankDetails({ ...bankDetails, accountName: text });
                if (bankDetailsErrors.accountName) setBankDetailsErrors(prev => ({ ...prev, accountName: "" }));
              }}
            />
            {bankDetailsErrors.accountName ? <Text style={PaymentSettingsStyle.errorText}>{bankDetailsErrors.accountName}</Text> : null}

            <TextInput
              placeholder="BSB (e.g., 063123)"
              style={[PaymentSettingsStyle.input, bankDetailsErrors.bsb && PaymentSettingsStyle.inputError]}
              placeholderTextColor="#ccc"
              value={bankDetails.bsb}
              onChangeText={(text) => {
                const formattedText = text.replace(/[^0-9]/g, '');
                setBankDetails({ ...bankDetails, bsb: formattedText });
                if (bankDetailsErrors.bsb) setBankDetailsErrors(prev => ({ ...prev, bsb: "" }));
              }}
              keyboardType="numeric"
              maxLength={6}
            />
            {bankDetailsErrors.bsb ? <Text style={PaymentSettingsStyle.errorText}>{bankDetailsErrors.bsb}</Text> : null}

            <TextInput
              placeholder="Account Number"
              style={[PaymentSettingsStyle.input, bankDetailsErrors.accountNumber && PaymentSettingsStyle.inputError]}
              placeholderTextColor="#ccc"
              value={bankDetails.accountNumber}
              onChangeText={(text) => {
                const formattedText = text.replace(/[^0-9]/g, '');
                setBankDetails({ ...bankDetails, accountNumber: formattedText });
                if (bankDetailsErrors.accountNumber) setBankDetailsErrors(prev => ({ ...prev, accountNumber: "" }));
              }}
              keyboardType="numeric"
              maxLength={9}
            />
            {bankDetailsErrors.accountNumber ? <Text style={PaymentSettingsStyle.errorText}>{bankDetailsErrors.accountNumber}</Text> : null}
          </View>
        );
        case "cheque" : 
        return (
          <View style={PaymentSettingsStyle.formSection}>
            <TextInput
              placeholder="Enter Name"
              style={[PaymentSettingsStyle.input, chequeNameError && PaymentSettingsStyle.inputError]}
              placeholderTextColor="#ccc"
              value={chequeName}
              onChangeText={(text) => {
                setChequeName(text);
                if (chequeNameError) setChequeNameError("");
              }}
              keyboardType="numeric"
            />
            {chequeNameError ? <Text style={PaymentSettingsStyle.errorText}>{chequeNameError}</Text> : null}
          </View>
        )
      default:
        return null;
    }
  };

  const renderAddPaymentForm = () => {
    return (
      <View style={PaymentSettingsStyle.formContainer}>
        <Text style={PaymentSettingsStyle.subHeading}>Select Payment Method</Text>

        <TouchableOpacity
          style={PaymentSettingsStyle.dropdownTrigger}
          onPress={() => setIsDropdownVisible(true)}
        >
          <Text style={PaymentSettingsStyle.dropdownTriggerText}>{selectedMethod || "Select a method..."}</Text>
          <VectorIcon icon="FontAwesome" name="angle-down" color="#FFFFFF" size={20} />
        </TouchableOpacity>

        <DropdownList
          isVisible={isDropdownVisible}
          toggleDropdown={() => setIsDropdownVisible(false)}
          data={paymentMethodLabels}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelect={handleDropdownSelect}
        />

        {renderPaymentFields(false)}

        {["upi", "paypal", "bank", "cheque"].includes(selectedMethodKey) && (
          <TouchableOpacity style={PaymentSettingsStyle.submitButton} onPress={handleAddPayment}>
            <Text style={PaymentSettingsStyle.submitButtonText}>Save Details</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderManagePaymentsList = () => {
    const getPaymentDisplayValue = (item) => {
      switch (item.payment_method) {
        case 'upi':
          return <Text style={PaymentSettingsStyle.paymentMethodDetails}>{item.upi_id}</Text>;
        case 'paypal':
          return <Text style={PaymentSettingsStyle.paymentMethodDetails}>{item.email}</Text>;
        case 'bank':
          return (
            <View>
              <Text style={PaymentSettingsStyle.paymentMethodDetails}>Account Name: {item.account_name}</Text>
              <Text style={PaymentSettingsStyle.paymentMethodDetails}>BSB: {item.bsb}</Text>
              <Text style={PaymentSettingsStyle.paymentMethodDetails}>Account Number: {item.account_number}</Text>
            </View>
          );
        case 'cheque': // Add this case
          return <Text style={PaymentSettingsStyle.paymentMethodDetails}>Cheque Name: {item.cheque_name}</Text>;
        default:
          return <Text style={PaymentSettingsStyle.paymentMethodDetails}>Details: N/A</Text>;
      }
    };

    const getPaymentIcon = (methodKey) => {
      const option = paymentOptions.find(opt => opt.key === methodKey);
      return option ? { lib: option.iconLib, name: option.iconName } : null;
    };

    if (loadingPayments) {
      return <Text style={PaymentSettingsStyle.infoText}>Loading payment methods...</Text>;
    }

    if (paymentMethodsList.length === 0) {
      return <Text style={PaymentSettingsStyle.infoText}>No payment methods added yet. Add one in the "Add Payment Details" tab.</Text>;
    }

    return (
      <View style={PaymentSettingsStyle.formContainer}>
        <Text style={PaymentSettingsStyle.subHeading}>Your Saved Payment Methods</Text>
        <FlatList
          data={paymentMethodsList}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const icon = getPaymentIcon(item.payment_method);
            const isActivated = item.status === 'activate';
            return (
              <View style={PaymentSettingsStyle.paymentItem}>
                <View style={PaymentSettingsStyle.paymentItemLeft}>
                  {icon && (
                    <VectorIcon
                      icon={icon.lib}
                      name={icon.name}
                      size={24}
                      color={Colors.blue_theme_Color}
                      style={{ marginRight: 15 }}
                    />
                  )}
                  <View>
                    <Text style={PaymentSettingsStyle.paymentMethodTitle}>
                      {paymentOptions.find(opt => opt.key === item.payment_method)?.label || item.payment_method}
                    </Text>

                    <Text style={PaymentSettingsStyle.paymentMethodDetails}>
                      {getPaymentDisplayValue(item)}
                    </Text>
                    <Text style={[PaymentSettingsStyle.paymentStatus, { color: isActivated ? Colors.green_color : Colors.red_color }]}>
                      Status: {item.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={PaymentSettingsStyle.paymentItemActions}>
                  <TouchableOpacity onPress={() => handleEditPress(item)} style={PaymentSettingsStyle.actionButton}>
                    <VectorIcon icon="Feather" name="edit" size={20} color={Colors.blue_theme_Color} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => confirmDeletePayment(item.id)} style={PaymentSettingsStyle.actionButton}>
                    <VectorIcon icon="MaterialCommunityIcons" name="delete" size={22} color={Colors.pink_theme_color} />
                  </TouchableOpacity>

                  <Switch
                    value={isActivated}
                    onValueChange={() => togglePaymentMethodStatus(item)}
                    trackColor={{ false: "#767577", true: Colors.blue_theme_Color }}
                    thumbColor={isActivated ? "#FFFFFF" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                  />
                </View>
              </View>
            );
          }}
          ListFooterComponent={<View style={{ height: 20 }} />}
        />
      </View>
    );
  };

  const renderEditPaymentModal = () => {
    if (!editingPayment) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={PaymentSettingsStyle.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View style={PaymentSettingsStyle.modalContent}>
            <Text style={PaymentSettingsStyle.modalTitle}>Edit {paymentOptions.find(opt => opt.key === editingPayment.payment_method)?.label}</Text>

            {renderPaymentFields(true)}

            <View style={PaymentSettingsStyle.modalButtonContainer}>
              <TouchableOpacity style={[PaymentSettingsStyle.modalButton, PaymentSettingsStyle.cancelButton]} onPress={() => {
                setIsEditModalVisible(false);
                resetFormFields();
                setEditingPayment(null);
              }}>
                <Text style={PaymentSettingsStyle.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[PaymentSettingsStyle.modalButton, PaymentSettingsStyle.saveButton]} onPress={handleUpdatePayment}>
                <Text style={PaymentSettingsStyle.modalButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 20;

  return (
    <View style={PaymentSettingsStyle.container}>
      <Header backButton={true} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView
          contentContainerStyle={PaymentSettingsStyle.scrollContentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={PaymentSettingsStyle.heading}>Payment Settings</Text>

          <View style={PaymentSettingsStyle.tabContainer}>
            <TouchableOpacity
              style={[PaymentSettingsStyle.tab, activeTab === "addPayment" && PaymentSettingsStyle.activeTab]}
              onPress={() => setActiveTab("addPayment")}
            >
              <Text style={PaymentSettingsStyle.tabText}>Add Payment Methods</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[PaymentSettingsStyle.tab, activeTab === "managePayments" && PaymentSettingsStyle.activeTab]}
              onPress={() => setActiveTab("managePayments")}
            >
              <Text style={PaymentSettingsStyle.tabText}>Manage Payment Methods</Text>
            </TouchableOpacity>
          </View>

          {activeTab === "addPayment" ? renderAddPaymentForm() :
            activeTab === "managePayments" ? renderManagePaymentsList() :
              null}
        </ScrollView>
      </KeyboardAvoidingView>

      {renderEditPaymentModal()}
    </View>
  );
};

export default PaymentSettings;