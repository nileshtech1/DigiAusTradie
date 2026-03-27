import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {Checkbox, Button} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Header from '../../../ReusableComponent/Header';
import BottomSheetModal from '../../../ReusableComponent/BottomSheetModal';
import ConfirmationAlert from '../../../ReusableComponent/ConfirmationAlert';
import {Calendar} from 'react-native-calendars';
import TooltipModal from '../../../ReusableComponent/ToolTipModal';
import axios from 'axios';
import {hazardOptions, resJobOptions} from '../../../Assets/Data/Data';
import FollowUpForm from './FollowUpSection';
import CreateQuoteStyle from '../../../utils/Stylesheet/CreateQuoteStyle';
import ResidentialQuoteForm from './ResidentialQuoteSection';
import CommercialQuoteSection from './CommercialQuoteSection';
import StorefrontForm from './StorefrontSection';
import CustomerSelect from './CustomerSelect';
import CategorySelection from './CategorySelection';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Colors from '../../../Assets/Style/Color';
import {useDispatch, useSelector} from 'react-redux';
import {CreateQuoteApi} from '../../../Redux/API/CreateQuoteApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetQuotationListApi} from '../../../Redux/API/GetQuotationListApi';
import {GetCustomerListApi} from '../../../Redux/API/GetCustomerListApi';
import {quote_image_path, swms_image_path} from '../../../Redux/NWConfig';
import {EditQuoteApi} from '../../../Redux/API/EditQuoteApi';
import Header2 from '../../../ReusableComponent/Header2';
import {GetRiskLevelsApi} from '../../../Redux/API/GetRiskLevelsApi';
import ValidationErrorModal from '../../../ReusableComponent/ValidationErrorModal';
const successAnimation = require('../../../Assets/Images/LottieAnimation/loginsuccessful.json');

const EditQuote = ({navigation, route}) => {
  const {formData} = route.params || {};
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
  const [isNetwork, setIsNetwork] = useState(false);
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
  const [editQuote, setEditQuote] = useState(true);
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
    },
  ]);
  const [comHoursDropdown, setComHoursDropdown] = useState(null);
  const [comMinDropdown, setComMinDropdown] = useState(null);
  const [storerows, setStoreRows] = useState([
    {job: '', rotation: '', price: '', selectedStoreCode: ''},
  ]);
  const {LoginData} = useSelector(state => state.Login);
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState(null);
  const [initialFormValues, setInitialFormValues] = useState(null);
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
    '1 Week',
    '2 Weekly',
    '4 Weekly',
    '6 Weekly',
    '8 Weekly',
    '12 Weekly',
  ];

  const [isSwmsModalVisible, setSwmsModalVisible] = useState(false);
  const [swmsRows, setSwmsRows] = useState([
    {hazard: '', riskLevel: '', image: null},
  ]);
  const [SwmsDropdownVisibleIndex, setSwmsDropdownVisibleIndex] =
    useState(null); // Controls dropdown visibility
  const [
    SwmsRiskLevelDropdownVisibleIndex,
    setSwmsRiskLevelDropdownVisibleIndex,
  ] = useState(null);

  const [activeIndex, setActiveIndex] = useState(null);

  // Date Picker states
  const [isTimePickerOpen1, setTimePickerOpen1] = useState(false);
  const [isTimePickerOpen2, setTimePickerOpen2] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [validationErrorModal, setValidationErrorModal] = useState(false);

  const [beforePickerOpen, setBeforePickerOpen] = useState(false);
  const [afterPickerOpen, setAfterPickerOpen] = useState(false);

  const [SiteName, setSiteName] = useState('');
  const [selectDropdownVisbile, setSelectDropdownVisbile] = useState(false);
  const [isSourceDropdown, setIsSourceDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const {CustomerList} = useSelector(state => state.CustomerList);
  const {EditQuoteLoading} = useSelector(state => state.EditQuote);
  const [quotationNo, setQuotationNo] = useState('');
  const [quotationId, setQuotationId] = useState(0);
  const [status, setStatus] = useState('');
  const {ItemsList} = useSelector(state => state.ItemsJob);
  const dispatch = useDispatch();
  const {BrandingThemeData} = useSelector(state => state.BrandingTheme);
  const themes = BrandingThemeData?.BrandingThemes || [];
  const {UserData} = useSelector(state => state.UserDetails);
  const [itemCodeOptions, setItemCodeOptions] = useState([]);
  const [conItemCodeOptions, setComItemCodeOptions] = useState([]);
  const [storeItemCodeOptions, setStoreItemCodeOptions] = useState([]);
    const {ResidentialDropdownData} = useSelector(state => state.DropdownList);
    const {CommercialDropdownData} = useSelector(state => state.DropdownList);
    const {StoreFrontDropdownData} = useSelector(state => state.DropdownList);

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
    {label: 'Friend', value: 'friend'},
    {label: 'Google', value: 'google'},
    {label: 'Advertisement', value: 'advertisement'},
    {label: 'Social Media', value: 'social_media'},
    {label: 'Referral', value: 'referral'},
    {label: 'Website', value: 'website'},
    {label: 'Other', value: 'other'},
  ];

  useEffect(() => {
    const fetchCustomerList = async () => {
      const id = LoginData?.user?.id;
      const token = LoginData?.token;

      if (id && token) {
        const franchiseid = {franchise_id: id};
        dispatch(GetCustomerListApi({token, franchiseid}));
      }
    };

    fetchCustomerList();
  }, [LoginData, dispatch]);

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
    const fetchItemCodesList = async () => {
      if (ItemsList?.Items) {
        setItemCodeOptions(ItemsList?.Items);
      }
    };
    fetchItemCodesList();
  }, [ItemsList]);

  const convertTimeToDate = timeString => {
    if (!timeString) return null;

    // Assuming timeString is in "HH:mm AM/PM" format (e.g. "3:30 PM")
    const currentDate = new Date();
    const [hours, minutes] = timeString.split(':');

    const time = new Date(currentDate.setHours(hours, minutes.slice(0, 2)));

    return time;
  };

  useEffect(() => {
    if (formData) {
      const customer = customerList?.filter(
        user => user.id == formData.customer_id,
      );
      const selectedJob = customer ? customer[0] : [];
      if (selectedJob) {
        const fullName = formData?.customer_name || '';
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        setFirstName(firstName);
        setSuggestions(firstName);
        setLastName(lastName);
        setSelectCustomer(firstName + ' ' + lastName);
        setFirstName(firstName);
        setLastName(lastName);
        setSelectCustomer(firstName + ' ' + lastName || '');
        setPhone(selectedJob?.phone || '');
        setEmail(selectedJob?.email || '');
        setAddress(selectedJob?.address || '');

        setBusinessName(selectedJob?.business_name || '');
        setSource(selectedJob?.how_did_you_hear || '');
        setSelectedCustomerId(selectedJob?.id || '');
        setSiteName(formData?.site_name || '');
        setNotes(formData?.notes || '');
        setQuotationNo(formData?.quotation_no || '');
        setQuotationId(formData?.id || '');
        setStatus(formData?.status);
        if (formData?.category_type == 'storefront') {
          setStoreABN(formData?.ABN || '');
          setStorename(formData?.store_name || '');
          setStoreFrontAddress(formData?.category_address || '');
          if (formData?.storefront_job && formData.storefront_job.length > 0) {
            const storefrontJobData = formData.storefront_job.map(job => ({
              job: job.job || '',
              rotation: job.rotation || '',
              price: job.price || '',
              selectedStoreCode: job.ItemCode || '',
            }));

            // Update the storerows state with the extracted job data
            setStoreRows(storefrontJobData);
          }
          if (formData?.trading_hours_start) {
            setTimePick1(formData.trading_hours_start);
          } else {
            setTimePick1(null);
          }

          if (formData?.trading_hours_end) {
            setTimePick2(formData.trading_hours_end);
          } else {
            setTimePick2(null);
          }

          if (formData?.time_note_before) {
            setBeforeTime(formData.time_note_before);
          } else {
            setBeforeTime(null);
          }

          if (formData?.time_note_after) {
            setAfterTime(formData.time_note_after);
          } else {
            setAfterTime(null);
          }
        }
        if (formData?.category_type == 'commercial') {
          setCommercialAddress(formData?.category_address || '');
          setABN(formData?.ABN || '');
          setSiteName(formData?.site_name || '');
          if (formData?.swms && formData?.swms.length > 0) {
            const swmsData = formData.swms.map(swms => ({
              hazard: swms?.hazard || '',
              riskLevel: swms?.risk_level || '',
              riskInclude: swms?.risk_include || '',
              controlMeasure: swms?.control_measure || '',
              image: swms?.image ? {uri: swms_image_path + swms.image} : null,
            }));
            setSwmsRows(swmsData);
          } else {
            setSwmsRows([]);
          }
          if (formData?.commercial_job && formData?.commercial_job.length > 0) {
            const commercialJobData = formData.commercial_job.map(job => {
              const {job: jobName, timeEst, price, ItemCode} = job;

              const [hours, min] = timeEst ? timeEst.split(':') : ['', ''];
              return {
                setUp: jobName || '',
                hours: hours || '',
                min: min || '',
                timeEst: timeEst || '',
                price: price || '',
                selectedComCode: ItemCode || '',
              };
            });

            setRows(commercialJobData);
          }
        }
        if (formData?.category_type == 'residential') {
          setResidentialAddress(formData?.category_address || '');

          if (
            formData?.residential_job &&
            formData?.residential_job.length > 0
          ) {
            const residentialJobData = formData.residential_job.map(job => {
              const {job: jobName, timeEst, price, ItemCode} = job;

              const [hours, min] = timeEst ? timeEst.split(':') : ['', ''];
              return {
                setUp: jobName || '',
                hours: hours || '',
                min: min || '',
                timeEst: timeEst || '',
                price: price || '',
                selectedResCode: ItemCode || '',
              };
            });

            setResRows(residentialJobData);
          }
        }
        const checkboxesData = {
          residential: formData?.category_type?.includes('residential'),
          commercial: formData?.category_type?.includes('commercial'),
          storefront: formData?.category_type?.includes('storefront'),
        };
        const checkboxes = checkboxesData || {};

        const checkedCount = Object.values(checkboxes).filter(
          value => value,
        ).length;

        if (checkedCount > 1) {
          setIsCommercial(checkboxes.commercial && checkedCount === 1);
          setIsResidential(checkboxes.residential && checkedCount === 1);
          setIsStorefront(checkboxes.storefront && checkedCount === 1);
        } else {
          setIsCommercial(checkboxes.commercial);
          setIsResidential(checkboxes.residential);
          setIsStorefront(checkboxes.storefront);
        }

        setIsShowResidential(
          formData?.category_type?.includes('residential') || false,
        );
        setIsShowStorefront(
          formData?.category_type?.includes('storefront') || false,
        );
        setIsShowCommercial(
          formData?.category_type?.includes('commercial') || false,
        );
      }

      setSelectDropdownVisbile(false);
      setShowInfo(true);

      if (formData?.image && formData?.image.length > 0) {
        const imagePaths = formData?.image.map(img => img.path);
        const imageUrls = imagePaths.map(path => quote_image_path + path);
        setSelectedImage(imageUrls);
      } else {
        setSelectedImage([]);
      }
      setInitialFormValues({
        selectCustomer: firstName + ' ' + LastName,
        firstName: firstName,
        LastName: LastName,
        phone: phone,
        email: email,
        address: address,
        storeFrontAddress: storeFrontAddress,
        commercialAddress: commercialAddress,
        ResidentialAddress: ResidentialAddress,
        businessName: businessName,
        notes: notes,
        source: source,
        isResidential: isResidential,
        isStorefront: isStorefront,
        isCommercial: isCommercial,
        storeName: storeName,
        ABN: ABN,
        storeABN: storeABN,
        timePick1: timePick1,
        timePick2: timePick2,
        beforeTime: beforeTime,
        afterTime: afterTime,
        rows: rows,
        storerows: storerows,
        resrows: resrows,
        swmsRows: swmsRows,
        selectedImage: selectedImage,
        selectedImageArray: selectedImageArray,
        SiteName: SiteName,
        quotationNo: quotationNo,
        status: status,
      });
    }
  }, [formData, customerList, suggestions]);

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
    setRows([{setUp: '', hours: '', min: '', timeEst: '', price: ''}]);
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
    setStoreRows([{job: '', rotation: '', price: ''}]);
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
  };

  const handleOK = async () => {
    setModalToastVisible(false);
    resetFields();
    navigation.navigate('Quotes');
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
          setSelectedImage(prevImages => [...prevImages, newPhoto]);
          setSelectedImageArray(prevImages => [...prevImages, newPhoto1]);
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

          setSelectedImage(prevImages => [...prevImages, ...selectedImages]);
          setSelectedImageArray(prevImages => [
            ...prevImages,
            ...selectedImages1,
          ]);
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
    setTooltipMsg(selectedJob.Description);
    setResDropdownVisibleIndex(null);
    
  };
  const pricePerHour = UserData?.data?.rate;
  const calculatePrice = (hours, minutes) => {
    let totalHours = parseInt(hours) || 0;
    let totalMinutes = parseInt(minutes) || 0;

    // Convert minutes to a fraction of an hour
    let totalTimeInHours = totalHours + totalMinutes / 60;
    return totalTimeInHours * pricePerHour;
  };

  const handleResSelectHours = (index, hours) => {
    const updatedResRows = [...resrows];
    updatedResRows[index].hours = hours;

    // Create timeEst based on selected hours and minutes
    const min = updatedResRows[index]?.min || '00';
    updatedResRows[index].timeEst = `${hours.padStart(2, '0')}:${min}`;

    // Recalculate price based on selected hours and minutes
    const hourPrice = calculatePrice(
      updatedResRows[index]?.hours,
      updatedResRows[index]?.min,
    );
    updatedResRows[index].price = hourPrice.toString();

    setResRows(updatedResRows); // Update the rows
    setHoursDropdown(false);
  };

  const handleResSelectMin = (index, min) => {
    const updatedResRows = [...resrows];
    updatedResRows[index].min = min;

    // Create timeEst based on selected hours and minutes
    const hours = updatedResRows[index]?.hours || '01';
    updatedResRows[index].timeEst = `${hours.padStart(2, '0')}:${min}`;

    // Recalculate price based on selected hours and minutes
    const minPrice = calculatePrice(
      updatedResRows[index]?.hours,
      updatedResRows[index]?.min,
    );
    updatedResRows[index].price = minPrice.toString();

    setResRows(updatedResRows); // Update the rows state
    setMinDropdown(false);
  };

  const calculateComPrice = (hours, minutes) => {
    let totalHours = parseInt(hours) || 0; // Default to 0 if hours is NaN or empty
    let totalMinutes = parseInt(minutes) || 0; // Default to 0 if minutes is NaN or empty

    // Convert minutes to a fraction of an hour
    let totalTimeInHours = totalHours + totalMinutes / 60;

    // Calculate price
    return totalTimeInHours * pricePerHour;
  };

  const handleComSelectHours = (index, hours) => {
    const updatedComRows = [...rows];
    updatedComRows[index].hours = hours;
    const minutes = updatedComRows[index]?.min || '00';
    updatedComRows[index].timeEst = `${hours.padStart(
      2,
      '0',
    )}:${minutes.padStart(2, '0')}`;
    const hourPrice = calculateComPrice(
      updatedComRows[index]?.hours,
      updatedComRows[index]?.min,
    );
    updatedComRows[index].price = hourPrice.toString();
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
    const minPrice = calculateComPrice(
      updatedComRows[index]?.hours,
      updatedComRows[index]?.min,
    );
    updatedComRows[index].price = minPrice.toString();
    setRows(updatedComRows);
    setComMinDropdown(false);
  };

  const handleComSelectJob = (index, selectedJob) => {
    Keyboard.dismiss();
    const updatedResRows = [...rows];
    updatedResRows[index].setUp = selectedJob?.Name;
    updatedResRows[index].selectedComCode = selectedJob?.Code;
    setRows(updatedResRows);
    setTooltipMsg1(selectedJob.Description);
    setDropdownVisibleIndex(false);
  };
  const handleSelectStoreFrontJob = (index, selectedJob) => {
    const updatedStoreRows = [...storerows];
    updatedStoreRows[index].job = selectedJob?.Name;
    updatedStoreRows[index].selectedStoreCode = selectedJob?.Code;
    setStoreRows(updatedStoreRows);
    setTooltipMsg3(selectedJob.Description);
    setDropdownVisibleIndex(false);
  };
  const handleSelectRotation = (index, selectedRotation) => {
    const updatedStoreRows = [...storerows];
    updatedStoreRows[index].rotation = selectedRotation;
    setStoreRows(updatedStoreRows);
    setRotationDropdownVisibleIndex(false);
  };

  const handleAddRow = () => {
    setRows([...rows, {job: '', rotation: '', price: ''}]);
  };
  const handleDeleteRow = index => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };
  const handleAddStoreRow = () => {
    setStoreRows([...storerows, {job: '', rotation: '', price: ''}]);
  };
  const handleDeleteStoreRow = index => {
    const updatedStoreRows = storerows.filter(
      (_, rowIndex) => rowIndex !== index,
    );
    setStoreRows(updatedStoreRows);
  };
  const handleAddResRow = () => {
    setResRows([...resrows, {setUp: '', timeEst: '', price: ''}]);
  };

  const handleDeleteResRow = index => {
    const updatedResRows = resrows.filter((_, rowIndex) => rowIndex !== index);
    setResRows(updatedResRows);
  };

  //  SWMS functions
  const handleAddSWMSRow = () => {
    setSwmsRows([...swmsRows, {hazard: '', riskLevel: '', image: null}]);
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
      updatedRows[index][field] = formatRiskLevel(value?.level);
      updatedRows[index].controlMeasure = value?.control_measure || '';
    } else {
      updatedRows[index].riskLevel = '';
      updatedRows[index].controlMeasure = '';
      updatedRows[index][field] = value?.name || '';
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

    dispatch(GetRiskLevelsApi({token: token, id: user_id}));
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

  const isFormDataChanged = () => {
    const currentValues = {
      selectCustomer: selectCustomer,
      firstName: firstName,
      LastName: LastName,
      phone: phone,
      email: email,
      address: address,
      storeFrontAddress: storeFrontAddress,
      commercialAddress: commercialAddress,
      ResidentialAddress: ResidentialAddress,
      businessName: businessName,
      notes: notes,
      source: source,
      isResidential: isResidential,
      isStorefront: isStorefront,
      isCommercial: isCommercial,
      storeName: storeName,
      ABN: ABN,
      storeABN: storeABN,
      timePick1: timePick1,
      timePick2: timePick2,
      beforeTime: beforeTime,
      afterTime: afterTime,
      rows: rows,
      storerows: storerows,
      resrows: resrows,
      swmsRows: swmsRows,
      selectedImage: selectedImage,
      selectedImageArray: selectedImageArray,
      SiteName: SiteName,
      quotationNo: quotationNo,
      status: status,
    };

    return JSON.stringify(initialFormValues) !== JSON.stringify(currentValues);
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
    formattedBeforeTime, // 👈 Add this
    formattedAfterTime, // 👈 Add this
    formattedTradingStart, // 👈 Add this
    formattedTradingEnd, // 👈 Add this
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
      setFormErrors(errors); // ← Already an array!
      setValidationErrorModal(true);
      return;
    }

    setFormErrors([]);

    const formData = new FormData();
    const token = LoginData.token;
    const id = LoginData?.user?.id;
    formData.append('franchise_id', id);
    formData.append('customer_id', selectedCustomerId);
    formData.append('notes', notes);
    formData.append('quotation_no', quotationNo);
    formData.append('customer_name', firstName + ' ' + LastName);
    formData.append('customer_phone', phone);
    formData.append('customer_email', email);
    formData.append('status', status);

    if (isResidential) {
      formData.append('category_type', 'residential');
      formData.append('category_address', ResidentialAddress);
      formData.append('BrandingThemeID', residentialBrandingThemeID);
      // formData.append('ItemCode', selectedResCode);

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
      // formData.append('ItemCode', selectedStoreCode);
      const formattedBeforeTime = beforeTime ? beforeTime : '';
      const formattedAfterTime = afterTime ? afterTime : '';
      const formattedTradingStart = timePick1 ? timePick1 : '';
      const formattedTradingEnd = timePick2 ? timePick2 : '';

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
      // formData.append('ItemCode', selectedComCode);

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

      // Loop to add SWMS data
      const swmsData = swmsRows.reduce((acc, row, index) => {
        acc[`swms[${index}][hazard]`] = row.hazard;
        acc[`swms[${index}][risk_level]`] = row.riskLevel;
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
    selectedImage.forEach((imageUrl, index) => {
      const fileName = imageUrl.split('/').pop();

      const fileExtension = fileName.split('.').pop();

      let mimeType = '';
      switch (fileExtension) {
        case 'jpg':
        case 'jpeg':
          mimeType = 'image/jpeg';
          break;
        case 'png':
          mimeType = 'image/png';
          break;
        case 'gif':
          mimeType = 'image/gif';
          break;
        default:
          mimeType = 'application/octet-stream';
      }
      formData.append(`image[${index}]`, {
        uri: imageUrl,
        type: mimeType,
        name: fileName,
      });
    });

    dispatch(EditQuoteApi({formData, quotationId})).then(res => {
      if (res.payload.status === true) {
        dispatch(GetQuotationListApi({token, id}));
        setModalToastVisible(true);

        setTimeout(() => {
          handleOK();
        }, 1000);
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
    console.log(index);
    
    setResDropdownVisibleIndex(
      resDropdownVisibleIndex === index ? null : index,
    );
    setSelectDropdownVisbile(false);
    setIsSourceDropdown(false);
    setSwmsDropdownVisibleIndex(false);
    setRotationDropdownVisibleIndex(false);
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
  };
  const clearHazard = index => {
    const updatedRows = [...swmsRows];
    updatedRows[index].hazard = '';
    setSwmsRows(updatedRows);
    setSwmsDropdownVisibleIndex(index);
  };

  const showTooltip = () => {
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 2000);
  };
  const showTooltip1 = () => {
    setTooltipVisible1(true);
    setTimeout(() => {
      setTooltipVisible1(false);
    }, 2000);
  };
  const showTooltip3 = () => {
    setTooltipVisible3(true);
    setTimeout(() => {
      setTooltipVisible3(false);
    }, 2000);
  };
  const handlebackNavigate = () => {
    setInitialFormValues(null);
    navigation.navigate('Quotes');
  };
  const handleDashbackNavigate = () => {
    setInitialFormValues(null);
    navigation.navigate('Dashboard');
  };

  const backButtonPress = () => {
    if (isFormDataChanged()) {
      Alert.alert(
        'Save Changes?',
        'You have unsaved changes. Do you want to save them before leaving?',
        [
          {
            text: 'Exit',
            style: 'cancel',
            onPress: handlebackNavigate,
          },
          {
            text: 'Save',
            onPress: () => {
              handleSubmit().then(() => navigation.navigate('Quotes'));
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      navigation.navigate('Quotes');
    }
  };
  const logoIcon = () => {
    if (isFormDataChanged()) {
      Alert.alert(
        'Save Changes?',
        'You have unsaved changes. Do you want to save them before leaving?',
        [
          {
            text: 'Exit',
            style: 'cancel',
            onPress: handleDashbackNavigate,
          },
          {
            text: 'Save',
            onPress: () => {
              handleSubmit().then(() => navigation.navigate('Dashboard'));
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      navigation.navigate('Dashboard');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={CreateQuoteStyle.container}>
      <Header2
        backButton={true}
        backButtonPress={backButtonPress}
        logoIcon={logoIcon}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={CreateQuoteStyle.contentContainer}
        keyboardShouldPersistTaps="always">
        <Pressable onPress={handleCloseAllDropdown}>
          <Text style={CreateQuoteStyle.title}>Edit Quote</Text>

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
            editQuote={editQuote}
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
            swmsRows={swmsRows}
            toggleSwmsDropdown={toggleSwmsDropdown}
            hazardOptions={hazardOptions}
            selectHazard={selectHazard}
            handleSwmsInputChange={handleSwmsInputChange}
            handleSwmsImageRemove={handleSwmsImageRemove}
            openSwmsModal={openSwmsModal}
            handleAddSWMSRow={handleAddSWMSRow}
            handleDeleteSWMSRow={handleDeleteSWMSRow}
            handleCloseAllDropdown={handleCloseAllDropdown}
            SwmsDropdownVisibleIndex={SwmsDropdownVisibleIndex}
            toggleSwmsRiskLevelDropdown={toggleSwmsRiskLevelDropdown}
            SwmsRiskLevelDropdownVisibleIndex={
              SwmsRiskLevelDropdownVisibleIndex
            }
            selectSwmsRiskLevel={selectSwmsRiskLevel}
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
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={CreateQuoteStyle.selectimageCont}
                onPress={() => {
                  setModalVisible(true);
                  handleCloseAllDropdown();
                }}>
                <VectorIcon
                  icon="FontAwesome"
                  name="camera"
                  size={20}
                  color={Colors.blue_theme_Color}
                />
                <Text style={{marginLeft: 5, color: Colors.white_text_color}}>
                  Pick an Image
                </Text>
              </TouchableOpacity>
            </View>
            {selectedImage?.length > 0 && (
              <View style={CreateQuoteStyle.imageRowContainer}>
                {selectedImage?.map((imageUri, index) => (
                  <View key={index} style={CreateQuoteStyle.imageContainer}>
                    <Image
                      source={{uri: imageUri}}
                      resizeMode="contain"
                      style={CreateQuoteStyle.imageBottom}
                    />
                    <TouchableOpacity
                      style={CreateQuoteStyle.iconHoverOnImage}
                      onPress={() => handleImageRemove(index)}>
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
            onPress={handleSubmit}>
            Save Changes
          </Button>
        </Pressable>
      </ScrollView>

      {/* Calendar Modal */}

      {isCalendarOpen && (
        <View style={CreateQuoteStyle.modalBackground}>
          <TouchableWithoutFeedback onPress={() => setCalendarOpen(false)}>
            <View style={CreateQuoteStyle.modalBackground}>
              <View style={CreateQuoteStyle.calendarModal}>
                <Calendar
                  onDayPress={day => handleDateSelect(day)} // Pass the full day object
                />
                <TouchableOpacity
                  style={CreateQuoteStyle.closeModalButton}
                  onPress={() => setCalendarOpen(false)}>
                  <Text style={{color: 'white'}}>Close</Text>
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
        message={tooltipMsg}
        onClose={() => setTooltipVisible(false)}
      />

      <TooltipModal
        visible={tooltipVisible1}
        message={tooltipMsg1}
        onClose={() => setTooltipVisible1(false)}
      />
      <TooltipModal
        visible={tooltipVisible2}
        message={tooltipMsg2}
        onClose={() => setTooltipVisible2(false)}
      />
      <TooltipModal
        visible={tooltipVisible3}
        message={tooltipMsg3}
        onClose={() => setTooltipVisible3(false)}
      />

      <ValidationErrorModal
        visible={validationErrorModal}
        errors={formErrors}
        onClose={() => setValidationErrorModal(false)}
      />

      {EditQuoteLoading && (
        <View style={CreateQuoteStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default EditQuote;
