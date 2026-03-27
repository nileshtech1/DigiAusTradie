import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import {Checkbox, Button} from 'react-native-paper';
import Header from '../../../ReusableComponent/Header';
import CustomTextInput from '../../../ReusableComponent/CustomTextInput';
import Colors from '../../../Assets/Style/Color';
import ConfirmationAlert from '../../../ReusableComponent/ConfirmationAlert';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import FollowUpForm from '../Create Quote/FollowUpSection';
import CreateQuoteStyle from '../../../utils/Stylesheet/CreateQuoteStyle';
import Geolocation from '@react-native-community/geolocation';
import {Calendar} from 'react-native-calendars';
import axios from 'axios';
import BottomSheetModal from '../../../ReusableComponent/BottomSheetModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {CreateCustomerApi} from '../../../Redux/API/CreateCustomerApi';
import {GetCustomerListApi} from '../../../Redux/API/GetCustomerListApi';
import NewContactStyle from '../../../utils/Stylesheet/NewContactStyle';
import SmsAlertModal from '../../../ReusableComponent/SmsAlertModal';
import {CreateScheduleApi} from '../../../Redux/API/CreateScheduleApi';
import {GetScheduleApi} from '../../../Redux/API/GetScheduleApi';
import {
  GOOGLE_GEOCODE_API_KEY,
  GOOGLE_PLACES_API_KEY,
} from '../../../config/googleMapsConfig';

const successAnimation = require('../../../Assets/Images/LottieAnimation/loginsuccessful.json');

const NewContact = ({navigation}) => {
  // States for checkboxes
  const [isResidential, setIsResidential] = useState(false);
  const [isStorefront, setIsStorefront] = useState(false);
  const [isCommercial, setIsCommercial] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);
  const [isModalToastVisible, setModalToastVisible] = useState(false);
  const [supplierModalTastVisible, setSupplierModalTastVisible] = useState(false);
  const [followUpDate, setFollowUpDate] = useState(null);
  const [followUpTime, setFollowUpTime] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedImageArray, setSelectedImageArray] = useState([]);
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [referral, setReferral] = useState('');
  const [isQuote, setIsQuote] = useState(false);
  const [isMeeting, setIsMeeting] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [notes, setNotes] = useState('');
  const [source, setSource] = useState('');
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [franchiseId, setFranchiseId] = useState(null);
  const [selectCustomer, setSelectCustomer] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [showTopModal, setShowTopModal] = useState(false);
  const [selectDropdownVisbile, setSelectDropdownVisbile] = useState(false);
  const [selectCustDropdownVisbile, setSelectCustDropdownVisbile] =
    useState(false);
  const {CreateCustomerLoading} = useSelector(state => state.CreateCustomer);
  const {CustomerList} = useSelector(state => state.CustomerList);
  const {LoginData} = useSelector(state => state.Login);
  const dispatch = useDispatch();
  // Static data for "How did you hear about us"
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
      setCustomerList(CustomerList?.franchise_customer);
    };
    fetchCustomerList();
  }, [CustomerList]);

  const toggleSelectCustomer = () => {
    setSelectCustDropdownVisbile(
      selectCustDropdownVisbile === true ? false : true,
    );
    setSelectDropdownVisbile(false);
  };
  const handleSelectJob = selectedJob => {
    if (selectedJob) {
      const Name = selectedJob?.first_name + ' ' + selectedJob?.last_name;
      const id = selectedJob?.id;
      setSelectCustomer(Name);
      setReferral(id);
      setSelectCustDropdownVisbile(false);
    }
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const generateMessage = (customerFirstName, franchiseeName) => {
    return `Hi ${customerFirstName},  
  This is ${franchiseeName} from JH Group Cleaning Services.  
  Thank you for connecting with me. Please find my contact details below so you can save them directly to your phone.
  
  We use this messaging service only for direct communication regarding your appointments or information we would text you about anyway — we don’t use it for marketing purposes.
  
  However, if you’d like to stop receiving texts, please reply STOP and we’ll just have to manually text you the old-fashioned way.
  
  Cheers,  
  ${franchiseeName}  
  JH Group Cleaning Services`;
  };

  const sendSMS = (phone, message) => {
    const url = `sms:${phone}?body=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(err =>
      console.error('Error launching SMS', err),
    );
  };
  const sendSmsNow = () => {
    setShowTopModal(false);
    const message = generateMessage(firstName, LoginData?.user?.first_name);
    sendSMS(phone, message);

    if (isSupplier) {
      setSupplierModalTastVisible(true);
    } else {
      setModalToastVisible(true);
    }
  };

  const onSmsModalClose = () => {
    setShowTopModal(false);

    if (isSupplier) {
      setSupplierModalTastVisible(true);
    } else {
      setModalToastVisible(true);
    }
  };

  const onPressOk = () => {
    setShowTopModal(false);
    const formData = {
      firstName,
      LastName,
      phone,
      email,
      address,
      businessName,
      notes,
      source,
      followUpDate,
      followUpTime,
      checkboxes: {
        residential: isResidential,
        storefront: isStorefront,
        commercial: isCommercial,
        Supplier: isSupplier,
      },
    };
    
    resetFormFields();
    navigation.navigate('Create Quote', {formData});
    setModalToastVisible(false);
  };

  const closeModal = () => {
    setSupplierModalTastVisible(false);
    setShowTopModal(false);
    resetFormFields();
    navigation.navigate('Dashboard');
    setModalToastVisible(false);
  };
  const resetFormFields = () => {
    setIsResidential(false);
    setIsStorefront(false);
    setIsCommercial(false);
    setIsSupplier(false);
    setFollowUpDate(null);
    setFollowUpTime(null);
    setLocation('');
    setSuggestions([]);
    setIsFetching(false);
    setModalVisible(false);
    setSelectedImage([]);
    setSelectedImageArray([]);
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setBusinessName('');
    setNotes('');
    setSource('');
    setSelectDropdownVisbile(false);
    setCalendarOpen(false);
    setErrors({});
    setIsQuote(false);
    setIsMeeting(false);
  };

  useEffect(() => {
    const fetchFranchiseId = async () => {
      try {
        const user = await AsyncStorage.getItem('User');
        const parsedUser = await JSON.parse(user);
        if (parsedUser?.id !== null) {
          setFranchiseId(parsedUser?.id);
        }
      } catch (error) {
        console.error('Error fetching franchise_id from AsyncStorage', error);
      }
    };
    fetchFranchiseId();
  }, []);

  const validateForm = () => {
    const errors = {};
  
    if (!firstName) errors.firstName = 'First Name is required';
    if (!LastName) errors.lastName = 'Last Name is required';
    if (!phone) {
      errors.phone = 'Phone is required';
    } else {
      const ausPhoneRegex = /^(?:\+?61|0)[2-478]\d{8}$/;
  
      if (!ausPhoneRegex.test(phone)) {
        errors.phone = 'Please enter a valid Australian contact number';
      }
    }
  
    if (!email) errors.email = 'Email is required';
    if (!source) errors.source = 'Source is required';
  
    if ((isStorefront || isCommercial || isSupplier) && !businessName) {
      errors.businessName = 'Business Name is required';
    }
  
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }
  
    setErrors({});
    return true;
  };
  

  const clearSource = () => {
    setSource('');
    setSelectDropdownVisbile(true);
  };
  const clearCusomer = () =>{
    setSelectCustomer('')
    setSelectCustDropdownVisbile(true)
  }

  const handleInputChange = (field, value) => {
    setErrors(prevErrors => {
      const newErrors = {...prevErrors};
      delete newErrors[field];
      return newErrors;
    });

    switch (field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'source':
        setSource(value);
        break;
      case 'businessName':
        setBusinessName(value);
        break;
      default:
        break;
    }
  };

  const parseTime12Hour = timeString => {
    const timeRegex = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
    const match = timeRegex.exec(timeString);

    if (!match) {
      console.error(
        `Error parsing time string: "${timeString}". Expected format "H:MM AM" or "HH:MM PM".`,
      );
      return null;
    }

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
      console.error(
        `Error parsing time string: "${timeString}". Invalid hour or minute value.`,
      );
      return null;
    }

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    return {hours, minutes};
  };

  const formatTime12Hour = (hours24, minutes) => {
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    let hours12 = hours24 % 12;
    hours12 = hours12 ? hours12 : 12;

    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${hours12}:${paddedMinutes} ${ampm}`;
  };

  const calculateEndTime = startTimeString => {
    const parsedTime = parseTime12Hour(startTimeString);

    if (!parsedTime) {
      return null;
    }

    const dummyYear = 2000;
    const dummyMonth = 0;
    const dummyDay = 1;

    const dateObj = new Date(
      dummyYear,
      dummyMonth,
      dummyDay,
      parsedTime.hours,
      parsedTime.minutes,
      0,
    );

    dateObj.setMinutes(dateObj.getMinutes() + 60);

    const endHours24 = dateObj.getHours();
    const endMinutes = dateObj.getMinutes();

    return formatTime12Hour(endHours24, endMinutes);
  };

  const createQuoteOrMeeting = async () => {
    const id = LoginData?.user?.id;
    const token = LoginData.token;
    const franchiseid = {franchise_id: id};

    let postData = {};

    if (!followUpTime) {
      console.error('followUpTime is not defined or is empty.');
      return;
    }

    const calculatedEndTime = calculateEndTime(followUpTime);

    if (isQuote) {
      postData = {
        franchise_id: id,
        quotation_id: '',
        customer_id: '',
        customer_name: 'Quote',
        customer_address: address,
        date: followUpDate,
        start_time: followUpTime,
        end_time: calculatedEndTime,
        type: 'Quote',
      };
    } else if (isMeeting) {
      postData = {
        franchise_id: id,
        quotation_id: '',
        customer_id: '',
        customer_name: 'Meeting',
        customer_address: address,
        date: followUpDate,
        start_time: followUpTime,
        end_time: calculatedEndTime,
        type: 'Meeting',
      };
    }

    if (calculatedEndTime === null) {
      console.warn(
        'End time could not be calculated. API call skipped or handled differently.',
      );
      return;
    }

    const res = await dispatch(CreateScheduleApi(postData));
    if (res.payload?.status === true) {
      dispatch(GetScheduleApi({token, franchiseid}));
    }
  };

  const handleSubmit = async () => {
    const loginDataString = await AsyncStorage.getItem('User');
      const loginDetails = JSON.parse(loginDataString);
    const token = LoginData?.token;
    const id = loginDetails?.id;
    
    
    if (validateForm()) {
      const contactCategory = [];
      if (isStorefront) contactCategory.push('storefront');
      if (isResidential) contactCategory.push('residential');
      if (isCommercial) contactCategory.push('commercial');
      if (isSupplier) contactCategory.push('supplier');

      // Create FormData
      const formData = new FormData();
      formData.append('franchise_id', id);

      // Append contactCategory values correctly
      contactCategory.forEach((category, index) => {
        formData.append(`contact_category[${index}]`, category);
      });

      formData.append('first_name', firstName);
      formData.append('last_name', LastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('business_name', businessName);
      formData.append('how_did_you_hear', source);
      formData.append('referral', referral);
      formData.append('date', followUpDate);
      formData.append('time', followUpTime);
      formData.append('location', location);

      selectedImageArray.forEach((image, index) => {
        formData.append(`images[${index}]`, {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      });

      formData.append('status', 'active');
      const franchiseid = {
        franchise_id: id,
      };
      
      
      dispatch(CreateCustomerApi(formData))
        .then(data => {
          if (data?.payload?.status === true) {
            // setShowTopModal(true);
            if (isSupplier) {
              setSupplierModalTastVisible(true);
            } else {
              setModalToastVisible(true);
            }
            if (isQuote || isMeeting) {
              createQuoteOrMeeting();
            }
            setTimeout(() => {
              dispatch(GetCustomerListApi({token, franchiseid}));
            }, 2000);
          }
        })
        .catch(error => {
          console.error('Error in API request:', error);
        });
    }
  };

  const handleQuotePress = () => {
    setIsQuote(true);
    setIsMeeting(false);
  };

  const handleMeetingPress = () => {
    setIsMeeting(true);
    setIsQuote(false);
  };

  const toggleSource = () => {
    setSelectDropdownVisbile(selectDropdownVisbile === true ? false : true);
    setSelectCustDropdownVisbile(false);
  };
  const closeDropdown = () => {
    setSelectDropdownVisbile(false);
  };
  const handleSourceSelect = selectedSource => {
    Keyboard.dismiss();
    setSource(selectedSource);
    if (selectedSource === 'Referral') {
      setShow(true);
    } else {
      setShow(false);
      setSelectCustomer('');
    }

    setErrors(prevErrors => {
      const newErrors = {...prevErrors};
      delete newErrors.source;
      return newErrors;
    });

    setSelectDropdownVisbile(!selectDropdownVisbile);
  };

  const handleTimeSelect = time => {
    const formattedTime = new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setFollowUpTime(formattedTime);
    setTimePickerOpen(false);
  };

  const handleTakePhoto = async () => {
    // Ask for camera permission at runtime (Android 6+)
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
  
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Camera permission denied');
        return;
      }
    }
  
    setModalVisible(false);
  
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true, // optional
      },
      response => {
        if (response.didCancel) {
          // console.log('User cancelled camera');
        } else if (response.errorCode) {
          // console.log('Camera Error:', response.errorCode, response.errorMessage);
          Alert.alert('Camera Error', response.errorMessage || 'Unable to open camera.');
        } else if (response.assets && response.assets.length > 0) {
          const image = response.assets[0];
          const imageSize = image.fileSize;
          const imageUri = image.uri;
          const imageExtension = imageUri.split('.').pop().toLowerCase();
  
          if (imageSize > 2 * 1024 * 1024) {
            Alert.alert('Image size exceeds 2 MB. Please choose a smaller image.');
          } else if (!['jpg', 'jpeg', 'png'].includes(imageExtension)) {
            Alert.alert('Invalid image format. Only JPG, JPEG, and PNG are allowed.');
          } else {
            const newPhoto = image.uri;
            setSelectedImage(prevImages => [...prevImages, newPhoto]);
            setSelectedImageArray(prevImages => [...prevImages, image]);
          }
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
          response.assets.forEach(image => {
            const imageSize = image.fileSize;
            const imageUri = image.uri;
            const imageExtension = imageUri.split('.').pop().toLowerCase();

            if (imageSize > 2 * 1024 * 1024) {
              Alert.alert(
                'Image size exceeds 2 MB. Please choose a smaller image.',
              );
            } else if (!['jpg', 'jpeg', 'png'].includes(imageExtension)) {
              Alert.alert(
                'Invalid image format. Only JPG, JPEG, and PNG are allowed.',
              );
            } else {
              const selectedImageUri = image.uri;
              setSelectedImage(prevUrls => [...prevUrls, selectedImageUri]);
              setSelectedImageArray(prevImages => [...prevImages, image]);
            }
          });
        }
      },
    );
  };
  const fetchLocationSuggestions = async query => {
    if (!query) return;

    if (!GOOGLE_PLACES_API_KEY) {
      setSuggestions([]);
      return;
    }

    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${GOOGLE_PLACES_API_KEY}`;

    try {
      setIsFetching(true);
      const response = await axios.get(endpoint);
      if (response.data && response.data.predictions) {
        setSuggestions(response.data.predictions);
      }
      setIsFetching(false);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setIsFetching(false);
    }
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
  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation(`Lat: ${latitude}, Lon: ${longitude}`);

        if (!GOOGLE_GEOCODE_API_KEY) {
          Alert.alert(
            'Missing Google Maps API key',
            'Set the Google geocoding key before using current location.',
          );
          return;
        }

        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_GEOCODE_API_KEY}`;

        axios
          .get(geocodeUrl)
          .then(response => response.json())
          .then(data => {
            if (data.status === 'OK') {
              const address = data.results[0].formatted_address;
              setLocation(
                `Lat: ${latitude}, Lon: ${longitude}, Address: ${address}`,
              );
            } else {
              Alert.alert('Error', 'Unable to fetch address.');
            }
          })
          .catch(error => {
            Alert.alert('Error', 'Unable to fetch address. Please try again.');
          });
      },
      error => {
        Alert.alert('Error', 'Unable to fetch location. Please try again.');
      },
    );
  };
  const handleSelectLocation = place => {
    setLocation(place.description);
    setSuggestions([]);
  };
  const handleImageRemove = index => {
    setSelectedImage(prevImages => prevImages?.filter((_, i) => i !== index));
  };
  const handleCloseAllDropdown = () => {};
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={NewContactStyle.container}>
      <Header notificationIcon={true} />
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={NewContactStyle.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => setSelectDropdownVisbile(false)}>
          <Text style={NewContactStyle.title}>Add New Contact</Text>

          {/* Checkboxes */}
          <View style={NewContactStyle.checkboxGroup}>
            <View style={NewContactStyle.checkboxContainer}>
              <Checkbox.Android
                status={isResidential ? 'checked' : 'unchecked'}
                onPress={() => setIsResidential(!isResidential)}
                color="#ffffff"
                uncheckedColor="#ffffff"
              />
              <Text style={NewContactStyle.CheckBoxLabel}>Residential</Text>
            </View>
            <View style={NewContactStyle.checkboxContainer}>
              <Checkbox.Android
                status={isStorefront ? 'checked' : 'unchecked'}
                onPress={() => setIsStorefront(!isStorefront)}
                color="white"
                uncheckedColor="white"
              />
              <Text style={NewContactStyle.CheckBoxLabel}>Storefront</Text>
            </View>
            <View style={NewContactStyle.checkboxContainer}>
              <Checkbox.Android
                status={isCommercial ? 'checked' : 'unchecked'}
                onPress={() => setIsCommercial(!isCommercial)}
                color="white"
                uncheckedColor="white"
              />
              <Text style={NewContactStyle.CheckBoxLabel}>Commercial</Text>
            </View>
            <View style={NewContactStyle.checkboxContainer}>
              <Checkbox.Android
                status={isSupplier ? 'checked' : 'unchecked'}
                onPress={() => setIsSupplier(!isSupplier)}
                color="white"
                uncheckedColor="white"
              />
              <Text style={NewContactStyle.CheckBoxLabel}>Supplier</Text>
            </View>
          </View>

          {/* Form Fields */}
          <View style={{flexDirection: 'row'}}>
            <CustomTextInput
              label="First Name"
              placeholder="First name"
              icon="account"
              value={firstName}
              required={true}
              onFocus={() => closeDropdown()}
              onChangeText={value => handleInputChange('firstName', value)}
              error={!!errors.firstName}
              errorMessage={errors.firstName}
            />
            <Text>''</Text>
            <CustomTextInput
              label="Last Name"
              placeholder="Last name"
              icon="account"
              value={LastName}
              required={true}
              onFocus={() => closeDropdown()}
              onChangeText={value => handleInputChange('lastName', value)}
              error={!!errors.lastName}
              errorMessage={errors.lastName}
            />
          </View>
          <CustomTextInput
            label="Phone"
            placeholder="Enter phone number"
            icon="phone"
            keyboardType="numeric"
            value={phone}
            required={true}
            onFocus={() => closeDropdown()}
            onChangeText={value => handleInputChange('phone', value)}
            error={!!errors.phone}
            errorMessage={errors.phone}
          />
          <CustomTextInput
            label="Email"
            placeholder="Enter email address"
            icon="email"
            value={email}
            required={true}
            onFocus={() => closeDropdown()}
            onChangeText={value => handleInputChange('email', value)}
            error={!!errors.email}
            errorMessage={errors.email}
          />
          <CustomTextInput
            label="Address"
            placeholder="Enter address"
            icon="map-marker"
            value={address}
            onFocus={() => closeDropdown()}
            onChangeText={setAddress}
          />
          {(isStorefront || isCommercial || isSupplier) && (
            <CustomTextInput
              label="Business Name"
              placeholder="Enter business name"
              icon="briefcase"
              value={businessName}
              onFocus={() => closeDropdown()}
              required={isCommercial || isStorefront ? true : false}
              onChangeText={value => handleInputChange('businessName', value)}
              error={!!errors.businessName}
              errorMessage={errors.businessName}
            />
          )}

          <View style={NewContactStyle.dropdownWrapper}>
            <Text style={NewContactStyle.label}>How did you hear about us <Text style={NewContactStyle.asterisk}>*</Text></Text>

            <TouchableOpacity
              style={[
                NewContactStyle.inputWithIcon,
                errors.source && NewContactStyle.inputError,
              ]}
              onPress={toggleSource}>
              <VectorIcon
                icon="FontAwesome"
                name="bullhorn"
                style={NewContactStyle.iconMargin}
                size={20}
                color={Colors.blue_theme_Color}
              />

              <TextInput
                placeholder="Specific reference.."
                placeholderTextColor={Colors.gray_text_color}
                value={source} // Display selected label
                onChangeText={value => handleInputChange('source', value)}
                editable={false}
                onFocus={toggleSource}
                style={{
                  marginLeft: 15,
                  flex: 1,
                  color: Colors.white_text_color,
                }}
              />
              {source && (
                <TouchableOpacity onPress={clearSource}>
                  <VectorIcon
                    icon="Entypo"
                    name="cross"
                    style={NewContactStyle.crossIcon}
                    size={20}
                    color={Colors.blue_theme_Color}
                  />
                </TouchableOpacity>
              )}
                <VectorIcon
            icon="FontAwesome"
            name={selectDropdownVisbile ? "angle-up" : "angle-down"}
            style={NewContactStyle.dropdownArrowIcon}
            size={20}
            color={Colors.blue_theme_Color}
          />
        </TouchableOpacity>

            {selectDropdownVisbile && (
              <View style={NewContactStyle.dropdown}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps="always">
                  {sources.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSourceSelect(option.label)}
                      style={NewContactStyle.dropdownItem}>
                      <Text style={NewContactStyle.dropdownText}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  onPress={() => setSelectDropdownVisbile(false)}
                  style={NewContactStyle.cancelButton}>
                  <Text style={NewContactStyle.cancelText}>Close</Text>
                </TouchableOpacity>
              </View>
            )}

            {errors.source && (
              <Text style={NewContactStyle.errorText}>{errors.source}</Text>
            )}
          </View>
          {show && (
            <View style={NewContactStyle.dropdownWrapper}>
              <Text style={NewContactStyle.label}>
                Select a referral contact
              </Text>
              <TouchableOpacity
                style={{...NewContactStyle.inputWithIcon}}
                onPress={() => toggleSelectCustomer()}>
                <VectorIcon
                  icon="FontAwesome"
                  name="user"
                  style={NewContactStyle.iconMargin}
                  size={20}
                  color={Colors.blue_theme_Color}
                />
                <TextInput
                  placeholder="Select a referral contact"
                  placeholderTextColor={Colors.white_text_color}
                  value={selectCustomer}
                  onChangeText={setSelectCustomer}
                  onFocus={() => toggleSelectCustomer()}
                  style={{
                    marginLeft: 10,
                    flex: 1,
                    color: Colors.white_text_color,
                  }}
                />
                 {selectCustomer && (
                <TouchableOpacity onPress={clearCusomer}>
                  <VectorIcon
                    icon="Entypo"
                    name="cross"
                    style={NewContactStyle.crossIcon}
                    size={20}
                    color={Colors.blue_theme_Color}
                  />
                </TouchableOpacity>
              )}
                <VectorIcon
            icon="FontAwesome"
            name={selectCustDropdownVisbile ? "angle-up" : "angle-down"}
            style={NewContactStyle.dropdownArrowIcon}
            size={20}
            color={Colors.blue_theme_Color}
          />
              </TouchableOpacity>
              {selectCustDropdownVisbile && (
                <View style={NewContactStyle.dropdown}>
                <ScrollView
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always">
                  {customerList
                    ?.filter(
                      option =>
                        `${option.first_name} ${option.last_name}`
                          .toLowerCase()
                          .includes(selectCustomer.toLowerCase()) ||
                        option.email
                          .toLowerCase()
                          .includes(selectCustomer.toLowerCase()),
                    )
                    .map((option, optionIndex) => (
                      <TouchableOpacity
                        key={optionIndex}
                        onPress={() => handleSelectJob(option)}
                        style={NewContactStyle.dropdownItem}>
                        <Text style={NewContactStyle.dropdownText}>
                          {`${option.first_name} ${option.last_name} - ${option.email}`}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
                   <TouchableOpacity
                  onPress={() => setSelectCustDropdownVisbile(false)}
                  style={NewContactStyle.cancelButton}>
                  <Text style={NewContactStyle.cancelText}>Close</Text>
                </TouchableOpacity>
                </View>
              )}
              
            </View>
          )}

          <View>
            <FollowUpForm
              followUpDate={followUpDate}
              followUpTime={followUpTime}
              location={location}
              suggestions={suggestions}
              isFetching={isFetching}
              isMeeting={isMeeting}
              isQuote={isQuote}
              handleQuotePress={handleQuotePress}
              handleMeetingPress={handleMeetingPress}
              handleTimeSelect={handleTimeSelect}
              setFollowUpDate={setFollowUpDate}
              setCalendarOpen={setCalendarOpen}
              setFollowUpTime={setFollowUpTime}
              setLocation={setLocation}
              fetchLocationSuggestions={fetchLocationSuggestions}
              fetchLocation={fetchLocation}
              handleSelectLocation={handleSelectLocation}
              handleImageRemove={handleImageRemove}
              setModalVisible={setModalVisible}
              selectedImage={selectedImage}
              handleCloseAllDropdown={handleCloseAllDropdown}
              isTimePickerOpen={isTimePickerOpen}
              setTimePickerOpen={setTimePickerOpen}
            />
          </View>
          <Button
            mode="contained"
            style={[
              NewContactStyle.button,
              selectDropdownVisbile ? {marginBottom: 100} : {},
            ]}
            onPress={handleSubmit}>
            Create Contact
          </Button>
        </Pressable>
      </ScrollView>

      {isCalendarOpen && (
        <View style={CreateQuoteStyle.modalBackground}>
          <TouchableWithoutFeedback onPress={() => setCalendarOpen(false)}>
            <View style={CreateQuoteStyle.modalBackground}>
              <View style={CreateQuoteStyle.calendarModal}>
                <Calendar onDayPress={day => handleDateSelect(day)} />
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
      <ConfirmationAlert
        isVisible={isModalToastVisible}
        onClose={closeModal}
        onOK={onPressOk}
        successAnimation={successAnimation}
        message="Contact Added Successfully!"
        okText="Create Quote"
        cancelText="close"
      />
      <ConfirmationAlert
        isVisible={supplierModalTastVisible}
        onClose={closeModal}
        onOK={onPressOk}
        successAnimation={successAnimation}
        message="Contact Added Successfully!"
        okText="Create Quote"
        cancelText="close"
        showOkButton={false}
      />
      <SmsAlertModal
        visible={showTopModal}
        onClose={onSmsModalClose}
        showSendButton={true}
        onSend={sendSmsNow}
      />
      {CreateCustomerLoading && (
        <View style={CreateQuoteStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default NewContact;
