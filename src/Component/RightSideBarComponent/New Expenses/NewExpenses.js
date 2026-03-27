import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  Modal,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Checkbox} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Header from '../../../ReusableComponent/Header';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Colors from '../../../Assets/Style/Color';
import CustomTextInput from '../../../ReusableComponent/CustomTextInput';
import BottomSheetModal from '../../../ReusableComponent/BottomSheetModal';
import ConfirmationAlert from '../../../ReusableComponent/ConfirmationAlert';
import {Calendar} from 'react-native-calendars';
import ExpenseStyle from '../../../utils/Stylesheet/ExpenseStyle';
import {useDispatch, useSelector} from 'react-redux';
import {CreateExpenseApi} from '../../../Redux/API/CreateExpenseApi';
import ValidationErrorModal from '../../../ReusableComponent/ValidationErrorModal';
import { pick, types } from '@react-native-documents/picker';
import {GetExpenseListApi} from '../../../Redux/API/GetExpenseListApi';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const successAnimation = require('../../../Assets/Images/LottieAnimation/loginsuccessful.json');

const NewExpenses = ({navigation}) => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSwmsModalVisible, setSwmsModalVisible] = useState(false);
  const [contactId, setContactId] = useState('');
  const [paidToList, setPaidToList] = useState([]);
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState(null);
  const [expenseDropdownVisibleIndex, setExpenseDropdownVisibleIndex] =
    useState(null);
  const dispatch = useDispatch();
  const {ExpenseLoading} = useSelector(state => state.CreateExpense);
  const {CustomerList} = useSelector(state => state.CustomerList);
  const {LoginData} = useSelector(state => state.Login);
  const {AccountList} = useSelector(state => state.AccountCode);
  const [expenseOptions, setExpenseOptions] = useState([]);
  const [selectedItemCode, setSelecteditemCode] = useState('');
  const [itemCodeOptions, setItemCodeOptions] = useState([]);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentErrors, setCurrentErrors] = useState([]);
  const {ItemsList} = useSelector(state => state.ItemsJob);
  const [rows, setRows] = useState([
    {
      paidTo: '',
      datePaid: null,
      typeOfExpense: '',
      description: '',
      cost: '',
      gst: false,
      gst_amount: '',
      image: null,
      taxType: '',
      invoice_pdf: null,
      no_vendor: false,
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSubmitIndex, setActiveSubmitIndex] = useState([]);
  const [successIndex, setSuccessIndex] = useState([]);

  useEffect(() => {
    const fetchAccountList = async () => {
      if (AccountList && AccountList?.Accounts.length > 0) {
        setExpenseOptions(AccountList?.Accounts);
      }
    };
    fetchAccountList();
  }, [AccountList]);

  useEffect(() => {
    const fetchItemCodesList = async () => {
      if (ItemsList?.Items) {
        setItemCodeOptions(ItemsList?.Items);
      }
    };
    fetchItemCodesList();
  }, [ItemsList]);

  useEffect(() => {
    const fetchCustomerList = async () => {
      if (CustomerList && CustomerList?.franchise_customer.length > 0) {
        setPaidToList(CustomerList?.franchise_customer);
      }
    };
    fetchCustomerList();
  }, [CustomerList]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        paidTo: '',
        datePaid: new Date(),
        typeOfExpense: '',
        description: '',
        cost: '',
        gst: false,
        gst_amount: '',
        image: null,
        invoice_pdf: null,
        no_vendor: false,
      },
    ]);
  };

  const resetAllFields = () => {
    setRows([
      {
        paidTo: '',
        datePaid: null,
        typeOfExpense: '',
        description: '',
        cost: '',
        gst: false,
        gst_amount: '',
        image: null,
        invoice_pdf: null,
        no_vendor: false,
      },
    ]);
    setContactId('');
    setSelecteditemCode('');
    setActiveSubmitIndex([]);
  };

  const handleUploadNew = async (rowIndex) => {
    try {
      const res = await pick({
        types: [types.allFiles], // or types.pdf
      });
  
      // Check if res is an array
      const file = Array.isArray(res) ? res[0] : res;
  
      setRows((prevRows) => {
        const newRows = [...prevRows];
        newRows[rowIndex].invoice_pdf = file; // assign correctly
        return newRows;
      });
  
      console.log('Selected document for row', rowIndex, file);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('User cancelled document picker');
      } else {
        console.error('Error picking document', err);
      }
    }
  };
  
  const toggleDropdown = index => {
    setActiveIndex(index);
    setExpenseDropdownVisibleIndex(null);
    setDropdownVisibleIndex(dropdownVisibleIndex === index ? null : index);
  };
  const toggleDropdown1 = index => {
    setActiveIndex(index);
    setDropdownVisibleIndex(false);
    setExpenseDropdownVisibleIndex(
      expenseDropdownVisibleIndex === index ? null : index,
    );
  };

  const openSwmsModal = index => {
    setActiveIndex(index);
    setSwmsModalVisible(true);
  };

  const handleSwmsTakePhoto = () => {
    setSwmsModalVisible(false);
    launchCamera({}, response => {
      if (
        response.assets &&
        response.assets.length > 0 &&
        activeIndex !== null
      ) {
        const updatedRows = [...rows];
        updatedRows[activeIndex].image = response.assets[0];
        setRows(updatedRows);
      }
    });
  };

  const handleSwmsPickImage = () => {
    setSwmsModalVisible(false);
    launchImageLibrary({}, response => {
      if (
        response.assets &&
        response.assets.length > 0 &&
        activeIndex !== null
      ) {
        const updatedRows = [...rows];
        updatedRows[activeIndex].image = response.assets[0];
        setRows(updatedRows);
      }
    });
  };

  const handleImageRemove = index => {
    const updatedRows = [...rows];
    updatedRows[index].image = null;
    setRows(updatedRows);
  };

  const handleInputChange = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  const handleSelectJob = (index, selectedJob) => {
    Keyboard.dismiss();
    setContactId(selectedJob?.ContactId);
    const updatedRows = [...rows];
    updatedRows[index].paidTo =
      selectedJob?.first_name + ' ' + selectedJob?.last_name;
    setRows(updatedRows);
    setDropdownVisibleIndex(null);
  };
  const handleSelectExpense = (index, selectedJob) => {
    Keyboard.dismiss();
    const updatedRows = [...rows];
    updatedRows[index].typeOfExpense = selectedJob?.Name;
    if (selectedJob.PurchaseDetails) {
      updatedRows[index].taxType = selectedJob?.PurchaseDetails?.TaxType;
    }
    setSelecteditemCode(selectedJob?.Code);
    setRows(updatedRows);
    setExpenseDropdownVisibleIndex(null);
  };

  const validateRow = (row, index) => {
    const errors = [];

    if (!row?.paidTo && !row?.no_vendor)
      errors.push(`Row ${index + 1}: Paid To is required`);
    if (!row?.datePaid) errors.push(`Row ${index + 1}: Date Paid is required`);
    if (!row?.typeOfExpense)
      errors.push(`Row ${index + 1}: Type of Expense is required`);
    if (!row?.cost) errors.push(`Row ${index + 1}: Cost is required`);
    return errors;
  };

  const handleSaveRow = index => {
    const row = rows[index];
    const rowErrors = validateRow(row, index);

    if (rowErrors.length > 0) {
      setErrors(prev => ({...prev, [index]: rowErrors}));
      setCurrentErrors(rowErrors);
      setShowValidationModal(true);
      return;
    } else {
      setModalVisible1(true);
    }
  };

  const clearTypeOfExpense = index => {
    const updatedRows = [...rows];
    updatedRows[index].typeOfExpense = '';
    setRows(updatedRows);
    setExpenseDropdownVisibleIndex(index);
  };

  const clearTypeSupplier = index => {
    const updatedRows = [...rows];
    updatedRows[index].paidTo = '';
    setRows(updatedRows);
    setDropdownVisibleIndex(index);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleOK = () => {
    setModalVisible(false);
    // navigation.navigate('Dashboard')
  };

  const handleDatePaidClick = index => {
    setSelectedRowIndex(index);
    setCalendarVisible(true);
  };
  const handleDateSelect = date => {
    if (selectedRowIndex !== null) {
      const updatedRows = [...rows];
      const selectedDate = new Date(date.timestamp);
      const year = selectedDate.getFullYear();
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      updatedRows[selectedRowIndex].datePaid = formattedDate;
      setRows(updatedRows);
      setCalendarVisible(false);
    }
  };

  const handleCalendarClose = () => {
    setCalendarVisible(false);
  };
  const handleCloseAllDropdown = () => {
    setDropdownVisibleIndex(false);
    setExpenseDropdownVisibleIndex(false);
  };

  const handleAddRow = async index => {
    const token = LoginData.token;
    const franchiseid = {
      franchise_id: id,
    };

    setModalVisible1(false);
    activeSubmitIndex.push(index);
    const formData = new FormData();
    const row = rows[index];
    const id = LoginData?.user?.id;
    formData.append('franchise_id', id);
    formData.append('contact_id', contactId);
    formData.append('cost', row?.cost);
    formData.append('date_paid', row.datePaid);
    formData.append('description', row?.description);
    formData.append('GST', row?.gst);
    if (row?.gst) {
      formData.append('gst_amount', row?.gst_amount);
    }
    formData.append('paid_to', row?.paidTo);
    formData.append('type_of_expense', row?.typeOfExpense);
    formData.append('taxtype', row?.taxType);
    // formData.append('ItemCode', selectedItemCode);
    if (row?.invoice_pdf) {
      const doc = row.invoice_pdf;
      const docFile = {
        uri: doc.uri,
        type: doc.type,
        name: doc.name,
      };
      formData.append('invoice_pdf', docFile);
    }

    if (row?.image) {
      const imageUri = row?.image?.uri;
      const imageFile = {
        uri: imageUri,
        type: row.image.type,
        name: row.image.fileName,
      };
      formData.append('expense_image', imageFile);
    }
console.log('Form Data:', formData);

    dispatch(CreateExpenseApi(formData)).then(data => {
      if (data.payload.status === true) {
        console.log('Expense created successfully');
        
        dispatch(GetExpenseListApi({token, franchiseid}));
        successIndex.push(index);
        setModalVisible(true);
        addRow();
        // setSelecteditemCode('');
      }
    });
  };

  const handleCancel = index => {
    const token = LoginData.token;
    const franchiseid = {
      franchise_id: id,
    };
    setModalVisible1(false);
    activeSubmitIndex.push(index);
    const formData = new FormData();
    const row = rows[index];
    const id = LoginData?.user?.id;
    formData.append('franchise_id', id);
    formData.append('contact_id', contactId);
    formData.append('cost', row?.cost);
    formData.append('date_paid', row.datePaid);
    formData.append('description', row?.description);
    formData.append('GST', row?.gst);
    if (row?.gst) {
      formData.append('gst_amount', row?.gst_amount);
    }
    formData.append('paid_to', row?.paidTo);
    formData.append('type_of_expense', row?.typeOfExpense);
    formData.append('taxtype', row?.taxType);
    // formData.append('ItemCode', selectedItemCode);
    if (row?.invoice_pdf) {
      const doc = row.invoice_pdf;
      const docFile = {
        uri: doc.uri,
        type: doc.type,
        name: doc.name,
      };
      formData.append('invoice_pdf', docFile);
    }

    if (row.image) {
      const imageUri = row?.image?.uri;
      const imageFile = {
        uri: imageUri,
        type: row.image.type,
        name: row.image.fileName,
      };
      formData.append('expense_image', imageFile);
    }
    'formData', formData;
    dispatch(CreateExpenseApi(formData)).then(data => {
      if (data.payload.status === true) {
        dispatch(GetExpenseListApi({token, franchiseid}));
        successIndex.push(index);
        setModalVisible(true);
      }
    });
  };
  return (
    <View style={ExpenseStyle.container}>
        <Header notificationIcon={true} />

        {/* 2. Replace ScrollView with KeyboardAwareScrollView */}
        <KeyboardAwareScrollView
            style={ExpenseStyle.contentContainer}
            contentContainerStyle={{ paddingBottom: 100 }} // Adds space at bottom so Save button isn't edge-to-edge
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            extraHeight={150}       // Adds extra space above keyboard
            extraScrollHeight={150} 
            enableAutomaticScroll={true}
        >
            <View style={ExpenseStyle.headerRow}>
                <Text style={ExpenseStyle.title}>Add New Expense</Text>
                <TouchableOpacity
                    style={ExpenseStyle.resetButton}
                    onPress={resetAllFields}>
                    <Text style={ExpenseStyle.resetButtonText}>Reset</Text>
                </TouchableOpacity>
            </View>

            <Pressable
                style={ExpenseStyle.mainContainer}
                onPress={handleCloseAllDropdown}>

                {rows.map((row, index) => (
                    <View key={index} style={ExpenseStyle.rowWrapper}>
                        {/* No Vendor Checkbox */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 10,
                            }}>
                            <Checkbox
                                status={row.no_vendor ? 'checked' : 'unchecked'}
                                onPress={() =>
                                    handleInputChange(index, 'no_vendor', !row.no_vendor)
                                }
                            />
                            <Text style={{ color: Colors.white_text_color, marginLeft: 5 }}>
                                Own expense (no vendor)
                            </Text>
                        </View>

                        {/* Paid To and Date Paid */}
                        <View style={ExpenseStyle.row}>
                            {
                                !row.no_vendor && <View style={ExpenseStyle.dropdownWrapper}>
                                    <Text style={ExpenseStyle.label}>All Suppliers</Text>
                                    <TouchableOpacity
                                        style={{ ...ExpenseStyle.inputWithIcon, marginRight: 5 }}
                                        onPress={() => !row.no_vendor && toggleDropdown(index)}
                                        activeOpacity={row.no_vendor ? 1 : 0.7}>
                                        <VectorIcon
                                            icon="FontAwesome"
                                            name="user"
                                            style={ExpenseStyle.iconMargin}
                                            size={20}
                                            color={Colors.blue_theme_Color}
                                        />
                                        <TextInput
                                            placeholder="Enter name"
                                            placeholderTextColor={Colors.white_text_color}
                                            value={row.paidTo}
                                            editable={!row.no_vendor}
                                            onChangeText={text =>
                                                handleInputChange(index, 'paidTo', text)
                                            }
                                            onFocus={() => !row.no_vendor && toggleDropdown(index)}
                                            style={{
                                                flex: 1,
                                                marginLeft: 5,
                                                color: row.no_vendor
                                                    ? Colors.gray_text_color
                                                    : Colors.white_text_color,
                                            }}
                                        />
                                        {!row.no_vendor && row?.paidTo && (
                                            <TouchableOpacity
                                                onPress={() => clearTypeSupplier(index)}>
                                                <VectorIcon
                                                    icon="Entypo"
                                                    style={ExpenseStyle.iconMargin}
                                                    name="cross"
                                                    size={20}
                                                    color={Colors.blue_theme_Color}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </TouchableOpacity>

                                    {dropdownVisibleIndex === index && (
                                        <ScrollView
                                            style={ExpenseStyle.dropdown}
                                            keyboardShouldPersistTaps="always"
                                            showsVerticalScrollIndicator={false}
                                            nestedScrollEnabled={true}>
                                            {(() => {
                                                const filteredList = paidToList.filter(
                                                    option =>
                                                        option?.contact_category?.includes('supplier') &&
                                                        (option?.first_name
                                                            ?.toLowerCase()
                                                            .includes(row?.paidTo?.toLowerCase() || '') ||
                                                            option?.last_name
                                                                ?.toLowerCase()
                                                                .includes(row?.paidTo?.toLowerCase() || '')),
                                                );

                                                if (filteredList.length === 0) {
                                                    return (
                                                        <View style={ExpenseStyle.noResultContainer}>
                                                            <Text style={ExpenseStyle.noResultText}>
                                                                No suppliers found
                                                            </Text>
                                                        </View>
                                                    );
                                                }

                                                return filteredList.map((option, optionIndex) => (
                                                    <TouchableOpacity
                                                        key={optionIndex}
                                                        onPress={() => handleSelectJob(index, option)}
                                                        style={ExpenseStyle.dropdownItem}>
                                                        <Text style={ExpenseStyle.dropdownText}>
                                                            {option?.first_name} {option?.last_name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ));
                                            })()}
                                        </ScrollView>
                                    )}
                                </View>
                            }


                            {/* Date Paid */}
                            <View style={ExpenseStyle.dropdownWrapper}>
                                <Text style={ExpenseStyle.label}>Date Paid</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleDatePaidClick(index);
                                        handleCloseAllDropdown();
                                    }}
                                    style={ExpenseStyle.inputWithIcon}>
                                    <Text style={{ color: Colors.white_text_color }}>
                                        <Text style={{ color: Colors.white_text_color }}>
                                            {row?.datePaid
                                                ? new Date(row?.datePaid).toLocaleDateString()
                                                : 'Select date'}
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        {/* Type of Expense */}
                        <View style={ExpenseStyle.dropdownWrapper}>
                            <Text style={ExpenseStyle.label}>Type of Expense</Text>
                            <TouchableOpacity
                                style={{ ...ExpenseStyle.inputWithIcon }}
                                onPress={() => toggleDropdown1(index)}>
                                <VectorIcon
                                    icon="FontAwesome"
                                    style={ExpenseStyle.iconMargin}
                                    name="money"
                                    size={20}
                                    color={Colors.blue_theme_Color}
                                />
                                <TextInput
                                    placeholder="Expense type"
                                    placeholderTextColor={Colors.white_text_color}
                                    value={row.typeOfExpense}
                                    onChangeText={text =>
                                        handleInputChange(index, 'typeOfExpense', text)
                                    }
                                    onFocus={() => toggleDropdown1(index)}
                                    style={{
                                        flex: 1,
                                        marginLeft: 5,
                                        color: Colors.white_text_color,
                                    }}
                                />
                                {row?.typeOfExpense && (
                                    <TouchableOpacity onPress={() => clearTypeOfExpense(index)}>
                                        <VectorIcon
                                            icon="Entypo"
                                            style={ExpenseStyle.iconMargin}
                                            name="cross"
                                            size={20}
                                            color={Colors.blue_theme_Color}
                                        />
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                            {expenseDropdownVisibleIndex === index && (
                                <ScrollView
                                    style={ExpenseStyle.dropdown}
                                    showsVerticalScrollIndicator={false}
                                    keyboardShouldPersistTaps="always"
                                    nestedScrollEnabled={true}>
                                    {(() => {
                                        const filteredOptions = itemCodeOptions.filter(
                                            option =>
                                                option?.Code?.toLowerCase()?.includes('exp') &&
                                                option?.Name?.toLowerCase()?.includes(
                                                    row?.typeOfExpense?.toLowerCase() || '',
                                                ),
                                        );

                                        if (filteredOptions.length === 0) {
                                            return (
                                                <View style={ExpenseStyle.noResultContainer}>
                                                    <Text style={ExpenseStyle.noResultText}>
                                                        No expense types found
                                                    </Text>
                                                </View>
                                            );
                                        }

                                        return filteredOptions.map((option, optionIndex) => (
                                            <TouchableOpacity
                                                key={optionIndex}
                                                onPress={() => handleSelectExpense(index, option)}
                                                style={ExpenseStyle.dropdownItem}>
                                                <Text style={ExpenseStyle.dropdownText}>
                                                    {option?.Name}
                                                </Text>
                                            </TouchableOpacity>
                                        ));
                                    })()}
                                </ScrollView>
                            )}
                        </View>

                        {/* Description */}
                        <CustomTextInput
                            label="Description"
                            placeholder="Enter details"
                            icon="text-box"
                            value={row.description}
                            onChangeText={text =>
                                handleInputChange(index, 'description', text)
                            }
                            onFocus={() => handleCloseAllDropdown()}
                            style={ExpenseStyle.textArea}
                        />

                        {/* Cost and GST */}
                        <View style={ExpenseStyle.row}>
                            <CustomTextInput
                                label="Cost"
                                placeholder="Enter cost"
                                icon="currency-usd"
                                value={row.cost}
                                keyboardType="numeric"
                                required={true}
                                onChangeText={text => handleInputChange(index, 'cost', text)}
                                onFocus={() => handleCloseAllDropdown()}
                            />

                            <View style={{ marginLeft: 5 }}>
                                <Text style={ExpenseStyle.label}>GST</Text>
                                <View style={ExpenseStyle.inputWithIcon}>
                                    <Checkbox
                                        status={row.gst ? 'checked' : 'unchecked'}
                                        onPress={() => handleInputChange(index, 'gst', !row.gst)}
                                    />
                                </View>
                            </View>

                            <View style={ExpenseStyle.iconCOntainer}>
                                {row.image ? (
                                    <>
                                        <Image
                                            source={{ uri: row.image.uri }}
                                            style={ExpenseStyle.image}
                                        />
                                        <TouchableOpacity
                                            style={
                                                index == 1 && !activeSubmitIndex.includes(index)
                                                    ? ExpenseStyle.iconHoverOnImage1
                                                    : ExpenseStyle.iconHoverOnImage
                                            }
                                            onPress={() => handleImageRemove(index)}>
                                            <VectorIcon
                                                icon="Entypo"
                                                name="cross"
                                                size={22}
                                                color={'#FFFFFFFF'}
                                            />
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => openSwmsModal(index)}
                                        style={ExpenseStyle.cameraIcon}>
                                        <VectorIcon
                                            icon="FontAwesome"
                                            name="camera"
                                            size={30}
                                            color={Colors.blue_theme_Color}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <View>
                            {
                                row.gst && (
                                    <CustomTextInput
                                        label="GST"
                                        placeholder="Enter GST"
                                        icon="currency-usd"
                                        value={row.gst_amount}
                                        keyboardType="numeric"
                                        // required={true}
                                        onChangeText={text => handleInputChange(index, 'gst_amount', text)}
                                        onFocus={() => handleCloseAllDropdown()}
                                    />
                                )
                            }
                        </View>
                        <View style={ExpenseStyle.Buttoncontainer}>
                            <TouchableOpacity
                                style={ExpenseStyle.selectFileButton}
                                onPress={() => handleUploadNew(index)}
                                activeOpacity={0.8}>
                                <VectorIcon
                                    icon="Entypo"
                                    name="folder"
                                    size={20}
                                    color="#fff"
                                    style={ExpenseStyle.icon}
                                />
                                <Text style={ExpenseStyle.buttonText}>Upload Invoice</Text>
                            </TouchableOpacity>

                            <Text style={ExpenseStyle.selectedFile}>
                                {row?.invoice_pdf
                                    ? `Selected: ${row?.invoice_pdf?.name}`
                                    : 'No document selected'}
                            </Text>
                        </View>

                        <View style={ExpenseStyle.buttonRow}>
                            <TouchableOpacity
                                style={
                                    activeSubmitIndex.includes(index) &&
                                        successIndex?.includes(index)
                                        ? ExpenseStyle.submittedButton
                                        : ExpenseStyle.button
                                }
                                disabled={
                                    activeSubmitIndex.includes(index) &&
                                    successIndex?.includes(index)
                                }
                                onPress={() => {
                                    handleSaveRow(index);
                                    handleCloseAllDropdown();
                                }}>
                                <Text style={ExpenseStyle.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible1}
                            onRequestClose={() => setModalVisible1(false)}>
                            <View style={ExpenseStyle.modalBackground}>
                                <View style={ExpenseStyle.modalContainer}>
                                    <Text style={ExpenseStyle.modalText}>
                                        Do you Want to add a new expense?
                                    </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            style={ExpenseStyle.button1}
                                            onPress={() => handleCancel(index)}>
                                            <Text style={ExpenseStyle.buttonText}>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={ExpenseStyle.button1}
                                            onPress={() => handleAddRow(index)}>
                                            <Text style={ExpenseStyle.buttonText}>Add</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                ))}
            </Pressable>
        </KeyboardAwareScrollView>

        {isCalendarVisible && (
            <View style={ExpenseStyle.calendarModal}>
                <Calendar onDayPress={day => handleDateSelect(day)} />
                <TouchableOpacity
                    style={ExpenseStyle.closeModalButton}
                    onPress={handleCalendarClose}>
                    <Text style={{ color: 'white' }}>Close</Text>
                </TouchableOpacity>
            </View>
        )}
        <BottomSheetModal
            visible={isSwmsModalVisible}
            onClose={() => setSwmsModalVisible(false)}
            onTakePhoto={handleSwmsTakePhoto}
            onSelectFromGallery={handleSwmsPickImage}
        />
        <ConfirmationAlert
            isVisible={isModalVisible}
            onClose={closeModal}
            onOK={handleOK}
            successAnimation={successAnimation}
            message="Expense Details Saved Successfully!"
        />
        {/* Loader moved to ensure it overlays even if keyboard is up */}
        {ExpenseLoading && (
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)', // Optional dimming
                    zIndex: 999
                }}>
                <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
            </View>
        )}
        <ValidationErrorModal
            visible={showValidationModal}
            errors={currentErrors}
            onClose={() => setShowValidationModal(false)}
        />
    </View>
);
};

export default NewExpenses;