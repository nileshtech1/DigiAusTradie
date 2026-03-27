import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { pick, types } from '@react-native-documents/picker';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../../ReusableComponent/Header';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import CustomTextInput from '../../../ReusableComponent/CustomTextInput';
import BottomSheetModal from '../../../ReusableComponent/BottomSheetModal';
import ValidationErrorModal from '../../../ReusableComponent/ValidationErrorModal';
import ExpenseStyle from '../../../utils/Stylesheet/ExpenseStyle'; 
import Colors from '../../../Assets/Style/Color';
import {expense_image, invoice_pdf_path} from '../../../Redux/NWConfig';
import {UpdateExpenseApi} from '../../../Redux/API/UpdateExpenseApi';
import ConfirmationAlert from '../../../ReusableComponent/ConfirmationAlert';
import {GetExpenseListApi} from '../../../Redux/API/GetExpenseListApi';

const successAnimation = require('../../../Assets/Images/LottieAnimation/loginsuccessful.json');

const EditExpense = ({route, navigation}) => {
  const {expense} = route.params || {};
  const dispatch = useDispatch();

  const {CustomerList} = useSelector(state => state.CustomerList);
  const {ItemsList} = useSelector(state => state.ItemsJob);
  const {UpdateExpenseLoading} = useSelector(state => state.UpdateExpense) || {};

  const [paidTo, setPaidTo] = useState('');
  const [contactId, setContactId] = useState(null);
  const [datePaid, setDatePaid] = useState(null);
  const [typeOfExpense, setTypeOfExpense] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [gst, setGst] = useState(false);
  const [noVendor, setNoVendor] = useState(false);
  const [image, setImage] = useState(null);
  const [invoicePdf, setInvoicePdf] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [expenseDropdownVisible, setExpenseDropdownVisible] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [isSwmsModalVisible, setSwmsModalVisible] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [currentErrors, setCurrentErrors] = useState([]);
  const {LoginData} = useSelector(state => state.Login);

  useEffect(() => {
    if (expense) {
      setNoVendor(expense.paid_to === null);
      setPaidTo(expense.paid_to || '');
      setContactId(expense.contact_id || null);
      setDatePaid(expense.date_paid || null);
      setTypeOfExpense(expense.type_of_expense || '');
      setDescription(expense.description || '');
      setCost(expense.cost || '');
      setGst(expense.GST === 'true' || expense.GST === true);
    }
  }, [expense]);

  const handleSelectSupplier = selectedSupplier => {
    Keyboard.dismiss();
    setContactId(selectedSupplier?.ContactId);
    setPaidTo(`${selectedSupplier?.first_name} ${selectedSupplier?.last_name}`);
    setDropdownVisible(false);
  };

  const handleSelectExpenseType = selectedType => {
    Keyboard.dismiss();
    setTypeOfExpense(selectedType?.Name);
    setExpenseDropdownVisible(false);
  };

  const handleTakePhoto = () => {
    setSwmsModalVisible(false);
    launchCamera({}, response => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  const handlePickImage = () => {
    setSwmsModalVisible(false);
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleOK = () => {
    setModalVisible(false);
    // navigation.navigate('Dashboard')
  };

  const handleUploadInvoice = async () => {
    try {
      const res = await pick({
        types: [types.allFiles],
      });
  
      setInvoicePdf(res);
  
      console.log('Selected Invoice:', res);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('User cancelled document picker');
      } else {
        console.error('Error picking document', err);
      }
    }
  };

  const validateAndSubmit = () => {
    const id = LoginData?.user?.id;
    const token = LoginData.token;
    const franchiseid = {
      franchise_id: id,
    };
    const errors = [];
    if (!paidTo && !noVendor) errors.push('Paid To is required');
    if (!datePaid) errors.push('Date Paid is required');
    if (!typeOfExpense) errors.push('Type of Expense is required');
    if (!cost) errors.push('Cost is required');

    if (errors.length > 0) {
      setCurrentErrors(errors);
      setShowValidationModal(true);
      return;
    }

    const formData = new FormData();
    formData.append('id', expense.id);
    formData.append('franchise_id', id);
    formData.append('contact_id', contactId);
    formData.append('cost', cost);
    formData.append('date_paid', datePaid);
    formData.append('description', description);
    formData.append('GST', gst);
    formData.append('paid_to', paidTo);
    formData.append('type_of_expense', typeOfExpense);
    formData.append('no_vendor', noVendor);

    if (invoicePdf) {
      formData.append('invoice_pdf', {
        uri: invoicePdf.uri,
        type: invoicePdf.type,
        name: invoicePdf.name,
      });
    }

    if (image) {
      formData.append('expense_image', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    }

    dispatch(UpdateExpenseApi(formData)).then(data => {
      if (data.payload.status === true) {
        dispatch(GetExpenseListApi({token, franchiseid}));
        setModalVisible(true);
        navigation.navigate('ExpenseList');
      }
    });
  };

  if (!expense) {
    return (
      <View style={ExpenseStyle.container}>
        <Header backButton={true} title="Error" />
        <Text style={{color: 'red', textAlign: 'center', marginTop: 20}}>
          Expense data could not be loaded.
        </Text>
      </View>
    );
  }

  return (
    <View style={ExpenseStyle.container}>
      <Header title="Edit Expense" backButton={true} />
      <ScrollView
        style={ExpenseStyle.contentContainer}
        keyboardShouldPersistTaps="always">
        <Pressable
          style={{marginTop: 10}}
          onPress={() => {
            setDropdownVisible(false);
            setExpenseDropdownVisible(false);
          }}>
          <View style={ExpenseStyle.rowWrapper}>
          <View style={ExpenseStyle.row}>
            <View style={ExpenseStyle.dropdownWrapper}>
              <Text style={ExpenseStyle.label}>Supplier</Text>
              <TouchableOpacity
                style={ExpenseStyle.inputWithIcon}
                onPress={() => !noVendor && setDropdownVisible(true)}
                activeOpacity={noVendor ? 1 : 0.7}>
                <VectorIcon
                  icon="FontAwesome"
                  name="user"
                  style={ExpenseStyle.iconMargin}
                  size={20}
                  color={Colors.blue_theme_Color}
                />
                <TextInput
                  placeholder="Enter name"
                  value={paidTo}
                  editable={!noVendor}
                  onChangeText={setPaidTo}
                  onFocus={() => !noVendor && setDropdownVisible(true)}
                  style={{
                    flex: 1,
                    marginLeft: 5,
                    color: noVendor
                      ? Colors.gray_text_color
                      : Colors.white_text_color,
                  }}
                />
                
              </TouchableOpacity>
              {dropdownVisible && (
                <ScrollView
                  style={ExpenseStyle.dropdown}
                  nestedScrollEnabled={true}>
                  {CustomerList?.franchise_customer
                    ?.filter(
                      opt =>
                        opt?.contact_category?.includes('supplier') &&
                        `${opt.first_name} ${opt.last_name}`
                          .toLowerCase()
                          .includes(paidTo.toLowerCase()),
                    )
                    .map((item, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => handleSelectSupplier(item)}
                        style={ExpenseStyle.dropdownItem}>
                        <Text style={ExpenseStyle.dropdownText}>
                          {item.first_name} {item.last_name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              )}
            </View>

            {/* Date Paid */}
            <View>
              <Text style={ExpenseStyle.label}>Date Paid</Text>
              <TouchableOpacity
                onPress={() => setCalendarVisible(true)}
                style={ExpenseStyle.inputWithIcon}>
                <Text style={{color: Colors.white_text_color}}>
                  {datePaid || 'Select date'}
                </Text>
              </TouchableOpacity>
            </View>
            </View>

            {/* No Vendor Checkbox */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Checkbox
                status={noVendor ? 'checked' : 'unchecked'}
                onPress={() => setNoVendor(!noVendor)}
              />
              <Text style={{color: Colors.white_text_color, marginLeft: 5}}>
                No Vendor
              </Text>
            </View>

            {/* Type of Expense Dropdown */}
            <View style={ExpenseStyle.dropdownWrapper}>
              <Text style={ExpenseStyle.label}>Type of Expense</Text>
              <TouchableOpacity
                style={ExpenseStyle.inputWithIcon}
                onPress={() => setExpenseDropdownVisible(true)}>
                <VectorIcon
                  icon="FontAwesome"
                  name="money"
                  size={20}
                  color={Colors.blue_theme_Color}
                  style={ExpenseStyle.iconMargin}
                />
                <TextInput
                  placeholder="Expense type"
                  value={typeOfExpense}
                  onChangeText={setTypeOfExpense}
                  onFocus={() => setExpenseDropdownVisible(true)}
                  style={{
                    flex: 1,
                    marginLeft: 5,
                    color: Colors.white_text_color,
                  }}
                />
              </TouchableOpacity>
              {expenseDropdownVisible && (
                <ScrollView
                  style={ExpenseStyle.dropdown}
                  nestedScrollEnabled={true}>
                  {ItemsList?.Items?.filter(
                    opt =>
                      opt?.Code?.toLowerCase().includes('exp') &&
                      opt?.Name?.toLowerCase().includes(
                        typeOfExpense.toLowerCase(),
                      ),
                  ).map((item, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => handleSelectExpenseType(item)}
                      style={ExpenseStyle.dropdownItem}>
                      <Text style={ExpenseStyle.dropdownText}>{item.Name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Description */}
            <CustomTextInput
              label="Description"
              value={description}
              onChangeText={setDescription}
            />

            {/* Cost and GST */}
            <View style={ExpenseStyle.row}>
              <CustomTextInput
                label="Cost"
                value={cost}
                onChangeText={setCost}
                keyboardType="numeric"
                required={true}
              />
              <View style={{marginLeft: 5}}>
                <Text style={ExpenseStyle.label}>GST</Text>
                <View style={ExpenseStyle.inputWithIcon}>
                  <Checkbox
                    status={gst ? 'checked' : 'unchecked'}
                    onPress={() => setGst(!gst)}
                  />
                </View>
              </View>
            </View>

            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <TouchableOpacity
                style={[ExpenseStyle.selectFileButton, {padding: 10}]}
                onPress={() => setSwmsModalVisible(true)}>
                <VectorIcon
                  icon="FontAwesome"
                  name="camera"
                  size={20}
                  color="#fff"
                  style={{marginRight: 10}}
                />
                <Text style={ExpenseStyle.buttonText}>
                  {expense.expense_image || image
                    ? 'Change Image'
                    : 'Upload Image'}
                </Text>
              </TouchableOpacity>

              <View style={ExpenseStyle.imagePickerBox}>
                {image ? (
                  <Image source={{uri: image.uri}} style={ExpenseStyle.image} />
                ) : expense.expense_image ? (
                  <Image
                    source={{uri: expense_image + expense.expense_image}}
                    style={ExpenseStyle.image}
                  />
                ) : (
                  <VectorIcon
                    icon="FontAwesome"
                    name="image"
                    size={40}
                    color={Colors.gray_text_color}
                  />
                )}
              </View>
            </View>
            <View style={ExpenseStyle.Buttoncontainer}>
              <TouchableOpacity
                style={ExpenseStyle.selectFileButton}
                onPress={handleUploadInvoice}>
                <VectorIcon
                  icon="Entypo"
                  name="folder"
                  size={20}
                  color="#fff"
                />
                <Text style={ExpenseStyle.buttonText}> Upload New Invoice</Text>
              </TouchableOpacity>
              <Text style={ExpenseStyle.selectedFile} numberOfLines={1}>
                {invoicePdf?.name ||
                  expense.invoice_pdf ||
                  'No document selected'}
              </Text>
            </View>

            <TouchableOpacity
              style={[ExpenseStyle.button, {marginBottom: 40}]}
              onPress={validateAndSubmit}>
              <Text style={ExpenseStyle.buttonText}>Update Expense</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </ScrollView>

      {isCalendarVisible && (
        <View style={ExpenseStyle.calendarModal}>
          <Calendar
            onDayPress={day => {
              setDatePaid(day.dateString);
              setCalendarVisible(false);
            }}
          />
          <TouchableOpacity
            style={ExpenseStyle.closeModalButton}
            onPress={() => setCalendarVisible(false)}>
            <Text style={{color: 'white'}}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
      <BottomSheetModal
        visible={isSwmsModalVisible}
        onClose={() => setSwmsModalVisible(false)}
        onTakePhoto={handleTakePhoto}
        onSelectFromGallery={handlePickImage}
      />
      <ConfirmationAlert
        isVisible={isModalVisible}
        onClose={closeModal}
        onOK={handleOK}
        successAnimation={successAnimation}
        message="Expense Details Updated Successfully!"
      />
      <ValidationErrorModal
        visible={showValidationModal}
        errors={currentErrors}
        onClose={() => setShowValidationModal(false)}
      />
      {UpdateExpenseLoading && (
        <ActivityIndicator
          size="large"
          color={Colors.blue_theme_Color}
          style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        />
      )}
    </View>
  );
};

export default EditExpense;
