import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Header from '../../../ReusableComponent/Header';
import BottomSheetModal from '../../../ReusableComponent/BottomSheetModal';
import ConfirmationAlert from '../../../ReusableComponent/ConfirmationAlert';
import { Calendar } from 'react-native-calendars';
import TooltipModal from '../../../ReusableComponent/ToolTipModal';
import { hazardOptions, resJobOptions } from '../../../Assets/Data/Data';
import CreateQuoteStyle from '../../../utils/Stylesheet/CreateQuoteStyle';
import ResidentialQuoteForm from './ResidentialQuoteSection';
import CommercialQuoteSection from './CommercialQuoteSection';
import StorefrontForm from './StorefrontSection';
import CustomerSelect from './CustomerSelect';
import CategorySelection from './CategorySelection';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Colors from '../../../Assets/Style/Color';
import { useDispatch, useSelector } from 'react-redux';
import { CreateQuoteApi } from '../../../Redux/API/CreateQuoteApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetQuotationListApi } from '../../../Redux/API/GetQuotationListApi';
import { useNavigation } from '@react-navigation/native';
import { GetRiskLevelsApi } from '../../../Redux/API/GetRiskLevelsApi';
import ValidationErrorModal from '../../../ReusableComponent/ValidationErrorModal';
import { GetXeroSentQuotesApi } from '../../../Redux/API/XeroQuoteApi';
const successAnimation = require('../../../Assets/Images/LottieAnimation/loginsuccessful.json');

const CreateQuote = ({ route }) => {
  const navigation = useNavigation();
  const { formData } = route.params || {};
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipVisible1, setTooltipVisible1] = useState(false);
  const [tooltipVisible2, setTooltipVisible2] = useState(false);
  const [tooltipVisible3, setTooltipVisible3] = useState(false);

  const [tooltipMsg, setTooltipMsg] = useState('');
  const [tooltipMsg1, setTooltipMsg1] = useState('');
  const [tooltipMsg2, setTooltipMsg2] = useState('');
  const [tooltipMsg3, setTooltipMsg3] = useState('');
  // States for checkboxes
  const [isShowResidential, setIsShowResidential] = useState(false);
  const [isShowStorefront, setIsShowStorefront] = useState(false);
  const [isShowCommercial, setIsShowCommercial] = useState(false);

  const [isResidential, setIsResidential] = useState(false);
  const [isStorefront, setIsStorefront] = useState(false);
  const [isCommercial, setIsCommercial] = useState(false);
  const [isModalToastVisible, setModalToastVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // States for inputs
  const [selectCustomer, setSelectCustomer] = useState('');
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [storeFrontAddress, setStoreFrontAddress] = useState('');
  const [commercialAddress, setCommercialAddress] = useState('');
  const [ResidentialAddress, setResidentialAddress] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [notes, setNotes] = useState('');
  const [source, setSource] = useState('');
  const [location, setLocation] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedImageArray, setSelectedImageArray] = useState([]);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const [storeName, setStorename] = useState('');
  const [ABN, setABN] = useState('');
  const [storeABN, setStoreABN] = useState('');

  const [timePick1, setTimePick1] = useState(null);
  const [timePick2, setTimePick2] = useState(null);
  const [beforeTime, setBeforeTime] = useState(null);
  const [afterTime, setAfterTime] = useState(null);
  const [rows, setRows] = useState([
    {
      setUp: '',
      hours: '',
      min: '',
      timeEst: '',
      price: '',
      selectedComCode: '',
      msg: '',
    },
  ]);
  const [comHoursDropdown, setComHoursDropdown] = useState(null);
  const [comMinDropdown, setComMinDropdown] = useState(null);
  const [storerows, setStoreRows] = useState([
    { job: '', rotation: '', price: '', selectedStoreCode: '', msg: '' },
  ]);
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState(null);

  const storeFrontJobOptions = [
    'External Windows',
    'Internal Windows',
    'Office/Partition',
    'Glass',
    'Solar Panels',
  ];

  const [resrows, setResRows] = useState([
    {
      setUp: '',
      hours: '',
      min: '',
      timeEst: '',
      price: '',
      selectedResCode: '',
      msg: '',
    },
  ]);
  const [resDropdownVisibleIndex, setResDropdownVisibleIndex] = useState(null);
  const [hoursDropdown, setHoursDropdown] = useState(null);
  const [minDropdown, setMinDropdown] = useState(null);
  const hoursOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const minOptions = ['00', '15', '30', '45', '60'];

  const [rotationdropdownVisibleIndex, setRotationDropdownVisibleIndex] =
    useState(null);
  const rotationOptions = [
    'No Rotation',
    '1 Week',
    '2 Weekly',
    '4 Weekly',
    '6 Weekly',
    '8 Weekly',
    '12 Weekly',
  ];

  const [isSwmsModalVisible, setSwmsModalVisible] = useState(false);
  const [swmsRows, setSwmsRows] = useState([
    {
      hazard: '',
      riskLevel: '',
      riskInclude: '',
      controlMeasure: '',
      image: null,
    },
  ]);
  const [SwmsDropdownVisibleIndex, setSwmsDropdownVisibleIndex] =
    useState(null);
  const [
    SwmsRiskLevelDropdownVisibleIndex,
    setSwmsRiskLevelDropdownVisibleIndex,
  ] = useState(null);

  const [activeIndex, setActiveIndex] = useState(null);

  // Date Picker states
  const [isTimePickerOpen1, setTimePickerOpen1] = useState(false);
  const [isTimePickerOpen2, setTimePickerOpen2] = useState(false);

  const [beforePickerOpen, setBeforePickerOpen] = useState(false);
  const [afterPickerOpen, setAfterPickerOpen] = useState(false);

  const [followUpDate, setFollowUpDate] = useState(null);
  const [followUpTime, setFollowUpTime] = useState('');

  const [formErrors, setFormErrors] = useState({});
  const [validationErrorModal, setValidationErrorModal] = useState(false);

  const [SiteName, setSiteName] = useState('');
  const [selectDropdownVisbile, setSelectDropdownVisbile] = useState(false);
  const [isSourceDropdown, setIsSourceDropdown] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [itemCodeOptions, setItemCodeOptions] = useState([]);
  const [conItemCodeOptions, setComItemCodeOptions] = useState([]);
  const [storeItemCodeOptions, setStoreItemCodeOptions] = useState([]);

  // const {ItemsList} = useSelector(state => state.ItemsJob);
  const { ResidentialDropdownData } = useSelector(state => state.DropdownList);
  const { CommercialDropdownData } = useSelector(state => state.DropdownList);
  const { StoreFrontDropdownData } = useSelector(state => state.DropdownList);

  const { CustomerList } = useSelector(state => state.CustomerList);
  const { CreateQuoteLoading } = useSelector(state => state.CreateQuote);
  const { LoginData } = useSelector(state => state.Login);
  const { UserData } = useSelector(state => state.UserDetails);
  const { BrandingThemeData } = useSelector(state => state.BrandingTheme);
  const themes = BrandingThemeData?.BrandingThemes || [];
  const dispatch = useDispatch();

  const storefrontBrandingThemeID = themes.find(
    theme => theme.Name === 'Storefront',
  )?.BrandingThemeID;
  const commercialBrandingThemeID = themes.find(
    theme => theme.Name === 'Commercial',
  )?.BrandingThemeID;
  const residentialBrandingThemeID = themes.find(
    theme => theme.Name === 'Residential',
  )?.BrandingThemeID;

  const sources = [
    { label: 'Friend', value: 'friend' },
    { label: 'Google', value: 'google' },
    { label: 'Advertisement', value: 'advertisement' },
    { label: 'Social Media', value: 'social_media' },
    { label: 'Referral', value: 'referral' },
    { label: 'Website', value: 'website' },
    { label: 'Other', value: 'other' },
  ];
  useEffect(() => {
    const fetchCustomerList = async () => {
      setCustomerList(CustomerList?.franchise_customer);
    };
    fetchCustomerList();
  }, [CustomerList]);

  useEffect(() => {
    const fetchItemCodesList = async () => {
      if (ResidentialDropdownData?.status === true) {
        setItemCodeOptions(ResidentialDropdownData?.Items);
      }
    };
    fetchItemCodesList();
  }, [ResidentialDropdownData]);

  useEffect(() => {
    const fetchItemCodesList = async () => {
      if (CommercialDropdownData?.status === true) {
        setComItemCodeOptions(CommercialDropdownData?.Items);
      }
    };
    fetchItemCodesList();
  }, [CommercialDropdownData]);

  useEffect(() => {
    const fetchItemCodesList = async () => {
      if (StoreFrontDropdownData?.status === true) {
        setStoreItemCodeOptions(StoreFrontDropdownData?.Items);
      }
    };
    fetchItemCodesList();
  }, [StoreFrontDropdownData]);

  useEffect(() => {
    if (formData) {
      const { email: emailAddress } = formData;
      if (emailAddress) {
        const matchedCustomer = customerList?.find(
          customer =>
            customer.email?.toLowerCase() === emailAddress.toLowerCase(),
        );

        if (matchedCustomer) {
          handleSelectJob(matchedCustomer);
        } else {
          setFirstName(formData.firstName || '');
          setLastName(formData.LastName || '');
          setPhone(formData.phone || '');
          setEmail(formData.email || '');
          setAddress(formData.address || '');
          setBusinessName(formData.businessName || '');
          setNotes(formData.notes || '');
          setSource(formData.source || '');
          setFollowUpDate(formData.followUpDate || '');
          setFollowUpTime(formData.followUpTime || '');
          setLocation(formData.location || '');
          setSelectedImage(formData.selectedImage || null);

          const checkboxes = formData.checkboxes || {};
          setIsShowResidential(checkboxes.residential ?? false);
          setIsShowStorefront(checkboxes.storefront ?? false);
          setIsShowCommercial(checkboxes.commercial ?? false);
          setIsCommercial(checkboxes.commercial);
          setIsResidential(checkboxes.residential);
          setIsStorefront(checkboxes.storefront);
        }

        setShowInfo(true);
      }
    }
  }, [formData, customerList]);

  const handleSelectJob = selectedJob => {
    if (selectedJob) {
      setFirstName(selectedJob?.first_name || '');
      setLastName(selectedJob?.last_name || '');
      setPhone(selectedJob?.phone || '');
      setEmail(selectedJob?.email || '');
      setAddress(selectedJob?.address || '');
      setResidentialAddress(selectedJob?.address || '');
      setCommercialAddress(selectedJob?.address || '');
      setStoreFrontAddress(selectedJob?.address || '');
      setBusinessName(selectedJob?.business_name || '');
      setNotes(selectedJob?.notes || '');
      setSource(selectedJob?.how_did_you_hear || '');
      setSelectedCustomerId(selectedJob?.id || '');
      setSelectCustomer(
        selectedJob?.first_name + ' ' + selectedJob?.last_name || '',
      );

      const checkboxesData = {
        commercial: selectedJob?.contact_category?.includes('commercial'),
        residential: selectedJob?.contact_category?.includes('residential'),
        storefront: selectedJob?.contact_category?.includes('storefront'),
      };

      if (checkboxesData.commercial) {
        setIsCommercial(true);
        setIsResidential(false);
        setIsStorefront(false);
      } else if (checkboxesData.residential) {
        setIsCommercial(false);
        setIsResidential(true);
        setIsStorefront(false);
      } else if (checkboxesData.storefront) {
        setIsCommercial(false);
        setIsResidential(false);
        setIsStorefront(true);
      } else {
        setIsCommercial(false);
        setIsResidential(false);
        setIsStorefront(false);
      }

      // Show which checkboxes should be displayed
      setIsShowCommercial(checkboxesData.commercial);
      setIsShowResidential(checkboxesData.residential);
      setIsShowStorefront(checkboxesData.storefront);
    } else {
      // console.log('⚠️ handleSelectJob called with null or undefined selectedJob');
    }

    setSelectDropdownVisbile(false);
    setShowInfo(true);
  };

  const resetFields = () => {
    setSelectedImage([]);
    setSelectedImageArray([]);
    setCalendarOpen(false);

    setStorename('');
    setABN('');
    setStoreABN('');

    setTimePick1(null);
    setTimePick2(null);
    setBeforeTime(null);
    setAfterTime(null);
    setRows([{ setUp: '', hours: '', min: '', timeEst: '', price: '' }]);
    setSwmsRows([
      {
        hazard: '',
        riskLevel: '',
        riskInclude: '',
        controlMeasure: '',
        image: null,
      },
    ]);
    setComHoursDropdown(null);
    setComMinDropdown(null);
    setStoreRows([{ job: '', rotation: '', price: '' }]);
    setResRows([{ setUp: '', hours: '', min: '', timeEst: '', price: '' }]);
    setRows([
      {
        setUp: '',
        hours: '',
        min: '',
        timeEst: '',
        price: '',
        selectedComCode: '',
        msg: '',
      },
    ]);
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setStoreFrontAddress('');
    setCommercialAddress('');
    setResidentialAddress('');
    setBusinessName('');
    setNotes('');
    setSource('');
    setIsCommercial(false);
    setIsResidential(false);
    setIsStorefront(false);
    setSelectCustomer('');
    setShowInfo(false);
    setIsShowResidential(false);
    setIsShowCommercial(false);
    setIsShowStorefront(false);
    // setSelectedComCode('')
    // setSelectedStoreCode('')
  };

  const handleOK = async () => {
    setModalToastVisible(false);
    navigation.navigate('Quotes');
    resetFields();
  };

  const handleTakePhoto = () => {
    setModalVisible(false);
    launchCamera(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          const newPhoto = response.assets[0].uri;
          const newPhoto1 = response.assets[0];
          setSelectedImage(prevImages => (prevImages || []).concat(newPhoto));
          setSelectedImageArray(prevImages =>
            (prevImages || []).concat(newPhoto1),
          );
        }
      },
    );
  };

  const handleSelectFromGallery = () => {
    setModalVisible(false);
    launchImageLibrary(
      {
        selectionLimit: 0,
        mediaType: 'photo',
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          const selectedImages = response.assets.map(image => image.uri);
          const selectedImages1 = response.assets;

          setSelectedImage(prevImages =>
            (prevImages || []).concat(selectedImages),
          );
          setSelectedImageArray(prevImages =>
            (prevImages || []).concat(selectedImages1),
          );
        }
      },
    );
  };

  const toggleSource = () => {
    setIsSourceDropdown(isSourceDropdown === true ? false : true);
    setDropdownVisibleIndex(false);
    setSelectDropdownVisbile(false);
    setSwmsDropdownVisibleIndex(false);
  };
  const handleSourceSelect = selectedSource => {
    setSource(selectedSource);
    setIsSourceDropdown(isSourceDropdown === true ? false : true);
  };

  const closeModal = () => {
    setModalToastVisible(false);
  };
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  const handleResInputChange = (index, field, value) => {
    const updatedResRows = [...resrows];
    updatedResRows[index][field] = value;
    setResRows(updatedResRows);
  };
  const handleTimeEstInputChange = (index, field, value) => {
    const updatedTimeEstRows = [...resrows];
    updatedTimeEstRows[index][field] = value;
    setResRows(updatedTimeEstRows);
  };
  const handleStoreInputChange = (index, field, value) => {
    const updatedStoreRows = [...storerows];
    updatedStoreRows[index][field] = value;
    setRows(updatedStoreRows);
  };
  const handleResSelectJob = (index, selectedJob) => {
    const updatedResRows = [...resrows];
    updatedResRows[index].setUp = selectedJob?.name;
    updatedResRows[index].selectedResCode = selectedJob?.code;
    updatedResRows[index].msg = selectedJob?.Description;
    setResRows(updatedResRows);
    setResDropdownVisibleIndex(null);
  };
  const pricePerHour = UserData?.data?.rate;

  const calculatePrice = (hours, minutes) => {
    let totalHours = parseInt(hours) || 0;
    let totalMinutes = parseInt(minutes) || 0;

    let totalTimeInHours = totalHours + totalMinutes / 60;
    return totalTimeInHours * pricePerHour;
  };

  const handleResSelectHours = (index, hours) => {
    const updatedResRows = [...resrows];
    updatedResRows[index].hours = hours;

    const min = updatedResRows[index]?.min || '00';
    updatedResRows[index].timeEst = `${hours.padStart(2, '0')}:${min}`;

    const hourPrice = calculatePrice(
      updatedResRows[index]?.hours,
      updatedResRows[index]?.min,
    );
    updatedResRows[index].price = hourPrice.toString();

    setResRows(updatedResRows);
    setHoursDropdown(false);
  };

  const handleResSelectMin = (index, min) => {
    const updatedResRows = [...resrows];
    updatedResRows[index].min = min;

    const hours = updatedResRows[index]?.hours || '01';
    updatedResRows[index].timeEst = `${hours.padStart(2, '0')}:${min}`;

    const minPrice = calculatePrice(
      updatedResRows[index]?.hours,
      updatedResRows[index]?.min,
    );
    updatedResRows[index].price = minPrice.toString();

    setResRows(updatedResRows);
    setMinDropdown(false);
  };

  const calculateComPrice = (hours, minutes) => {
    let totalHours = parseInt(hours) || 0;
    let totalMinutes = parseInt(minutes) || 0;

    let totalTimeInHours = totalHours + totalMinutes / 60;
    const total = totalTimeInHours * pricePerHour;

    return total;
  };

  const handleComSelectHours = (index, hours) => {
    const updatedComRows = [...rows];
    updatedComRows[index].hours = hours;

    const minutes = updatedComRows[index]?.min || '00';
    updatedComRows[index].timeEst = `${hours.padStart(
      2,
      '0',
    )}:${minutes.padStart(2, '0')}`;

    const hourNum = Number(updatedComRows[index]?.hours || 0);
    const minNum = Number(updatedComRows[index]?.min || 0);

    const hourPrice = calculateComPrice(hourNum, minNum);
    updatedComRows[index].price = hourPrice?.toString() || '0';

    setRows(updatedComRows);
    setComHoursDropdown(false);
  };

  const handleComSelectMin = (index, min) => {
    const updatedComRows = [...rows];
    updatedComRows[index].min = min;

    const hours = updatedComRows[index]?.hours || '01';
    updatedComRows[index].timeEst = `${hours.padStart(2, '0')}:${min.padStart(
      2,
      '0',
    )}`;

    const hourNum = Number(updatedComRows[index]?.hours || 0);
    const minNum = Number(updatedComRows[index]?.min || 0);

    const minPrice = calculateComPrice(hourNum, minNum);
    console.log('Min Price:', minPrice);

    updatedComRows[index].price = minPrice?.toString() || '0';

    setRows(updatedComRows);
    setComMinDropdown(false);
  };

  const handleComSelectJob = (index, selectedJob) => {
    Keyboard.dismiss();
    const updatedResRows = [...rows];
    updatedResRows[index].setUp = selectedJob?.Name;
    updatedResRows[index].selectedComCode = selectedJob?.Code;
    updatedResRows[index].msg = selectedJob?.Description;
    setRows(updatedResRows);
    setDropdownVisibleIndex(false);
  };
  const handleSelectStoreFrontJob = (index, selectedJob) => {
    const updatedStoreRows = [...storerows];
    updatedStoreRows[index].job = selectedJob?.Name;
    updatedStoreRows[index].selectedStoreCode = selectedJob?.Code;
    updatedStoreRows[index].msg = selectedJob?.Description;
    setStoreRows(updatedStoreRows);
    setDropdownVisibleIndex(false);
  };
  const handleSelectRotation = (index, selectedRotation) => {
    const updatedStoreRows = [...storerows];
    updatedStoreRows[index].rotation = selectedRotation;
    setStoreRows(updatedStoreRows);
    setRotationDropdownVisibleIndex(false);
  };

  const handleAddRow = () => {
    setRows([...rows, { job: '', rotation: '', price: '' }]);
  };
  const handleDeleteRow = index => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };
  const handleAddStoreRow = () => {
    setStoreRows([...storerows, { job: '', rotation: '', price: '' }]);
  };
  const handleDeleteStoreRow = index => {
    const updatedStoreRows = storerows.filter(
      (_, rowIndex) => rowIndex !== index,
    );
    setStoreRows(updatedStoreRows);
  };
  const handleAddResRow = () => {
    setResRows([...resrows, { setUp: '', timeEst: '', price: '' }]);
  };

  const handleDeleteResRow = index => {
    const updatedResRows = resrows.filter((_, rowIndex) => rowIndex !== index);
    setResRows(updatedResRows);
  };

  //  SWMS functions
  const handleAddSWMSRow = () => {
    setSwmsRows([...swmsRows, { hazard: '', riskLevel: '', image: null }]);
  };

  const handleDeleteSWMSRow = index => {
    const updatedRows = swmsRows.filter((_, i) => i !== index);
    setSwmsRows(updatedRows);
  };

  const formatRiskLevel = level => {
    return (
      level
        ?.trim()
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase()) || ''
    );
  };

  const handleSwmsInputChange = (index, field, value) => {
    const updatedRows = [...swmsRows];

    if (field === 'riskLevel') {
      // If coming from dropdown selection (object with .level)
      if (typeof value === 'object' && value?.level) {
        updatedRows[index][field] = formatRiskLevel(value.level);
        updatedRows[index].controlMeasure = value?.control_measure || '';
      } else {
        // If manually typed string
        updatedRows[index][field] = value;
      }
    } else {
      updatedRows[index].riskLevel = '';
      updatedRows[index].controlMeasure = '';
      updatedRows[index][field] = value?.name || value || '';
      updatedRows[index].riskInclude = value?.risk_include || '';
    }

    setSwmsRows(updatedRows);
  };

  // Handle taking a photo
  const handleSwmsTakePhoto = () => {
    setSwmsModalVisible(false);
    launchCamera({}, response => {
      if (
        response.assets &&
        response.assets.length > 0 &&
        activeIndex !== null
      ) {
        const updatedRows = [...swmsRows];
        updatedRows[activeIndex].image = response.assets[0];
        setSwmsRows(updatedRows);
      }
    });
  };

  const openSwmsModal = index => {
    setActiveIndex(index);
    setSwmsModalVisible(true);
  };
  // Handle selecting an image from the gallery
  const handleSwmsPickImage = () => {
    setSwmsModalVisible(false);
    launchImageLibrary({}, response => {
      if (
        response.assets &&
        response.assets.length > 0 &&
        activeIndex !== null
      ) {
        const updatedRows = [...swmsRows];
        updatedRows[activeIndex].image = response.assets[0];
        setSwmsRows(updatedRows);
      }
    });
  };
  const handleImageRemove = index => {
    setSelectedImage(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSwmsImageRemove = index => {
    const updatedRows = [...swmsRows];
    updatedRows[index].image = null;
    setSwmsRows(updatedRows);
  };

  const selectHazard = (index, hazard) => {
    const user_id = hazard?.id;
    const token = LoginData?.token;

    dispatch(GetRiskLevelsApi({ token: token, id: user_id }));
    handleSwmsInputChange(index, 'hazard', hazard);
    setTooltipMsg2(hazard.note);
    setSwmsDropdownVisibleIndex(null);
  };

  const selectSwmsRiskLevel = (index, riskLevel) => {
    handleSwmsInputChange(index, 'riskLevel', riskLevel);
    setSwmsDropdownVisibleIndex(null);
    setSwmsRiskLevelDropdownVisibleIndex(false);
  };

  const toggleSwmsDropdown = index => {
    setDropdownVisibleIndex(false);
    setSelectDropdownVisbile(false);
    setIsSourceDropdown(false);
    setSwmsDropdownVisibleIndex(
      SwmsDropdownVisibleIndex === index ? null : index,
    );
    setSwmsRiskLevelDropdownVisibleIndex(false);
  };

  const toggleSwmsRiskLevelDropdown = index => {
    Keyboard.dismiss();
    setDropdownVisibleIndex(false);
    setSelectDropdownVisbile(false);
    setIsSourceDropdown(false);
    setSwmsDropdownVisibleIndex(false);
    setSwmsRiskLevelDropdownVisibleIndex(
      SwmsRiskLevelDropdownVisibleIndex === index ? null : index,
    );
  };
  const toggleSelectCustomer = () => {
    setSelectDropdownVisbile(selectDropdownVisbile === true ? false : true);
    setIsSourceDropdown(false);
  };
  const formatTime = timeStr => {
    if (!timeStr || typeof timeStr !== 'string') return '';

    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const validateForm = ({
    firstName,
    LastName,
    phone,
    email,
    selectedCustomerId,
    notes,
    isResidential,
    resrows,
    residentialBrandingThemeID,
    ResidentialAddress,
    isStorefront,
    storerows,
    storeFrontAddress,
    storeABN,
    storeName,
    storefrontBrandingThemeID,
    isCommercial,
    rows,
    swmsRows,
    commercialAddress,
    ABN,
    SiteName,
    commercialBrandingThemeID,
    formattedBeforeTime,
    formattedAfterTime,
    formattedTradingStart,
    formattedTradingEnd,
  }) => {
    const errors = [];

    if (!firstName?.trim()) errors.push('First name is required');
    if (!LastName?.trim()) errors.push('Last name is required');
    if (!phone?.trim()) errors.push('Phone number is required');
    if (!email?.trim()) errors.push('Email is required');
    if (!selectedCustomerId) errors.push('Customer ID is required');
    // if (!notes?.trim()) errors.push('Notes are required');

    if (isResidential) {
      if (!ResidentialAddress?.trim())
        errors.push('Residential address is required');
      // if (!residentialBrandingThemeID)
      //   errors.push('Residential branding theme is required');

      if (!Array.isArray(resrows) || resrows.length === 0) {
        errors.push('At least one residential job is required');
      } else {
        resrows.forEach((row, index) => {
          if (!row.setUp?.trim())
            errors.push(`Residential job ${index + 1}: job is required`);
          if (!row.timeEst?.trim())
            errors.push(`Residential job ${index + 1}: timeEst is required`);
          if (!row.price)
            errors.push(`Residential job ${index + 1}: price is required`);
          // if (!row.selectedResCode?.trim())
          //   errors.push(`Residential job ${index + 1}: ItemCode is required`);
        });
      }
    }

    if (isStorefront) {
      if (!storeFrontAddress?.trim())
        errors.push('Storefront address is required');
      // if (!storeABN?.trim()) errors.push('Store ABN is required');
      // if (!storeName?.trim()) errors.push('Store name is required');
      if (!formattedBeforeTime) errors.push('Before time is required.');
      if (!formattedAfterTime) errors.push('After time is required.');
      if (!formattedTradingStart)
        errors.push('Trading start time is required.');
      if (!formattedTradingEnd) errors.push('Trading end time is required.');

      // if (!storefrontBrandingThemeID)
      //   errors.push('Storefront branding theme is required');

      storerows.forEach((row, index) => {
        if (!row.job?.trim())
          errors.push(`Storefront job ${index + 1}: job is required`);
        if (!row.rotation?.trim())
          errors.push(`Storefront job ${index + 1}: rotation is required`);
        if (!row.price)
          errors.push(`Storefront job ${index + 1}: price is required`);
        // if (!row.selectedStoreCode?.trim())
        //   errors.push(`Storefront job ${index + 1}: ItemCode is required`);
      });
    }

    if (isCommercial) {
      if (!commercialAddress?.trim())
        errors.push('Commercial address is required');
      // if (!ABN?.trim()) errors.push('ABN is required');
      // if (!SiteName?.trim()) errors.push('Site name is required');
      // if (!commercialBrandingThemeID)
      //   errors.push('Commercial branding theme is required');
      rows.forEach((row, index) => {
        if (!row.setUp?.trim())
          errors.push(`Commercial job ${index + 1}: job is required`);
        if (!row.timeEst?.trim())
          errors.push(`Commercial job ${index + 1}: timeEst is required`);
        if (!row.price)
          errors.push(`Commercial job ${index + 1}: price is required`);
        // if (!row.selectedComCode?.trim())
        //   errors.push(`Commercial job ${index + 1}: ItemCode is required`);
      });

      swmsRows.forEach((row, index) => {
        if (!row.hazard?.trim())
          errors.push(`SWMS ${index + 1}: hazard is required`);
        if (!row.riskLevel?.trim())
          errors.push(`SWMS ${index + 1}: risk level is required`);
        // if (!row.riskInclude?.trim())
        //   errors.push(`SWMS ${index + 1}: risk include is required`);
        // if (!row.controlMeasure?.trim())
        //   errors.push(`SWMS ${index + 1}: control measure is required`);
      });
    }

    return errors;
  };

  const handleSubmit = async () => {
    const formattedBeforeTime = beforeTime ? formatTime(beforeTime) : '';
    const formattedAfterTime = afterTime ? formatTime(afterTime) : '';
    const formattedTradingStart = timePick1 ? formatTime(timePick1) : '';
    const formattedTradingEnd = timePick2 ? formatTime(timePick2) : '';
    const errors = validateForm({
      firstName,
      LastName,
      phone,
      email,
      selectedCustomerId,
      notes,
      isResidential,
      resrows,
      residentialBrandingThemeID,
      ResidentialAddress,
      isStorefront,
      storerows,
      storeFrontAddress,
      storeABN,
      storeName,
      storefrontBrandingThemeID,
      isCommercial,
      rows,
      swmsRows,
      commercialAddress,
      formattedBeforeTime,
      formattedAfterTime,
      formattedTradingStart,
      formattedTradingEnd,
      ABN,
      SiteName,
      commercialBrandingThemeID,
    });

    if (errors.length > 0) {
      setFormErrors(errors);
      setValidationErrorModal(true);
      return;
    }

    setFormErrors([]);

    const formData = new FormData();
    const user = await AsyncStorage.getItem('User');
    const parseduser = await JSON.parse(user);
    const id1 = parseduser?.id;
    formData.append('franchise_id', id1);
    formData.append('customer_id', selectedCustomerId);
    formData.append('customer_name', firstName + ' ' + LastName);
    formData.append('customer_phone', phone);
    formData.append('customer_email', email);
    formData.append('notes', notes);

    if (isResidential) {
      formData.append('category_type', 'residential');
      formData.append('category_address', ResidentialAddress);
      formData.append('BrandingThemeID', residentialBrandingThemeID);

      const residentialData = resrows.reduce((acc, row, index) => {
        acc[`residential_job[${index}][job]`] = row.setUp;
        acc[`residential_job[${index}][timeEst]`] = row.timeEst;
        acc[`residential_job[${index}][price]`] = row.price;
        acc[`residential_job[${index}][ItemCode]`] = row.selectedResCode;
        return acc;
      }, {});

      Object.keys(residentialData).forEach(key => {
        formData.append(key, residentialData[key]);
      });
    }
    if (isStorefront) {
      formData.append('category_type', 'storefront');
      formData.append('category_address', storeFrontAddress);
      formData.append('ABN', storeABN);
      formData.append('store_name', storeName);
      formData.append('BrandingThemeID', storefrontBrandingThemeID);
      const formattedBeforeTime = beforeTime ? formatTime(beforeTime) : '';
      const formattedAfterTime = afterTime ? formatTime(afterTime) : '';
      const formattedTradingStart = timePick1 ? formatTime(timePick1) : '';
      const formattedTradingEnd = timePick2 ? formatTime(timePick2) : '';

      // Append formatted times to the formData
      formData.append('trading_hours_start', formattedTradingStart);
      formData.append('trading_hours_end', formattedTradingEnd);
      formData.append('time_note_before', formattedBeforeTime);
      formData.append('time_note_after', formattedAfterTime);
      const storefrontData = storerows.reduce((acc, row, index) => {
        acc[`storefront_job[${index}][job]`] = row.job;
        acc[`storefront_job[${index}][rotation]`] = row.rotation;
        acc[`storefront_job[${index}][price]`] = row.price;
        acc[`storefront_job[${index}][ItemCode]`] = row.selectedStoreCode;
        return acc;
      }, {});
      Object.keys(storefrontData).forEach(key => {
        formData.append(key, storefrontData[key]);
      });
    }
    if (isCommercial) {
      formData.append('category_type', 'commercial');
      formData.append('category_address', commercialAddress);
      formData.append('ABN', ABN);
      formData.append('site_name', SiteName);
      formData.append('BrandingThemeID', commercialBrandingThemeID);

      const commercialData = rows.reduce((acc, row, index) => {
        acc[`commercial_job[${index}][job]`] = row.setUp;
        acc[`commercial_job[${index}][timeEst]`] = row.timeEst;
        acc[`commercial_job[${index}][price]`] = row.price;
        acc[`commercial_job[${index}][ItemCode]`] = row.selectedComCode;
        return acc;
      }, {});

      Object.keys(commercialData).forEach(key => {
        formData.append(key, commercialData[key]);
      });

      swmsRows.forEach((row, index) => {});

      // Loop to add SWMS data
      const swmsData = swmsRows.reduce((acc, row, index) => {
        acc[`swms[${index}][hazard]`] = row?.hazard?.trim();
        acc[`swms[${index}][risk_level]`] = row?.riskLevel;
        acc[`swms[${index}][risk_include]`] = row?.riskInclude;
        acc[`swms[${index}][control_measure]`] = row?.controlMeasure.trim();

        if (row.image) {
          const image = row.image;
          if (image.uri) {
            formData.append(`swms[${index}][image]`, {
              uri: image.uri,
              type: image.type || 'image/jpeg',
              name: image.fileName || `image_${index}.jpg`,
            });
          }
        }

        return acc;
      }, {});

      Object.keys(swmsData).forEach(key => {
        formData.append(key, swmsData[key]);
      });
    }

    selectedImageArray.forEach((image, index) => {
      formData.append(`image[${index}]`, {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    });
    const token = LoginData.token;

    const id = LoginData?.user?.id;
    const userId = user?.id;

    const postData1 = {
      franchise_id: userId,
    };

    dispatch(CreateQuoteApi(formData)).then(res => {
      if (res.payload.status == true) {
        // setPdfPath(res.payload?.view_pdf);
        // navigation.navigate('PdfViewer', {
        //   pdfUrl: res.payload?.view_pdf,
        // });
        dispatch(GetXeroSentQuotesApi({ token, postData1 })),
          dispatch(GetQuotationListApi({ token, id }));
        setModalToastVisible(true);
      }
    });
  };

  const handleDateSelect = date => {
    const selectedDate = new Date(date.dateString);

    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    setFollowUpDate(formattedDate);
    setCalendarOpen(false);
  };

  const toggleDropdown = index => {
    setDropdownVisibleIndex(dropdownVisibleIndex === index ? null : index);
    setSelectDropdownVisbile(false);
    setIsSourceDropdown(false);
    setSwmsDropdownVisibleIndex(false);
    setRotationDropdownVisibleIndex(false);
    setComHoursDropdown(false);
    setComMinDropdown(false);
  };

  const toggleResDropdown = index => {
    setResDropdownVisibleIndex(
      resDropdownVisibleIndex === index ? null : index,
    );
    setSelectDropdownVisbile(false);
    setIsSourceDropdown(false);
    setSwmsDropdownVisibleIndex(false);
    setRotationDropdownVisibleIndex(false);
    setHoursDropdown(false);
    setMinDropdown(false);
  };
  const toggleHoursDropdown = index => {
    setHoursDropdown(hoursDropdown === index ? null : index);
    setSelectDropdownVisbile(false);
    setIsSourceDropdown(false);
    setSwmsDropdownVisibleIndex(false);
    setRotationDropdownVisibleIndex(false);
    setResDropdownVisibleIndex(false);
    setMinDropdown(false);
  };
  const toggleComHoursDropdown = index => {
    setComHoursDropdown(comHoursDropdown === index ? null : index);
    setSelectDropdownVisbile(false);
    setIsSourceDropdown(false);
    setSwmsDropdownVisibleIndex(false);
    setRotationDropdownVisibleIndex(false);
    setResDropdownVisibleIndex(false);
    setMinDropdown(false);
    setComMinDropdown(false);
    setDropdownVisibleIndex(false);
  };
  const toggleMinDropdown = index => {
    setMinDropdown(minDropdown === index ? null : index);
    setSelectDropdownVisbile(false);
    setIsSourceDropdown(false);
    setSwmsDropdownVisibleIndex(false);
    setRotationDropdownVisibleIndex(false);
    setResDropdownVisibleIndex(false);
    setHoursDropdown(false);
  };
  const toggleComMinDropdown = index => {
    setComMinDropdown(comMinDropdown === index ? null : index);
    setSelectDropdownVisbile(false);
    setIsSourceDropdown(false);
    setSwmsDropdownVisibleIndex(false);
    setRotationDropdownVisibleIndex(false);
    setResDropdownVisibleIndex(false);
    setHoursDropdown(false);
    setComHoursDropdown(false);
    setDropdownVisibleIndex(false);
  };
  const toggleRotationDropdown = index => {
    setRotationDropdownVisibleIndex(
      rotationdropdownVisibleIndex === index ? null : index,
    );
    setDropdownVisibleIndex(false);
    setSelectDropdownVisbile(false);
    setIsSourceDropdown(false);
    setSwmsDropdownVisibleIndex(false);
  };

  const handleCloseAllDropdown = () => {
    setDropdownVisibleIndex(false);
    setSelectDropdownVisbile(false);
    setIsSourceDropdown(false);
    setSwmsDropdownVisibleIndex(false);
    setRotationDropdownVisibleIndex(false);
    setResDropdownVisibleIndex(false);
    setHoursDropdown(false);
    setMinDropdown(false);
    setComHoursDropdown(false);
    setComMinDropdown(false);
    setSwmsRiskLevelDropdownVisibleIndex(false);
  };
  const clearHazard = index => {
    const updatedRows = [...swmsRows];
    updatedRows[index].hazard = '';
    setSwmsRows(updatedRows);
    setSwmsDropdownVisibleIndex(index);
  };
  const showTooltip = msg => {
    setTooltipMsg(msg);
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 2000);
  };
  const showTooltip1 = msg => {
    setTooltipMsg1(msg);
    setTooltipVisible1(true);
    setTimeout(() => {
      setTooltipVisible1(false);
    }, 2000);
  };
  const showTooltip2 = () => {
    setTooltipVisible2(true);
    setTimeout(() => {
      setTooltipVisible2(false);
    }, 2000);
  };
  const showTooltip3 = msg => {
    setTooltipMsg3(msg);
    setTooltipVisible3(true);
    setTimeout(() => {
      setTooltipVisible3(false);
    }, 2000);
  };

  const trade = UserData?.data?.trade;
  const rate = UserData?.data?.rate;

  if (!trade || !rate) {
    return (
      <View style={CreateQuoteStyle.container}>
       <Header
        // notificationIcon={true}
        backButton={true}
        route="Profile"
      />
       <View style={CreateQuoteStyle.errorContainer}>
      <Text style={CreateQuoteStyle.title}>Profile Incomplete</Text>
      <Text style={CreateQuoteStyle.cancelText}>
        To create a quotation, please update your Trade and Rate in your profile.
      </Text>
    </View>
      </View>
     
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={CreateQuoteStyle.container}
    >
      <Header
        notificationIcon={true}
        // backButton={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={CreateQuoteStyle.contentContainer}
        keyboardShouldPersistTaps="always"
      >
        <Pressable onPress={handleCloseAllDropdown}>
          <Text style={CreateQuoteStyle.title}>Create Quote</Text>

          <CustomerSelect
            selectCustomer={selectCustomer}
            setSelectCustomer={setSelectCustomer}
            selectDropdownVisbile={selectDropdownVisbile}
            customerList={customerList}
            toggleSelectCustomer={toggleSelectCustomer}
            handleCloseAllDropdown={handleCloseAllDropdown}
            showInfo={showInfo}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={LastName}
            setLastName={setLastName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            address={address}
            setAddress={setAddress}
            businessName={businessName}
            setBusinessName={setBusinessName}
            isCommercial={isCommercial}
            isStorefront={isStorefront}
            source={source}
            setSource={setSource}
            isSourceDropdown={isSourceDropdown}
            sources={sources}
            handleSourceSelect={handleSourceSelect}
            toggleSource={toggleSource}
            setResidentialAddress={setResidentialAddress}
            setCommercialAddress={setCommercialAddress}
            setStoreFrontAddress={setStoreFrontAddress}
            setIsCommercial={setIsCommercial}
            setIsResidential={setIsResidential}
            setIsStorefront={setIsStorefront}
            setIsShowResidential={setIsShowResidential}
            setIsShowStorefront={setIsShowStorefront}
            setIsShowCommercial={setIsShowCommercial}
            setSelectDropdownVisbile={setSelectDropdownVisbile}
            setShowInfo={setShowInfo}
            setNotes={setNotes}
            setSelectedCustomerId={setSelectedCustomerId}
            isResidential={isResidential}
          />

          <CategorySelection
            isResidential={isResidential}
            setIsResidential={setIsResidential}
            isStorefront={isStorefront}
            setIsStorefront={setIsStorefront}
            isCommercial={isCommercial}
            setIsCommercial={setIsCommercial}
            isShowResidential={isShowResidential}
            isShowStorefront={isShowStorefront}
            isShowCommercial={isShowCommercial}
          />

          <StorefrontForm
            isStorefront={isStorefront}
            storeName={storeName}
            setStorename={setStorename}
            storeFrontAddress={storeFrontAddress}
            toggleDropdown={toggleDropdown}
            setStoreFrontAddress={setStoreFrontAddress}
            storeABN={storeABN}
            setStoreABN={setStoreABN}
            timePick1={timePick1}
            setTimePick1={setTimePick1}
            timePick2={timePick2}
            setTimePick2={setTimePick2}
            beforeTime={beforeTime}
            setBeforeTime={setBeforeTime}
            afterTime={afterTime}
            setAfterTime={setAfterTime}
            isTimePickerOpen1={isTimePickerOpen1}
            setTimePickerOpen1={setTimePickerOpen1}
            isTimePickerOpen2={isTimePickerOpen2}
            setTimePickerOpen2={setTimePickerOpen2}
            beforePickerOpen={beforePickerOpen}
            setBeforePickerOpen={setBeforePickerOpen}
            afterPickerOpen={afterPickerOpen}
            setAfterPickerOpen={setAfterPickerOpen}
            storerows={storerows}
            toggleRotationDropdown={toggleRotationDropdown}
            handleStoreInputChange={handleStoreInputChange}
            handleSelectStoreFrontJob={handleSelectStoreFrontJob}
            handleSelectRotation={handleSelectRotation}
            handleAddStoreRow={handleAddStoreRow}
            handleDeleteStoreRow={handleDeleteStoreRow}
            handleCloseAllDropdown={handleCloseAllDropdown}
            storeFrontJobOptions={storeFrontJobOptions}
            rotationOptions={rotationOptions}
            showTooltip3={showTooltip3}
            dropdownVisibleIndex={dropdownVisibleIndex}
            rotationdropdownVisibleIndex={rotationdropdownVisibleIndex}
            notes={notes}
            setNotes={setNotes}
            itemCodeOptions={storeItemCodeOptions}
          />

          {/* Commercial Component */}
          <CommercialQuoteSection
            isCommercial={isCommercial}
            SiteName={SiteName}
            setSiteName={setSiteName}
            commercialAddress={commercialAddress}
            setCommercialAddress={setCommercialAddress}
            ABN={ABN}
            setABN={setABN}
            rows={rows}
            handleInputChange={handleInputChange}
            dropdownVisibleIndex={dropdownVisibleIndex}
            toggleDropdown={toggleDropdown}
            handleComSelectJob={handleComSelectJob}
            comHoursDropdown={comHoursDropdown}
            toggleComHoursDropdown={toggleComHoursDropdown}
            hoursOptions={hoursOptions}
            handleComSelectHours={handleComSelectHours}
            comMinDropdown={comMinDropdown}
            toggleComMinDropdown={toggleComMinDropdown}
            minOptions={minOptions}
            handleComSelectMin={handleComSelectMin}
            notes={notes}
            setNotes={setNotes}
            handleAddRow={handleAddRow}
            handleDeleteRow={handleDeleteRow}
            showTooltip1={showTooltip1}
            showTooltip2={showTooltip2}
            swmsRows={swmsRows}
            toggleSwmsDropdown={toggleSwmsDropdown}
            toggleSwmsRiskLevelDropdown={toggleSwmsRiskLevelDropdown}
            hazardOptions={hazardOptions}
            selectSwmsRiskLevel={selectSwmsRiskLevel}
            selectHazard={selectHazard}
            handleSwmsInputChange={handleSwmsInputChange}
            handleSwmsImageRemove={handleSwmsImageRemove}
            openSwmsModal={openSwmsModal}
            handleAddSWMSRow={handleAddSWMSRow}
            handleDeleteSWMSRow={handleDeleteSWMSRow}
            handleCloseAllDropdown={handleCloseAllDropdown}
            SwmsDropdownVisibleIndex={SwmsDropdownVisibleIndex}
            SwmsRiskLevelDropdownVisibleIndex={
              SwmsRiskLevelDropdownVisibleIndex
            }
            itemCodeOptions={conItemCodeOptions}
            clearHazard={clearHazard}
            setSwmsDropdownVisibleIndex={setSwmsDropdownVisibleIndex}
          />

          {/* Residential Component */}
          <ResidentialQuoteForm
            isResidential={isResidential}
            ResidentialAddress={ResidentialAddress}
            resrows={resrows}
            resDropdownVisibleIndex={resDropdownVisibleIndex}
            hoursDropdown={hoursDropdown}
            minDropdown={minDropdown}
            resJobOptions={resJobOptions}
            hoursOptions={hoursOptions}
            minOptions={minOptions}
            notes={notes}
            handleCloseAllDropdown={handleCloseAllDropdown}
            setResidentialAddress={setResidentialAddress}
            handleResInputChange={handleResInputChange}
            toggleResDropdown={toggleResDropdown}
            handleResSelectJob={handleResSelectJob}
            toggleHoursDropdown={toggleHoursDropdown}
            handleResSelectHours={handleResSelectHours}
            toggleMinDropdown={toggleMinDropdown}
            handleResSelectMin={handleResSelectMin}
            handleTimeEstInputChange={handleTimeEstInputChange}
            handleDeleteResRow={handleDeleteResRow}
            handleAddResRow={handleAddResRow}
            showTooltip={showTooltip}
            setNotes={setNotes}
            itemCodeOptions={itemCodeOptions}
          />

          {/* Follow-Up Date */}
          <View>
            <Text style={CreateQuoteStyle.label}>Pick an Image</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={CreateQuoteStyle.selectimageCont}
                onPress={() => {
                  setModalVisible(true);
                  handleCloseAllDropdown();
                }}
              >
                <VectorIcon
                  icon="FontAwesome"
                  name="camera"
                  size={20}
                  color={Colors.blue_theme_Color}
                />
                <Text style={{ marginLeft: 5, color: Colors.white_text_color }}>
                  Pick an Image
                </Text>
              </TouchableOpacity>
            </View>
            {selectedImage?.length > 0 && (
              <View style={CreateQuoteStyle.imageRowContainer}>
                {selectedImage?.map((imageUri, index) => (
                  <View key={index} style={CreateQuoteStyle.imageContainer}>
                    <Image
                      source={{ uri: imageUri }}
                      resizeMode="contain"
                      style={CreateQuoteStyle.imageBottom}
                    />
                    <TouchableOpacity
                      style={CreateQuoteStyle.iconHoverOnImage}
                      onPress={() => handleImageRemove(index)}
                    >
                      <VectorIcon
                        icon="Entypo"
                        name="cross"
                        size={12}
                        color={'#000000'}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Submit */}
          <Button
            mode="contained"
            style={CreateQuoteStyle.button}
            onPress={handleSubmit}
          >
            Send Quotation
          </Button>
        </Pressable>
      </ScrollView>

      {/* Calendar Modal */}

      {isCalendarOpen && (
        <View style={CreateQuoteStyle.modalBackground}>
          <TouchableWithoutFeedback onPress={() => setCalendarOpen(false)}>
            <View style={CreateQuoteStyle.modalBackground}>
              <View style={CreateQuoteStyle.calendarModal}>
                <Calendar onDayPress={day => handleDateSelect(day)} />
                <TouchableOpacity
                  style={CreateQuoteStyle.closeModalButton}
                  onPress={() => setCalendarOpen(false)}
                >
                  <Text style={{ color: 'white' }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}

      <BottomSheetModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onTakePhoto={handleTakePhoto}
        onSelectFromGallery={handleSelectFromGallery}
      />
      <BottomSheetModal
        visible={isSwmsModalVisible}
        onClose={() => setSwmsModalVisible(false)}
        onTakePhoto={handleSwmsTakePhoto}
        onSelectFromGallery={handleSwmsPickImage}
      />
      <ConfirmationAlert
        isVisible={isModalToastVisible}
        onClose={closeModal}
        onOK={handleOK}
        successAnimation={successAnimation}
        message="Quotation sent Successfully!"
        showCancelButton={false}
      />
      {/* Reusable TooltipModal */}
      <TooltipModal
        visible={tooltipVisible}
        message={tooltipMsg || 'No Option Selected'}
        onClose={() => setTooltipVisible(false)}
      />

      <TooltipModal
        visible={tooltipVisible1}
        message={tooltipMsg1 || 'No Option Selected'}
        onClose={() => setTooltipVisible1(false)}
      />

      <TooltipModal
        visible={tooltipVisible2}
        message={tooltipMsg2 || 'No Option Selected'}
        onClose={() => setTooltipVisible2(false)}
      />

      <TooltipModal
        visible={tooltipVisible3}
        message={tooltipMsg3 || 'No Option Selected'}
        onClose={() => setTooltipVisible3(false)}
      />

      <ValidationErrorModal
        visible={validationErrorModal}
        errors={formErrors}
        onClose={() => setValidationErrorModal(false)}
      />

      {CreateQuoteLoading && (
        <View style={CreateQuoteStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default CreateQuote;
