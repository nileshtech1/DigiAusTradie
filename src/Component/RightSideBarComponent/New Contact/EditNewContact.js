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
import {useRoute} from '@react-navigation/native';
import {contactList_image_path} from '../../../Redux/NWConfig';
import {EditCustomerApi} from '../../../Redux/API/EditCustomerApi';
import {CreateScheduleApi} from '../../../Redux/API/CreateScheduleApi';
import {GetScheduleApi} from '../../../Redux/API/GetScheduleApi';
import {
  GOOGLE_GEOCODE_API_KEY,
  GOOGLE_PLACES_API_KEY,
} from '../../../config/googleMapsConfig';

const successAnimation = require('../../../Assets/Images/LottieAnimation/loginsuccessful.json');

const EditNewContact = ({navigation}) => {
  // Get the route and extract contactData
  const route = useRoute();
  const {contactData} = route.params || {};

  // States for checkboxes
  const [isResidential, setIsResidential] = useState(false);
  const [isStorefront, setIsStorefront] = useState(false);
  const [isCommercial, setIsCommercial] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);
  const [isModalToastVisible, setModalToastVisible] = useState(false);
  const [followUpDate, setFollowUpDate] = useState(null);
  const [followUpTime, setFollowUpTime] = useState(null);
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedImageArray, setSelectedImageArray] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);

  const [isQuote, setIsQuote] = useState(false);
  const [isMeeting, setIsMeeting] = useState(false);

  // States for form fields
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [notes, setNotes] = useState('');
  const [source, setSource] = useState('');
  const [selectDropdownVisbile, setSelectDropdownVisbile] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [franchiseId, setFranchiseId] = useState(null);
  const dispatch = useDispatch();
  const {EditCustomerLoading} = useSelector(state => state.EditCustomer);
  const {LoginData} = useSelector(state => state.Login);

  const sources = [
    'Friend',
    'Google',
    'Advertisement',
    'Social Media',
    'Referral',
    'Website',
    'Other',
  ];

  useEffect(() => {
    if (contactData) {
      setIsResidential(
        contactData.contact_category?.includes('residential') || false,
      );
      setIsStorefront(
        contactData.contact_category?.includes('storefront') || false,
      );
      setIsCommercial(
        contactData.contact_category?.includes('commercial') || false,
      );
      setIsSupplier(
        contactData.contact_category?.includes('supplier') || false,
      );
      setFollowUpDate(contactData.date || null);
      setFollowUpTime(contactData.time || null);
      setLocation(contactData.location || '');
      setCustomerId(contactData?.id || '');
      const imageUrls = contactData?.images?.map(
        image => contactList_image_path + image.path,
      );

      setSelectedImage(imageUrls || []);
      setFirstName(contactData.first_name || '');
      setLastName(contactData.last_name || '');
      setPhone(contactData.phone || '');
      setEmail(contactData.email || '');
      setAddress(contactData.address || '');
      setBusinessName(contactData.business_name || '');
      setNotes(contactData.notes || '');
      setSource(contactData.how_did_you_hear || '');
    }
  }, [contactData]);
  
  const onPressOk = () => {
    const formData = {
      firstName,
      LastName,
      phone,
      email,
      address,
      businessName,
      notes,
      source,
      checkboxes: {
        residential: isResidential,
        storefront: isStorefront,
        commercial: isCommercial,
        Supplier: isSupplier,
      },
    };
    resetFormFields();
    navigation.navigate('Contacts');
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
    // if (!followUpTime) {
    //    console.error("followUpTime is not defined or is empty.");
    //    return;
    // }

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

  const handleSubmit = () => {
    const id = LoginData?.user?.id;
    const token = LoginData?.token;
    const franchiseid = {franchise_id: id};
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
      formData.append('date', followUpDate);
      formData.append('time', followUpTime);
      formData.append('location', location);
      if (selectedImageArray.length > 0) {
        selectedImageArray.forEach((image, index) => {
          formData.append(`images[${index}]`, {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          });
        });
      }

      formData.append('status', 'active');
      dispatch(EditCustomerApi({formData, customerId}))
        .then(data => {
          if (data?.payload?.status === true) {
            setModalToastVisible(true);

            if (isQuote || isMeeting) {
              createQuoteOrMeeting();
            }
            dispatch(GetCustomerListApi({token, franchiseid}));
          }
        })
        .catch(error => {
          console.error('Error in API request:', error);
        });
    }
  };

  const clearSource = () => {
    setSource('');
    setSelectDropdownVisbile(true);
  };
  const clearCusomer = () => {
    setSelectCustomer('');
    setSelectCustDropdownVisbile(true);
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
  };
  const closeDropdown = () => {
    setSelectDropdownVisbile(false);
  };
  const handleSourceSelect = selectedSource => {
    setSource(selectedSource);

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

  const handleTakePhoto = () => {
    setModalVisible(false);
    launchCamera(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          const image = response.assets[0];
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
        if (response && response.assets && response.assets.length > 0) {
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
        } else {
          Alert.alert('No assets selected or response was invalid.');
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

        // Fetch the address using the Google Geocoding API
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
    setLocation(place.description); // Assuming 'description' is the formatted address
    setSuggestions([]); // Clear suggestions
  };
  const handleImageRemove = index => {
    const isFile = selectedImageArray[index]?.fileName;
    if (isFile) {
      setSelectedImage(prevImages => prevImages?.filter((_, i) => i !== index));
      setSelectedImageArray(prevImages =>
        prevImages?.filter((_, i) => i !== index),
      );
    } else {
      setSelectedImage(prevImages => prevImages?.filter((_, i) => i !== index));
      setSelectedImageArray(prevImages =>
        prevImages?.filter((_, i) => i !== index),
      );
    }
  };
  const handleCloseAllDropdown = () => {
    setSelectDropdownVisbile(false);
  };

  return (
    <View style={NewContactStyle.container}>
      <Header notificationIcon={true} backButton={true} route="Contact Card" />
      <ScrollView
        style={NewContactStyle.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => setSelectDropdownVisbile(false)}>
          <Text style={NewContactStyle.title}>Edit Contact</Text>

          {/* Checkboxes */}
          <View style={NewContactStyle.checkboxGroup}>
            <View style={NewContactStyle.checkboxContainer}>
              <Checkbox
                status={isResidential ? 'checked' : 'unchecked'}
                onPress={() => setIsResidential(!isResidential)}
                color="white"
                uncheckedColor="white"
              />
              <Text style={NewContactStyle.CheckBoxLabel}>Residential</Text>
            </View>
            <View style={NewContactStyle.checkboxContainer}>
              <Checkbox
                status={isStorefront ? 'checked' : 'unchecked'}
                onPress={() => setIsStorefront(!isStorefront)}
                color="white"
                uncheckedColor="white"
              />
              <Text style={NewContactStyle.CheckBoxLabel}>Storefront</Text>
            </View>
            <View style={NewContactStyle.checkboxContainer}>
              <Checkbox
                status={isCommercial ? 'checked' : 'unchecked'}
                onPress={() => setIsCommercial(!isCommercial)}
                color="white"
                uncheckedColor="white"
              />
              <Text style={NewContactStyle.CheckBoxLabel}>Commercial</Text>
            </View>
            <View style={NewContactStyle.checkboxContainer}>
              <Checkbox
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
              placeholder="First name     "
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
              placeholder="Last name       "
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
            <Text style={NewContactStyle.label}>
              How did you hear about us :{' '}
            </Text>
            <TouchableOpacity
              style={[
                NewContactStyle.inputWithIcon,
                errors.source && NewContactStyle.inputError,
              ]}
              onPress={() => toggleSource()}>
              <VectorIcon
                icon="FontAwesome"
                name="bullhorn"
                style={NewContactStyle.iconMargin}
                size={20}
                color={Colors.blue_theme_Color}
              />
              <TextInput
                placeholder="Specific reference.."
                placeholderTextColor={Colors.white_text_color}
                value={source}
                onChangeText={value => handleInputChange('source', value)}
                onFocus={() => toggleSource()}
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
                name={selectDropdownVisbile ? 'angle-up' : 'angle-down'}
                style={NewContactStyle.dropdownArrowIcon}
                size={20}
                color={Colors.blue_theme_Color}
              />
            </TouchableOpacity>
            {selectDropdownVisbile && (
              <View style={NewContactStyle.dropdown}>
                <ScrollView
                  style={NewContactStyle.CustomerDropdown}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}>
                  {sources
                    ?.filter(option => option.toLowerCase() != 'referral')
                    .map((option, optionIndex) => (
                      <TouchableOpacity
                        key={optionIndex}
                        onPress={() => handleSourceSelect(option)}
                        style={NewContactStyle.dropdownItem}>
                        <Text style={NewContactStyle.dropdownText}>
                          {option}
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
            Edit Contact
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
        onOK={onPressOk}
        successAnimation={successAnimation}
        message="Contact Edited Successfully!"
        okText="OK"
        showCancelButton={false}
      />
      {EditCustomerLoading && (
        <View style={CreateQuoteStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
    </View>
  );
};

export default EditNewContact;
