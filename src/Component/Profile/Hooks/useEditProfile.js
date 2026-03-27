import { useState, useEffect } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDetailsApi } from '../../../Redux/API/GetUserDetailsApi';
import { GetStateApi } from '../../../Redux/API/GetStateApi';
import { UserUpdateApi } from '../../../Redux/API/UserUpdateApi';
import { image_path } from '../../../Redux/NWConfig';
import { requestCameraPermission, requestGalleryPermission } from '../../../utils/Function/RequestPermissions';

const useEditProfile = (navigation) => {
  const { UserData } = useSelector(state => state.UserDetails);
  const { UpdateUserLoading } = useSelector(state => state.UserUpdate);
  const { UserDetailsLoading } = useSelector(state => state.UserDetails);
  const { CountryListData } = useSelector(state => state.CountryList);
  const { StateListData } = useSelector(state => state.StateList);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: UserData?.data?.first_name || '',
    lastName: UserData?.data?.last_name || '',
    phone: UserData?.data?.phone_primary || '',
    email: UserData?.data?.email_primary || '',
    address: UserData?.data?.address || '',
    state: UserData?.data?.state || '',
    zipCode: UserData?.data?.zip_code || '',
    businessName: UserData?.data?.business_name || '',
    location: UserData?.data?.location || '',
    country: UserData?.data?.country || '',
    expertise: UserData?.data?.expertise || '',
    occupation: UserData?.data?.business_site || '',
    workExperience: UserData?.data?.work_experience || '',
    about : UserData?.data?.about || '',
    rate: UserData?.data?.rate || '',
    abn: UserData?.data?.ABN || '',
    suburb: UserData?.data?.suburb || '',
    gst: UserData?.data?.GST || '',
    trade: UserData?.data?.trade || '',
    rating: UserData?.data?.rating?.toString() || '',
    photo: UserData?.data?.photo || null,
    status: UserData?.data?.status || []
  });

  const [imageState, setImageState] = useState({
    selectedImg: null, // For profile photo
    imageUri: UserData?.data?.logo, // Display URI for profile photo
  });

  const [workImagesState, setWorkImagesState] = useState({
    existingImages: Array.isArray(UserData?.data?.workImages)
      ? UserData.data.workImages
      : UserData?.data?.workImages
      ? UserData.data.workImages.split(',')
      : [],
    newImages: [], // New images to be uploaded
  });
  

  const [uiState, setUiState] = useState({
    isModalVisible: false, // For profile photo selection
    isModalToastVisible: false,
    selectDropdownVisible: false,
    stateDropdownVisible: false,
    isWorkImageModalVisible: false // For work image selection
  });

  const [errors, setErrors] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    if (CountryListData?.CountryMaster?.length > 0) {
      setCountryList(CountryListData.CountryMaster);
    }
  }, [CountryListData]);

  useEffect(() => {
    if (StateListData?.CountryMaster?.length > 0) {
      setStateList(StateListData.CountryMaster);
    }
  }, [StateListData]);

  const handleImageChange = () =>
    setUiState(prev => ({ ...prev, isModalVisible: true }));

  const handleWorkImageChange = () =>
    setUiState(prev => ({ ...prev, isWorkImageModalVisible: true }));

  const processImage = (image) => {
    const imageSize = image.fileSize;
    const imageUri = image.uri;
    const imageExtension = imageUri.split('.').pop().toLowerCase();

    if (imageSize > 2 * 1024 * 1024) {
      Alert.alert('Image size exceeds 2 MB. Please choose a smaller image.');
      return false;
    }

    if (!['jpg', 'jpeg', 'png'].includes(imageExtension)) {
      Alert.alert('Invalid image format. Only JPG, JPEG, and PNG are allowed.');
      return false;
    }
    return true;
  };

 

  const handleTakePhoto = async () => {
    const cameraGranted = await requestCameraPermission();
       if (!cameraGranted) return;
  
    launchCamera(
      { mediaType: 'photo', saveToPhotos: true },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.log('Camera error: ', response.errorMessage);
          return;
        }
  
        if (response.assets?.length > 0) {
          const image = response.assets[0];
          if (processImage(image)) {
            setImageState({ selectedImg: image, imageUri: image.uri });
          }
        }
      }
    );
    setUiState(prev => ({ ...prev, isModalVisible: false }));
  };
  
  const handleSelectFromGallery = async () => {
    const galleryGranted = await requestGalleryPermission();
        if (!galleryGranted) return;
    setUiState(prev => ({ ...prev, isModalVisible: false }));
    launchImageLibrary({ selectionLimit: 1, mediaType: 'photo' }, (response) => {
      if (response.assets?.length > 0) {
        const image = response.assets[0];
        if (processImage(image)) {
          setImageState({ selectedImg: image, imageUri: image.uri });
        }
      }
    });
  };

  // --- New and corrected functions for Work Images ---

  const handleWorkImageTakePhoto = async () => {
    setUiState(prev => ({ ...prev, isWorkImageModalVisible: false })); // Close modal
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;
  
    launchCamera(
      { mediaType: 'photo', saveToPhotos: true },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.log('Camera error for work image: ', response.errorMessage);
          return;
        }
  
        if (response.assets?.length > 0) {
          const image = response.assets[0];
          if (processImage(image)) {
            setWorkImagesState(prev => ({
              ...prev,
              newImages: [...prev.newImages, image],
            }));
          }
        }
      }
    );
  };
  
  const handleWorkImageSelectFromGallery = () => {
    setUiState(prev => ({ ...prev, isWorkImageModalVisible: false })); // Close modal
    launchImageLibrary({ selectionLimit: 5, mediaType: 'photo', quality: 0.8 }, (response) => { // selectionLimit: 0 allows multiple
      if (response.didCancel) return;
      if (response.errorCode) {
        console.log('Gallery error for work images: ', response.errorMessage);
        return;
      }

      if (response.assets?.length > 0) {
        const validImages = response.assets.filter(processImage);
        setWorkImagesState(prev => ({
          ...prev,
          newImages: [...prev.newImages, ...validImages],
        }));
      }
    });
  };

  // --- End of New and corrected functions for Work Images ---


  const handleInputChange = (field, value) => {
    if (field === 'firstName' || field === 'lastName') {
      value = capitalizeFirstLetter(value);
    }
    setErrors(prev => ({ ...prev, [field]: undefined }));
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddWorkImages = (images) => { // This function might become redundant if using direct camera/gallery selection
    setWorkImagesState(prev => ({
      ...prev,
      newImages: [...prev.newImages, ...images],
    }));
  };

  const handleRemoveWorkImage = (indexToRemove, type) => {
    if (type === 'new') {
      setWorkImagesState(prev => ({
        ...prev,
        newImages: prev.newImages.filter((_, index) => index !== indexToRemove),
      }));
    } else { // 'existing'
      setWorkImagesState(prev => ({
        ...prev,
        existingImages: prev.existingImages.filter((_, index) => index !== indexToRemove),
      }));
    }
  };


  const capitalizeFirstLetter = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  const validateForm = () => {
    const requiredFields = {
      firstName: 'First Name is required',
      lastName: 'Last Name is required',
      address: 'Address is required',
      phone: 'Phone is required',
      rate: 'Rate is required',
      // businessName: 'Business Name is required',
      // occupation: 'Occupation is required',
      // workExperience: 'Work Experience is required',
      // abn: 'ABN is required',
      // suburb: 'Suburb is required',
      // gst: 'GST is required',
      trade: 'Trade Type is required',
    };
  
    const newErrors = Object.entries(requiredFields).reduce((acc, [field, message]) => {
      if (!formData[field]) acc[field] = message;
      return acc;
    }, {});
  
    const ausPhoneRegex = /^(?:\+?61|0)[2-478]\d{8}$/;
    const phone = formData.phone?.trim();
  
    if (phone && !ausPhoneRegex.test(phone)) {
      newErrors.phone = 'Please enter a valid Australian contact number';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
  
    return true;
  };
  

  const handleSave = async () => {
    if (!validateForm()) return;

    const ptoken = await AsyncStorage.getItem('Token');
    const token = JSON.parse(ptoken);
    const form = new FormData();

    form.append('first_name', formData.firstName);
    form.append('last_name', formData.lastName);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('about', formData.about);
    form.append('address', formData.address);
    form.append('rate', formData.rate);
    form.append('business_name', formData.businessName);
    form.append('business_site', formData.occupation);
    form.append('work_experience', formData.workExperience);
    form.append('ABN', formData.abn);
    form.append('suburb', formData.suburb);
    form.append('GST', formData.gst);
    form.append('trade', formData.trade);
    form.append('rating', formData.rating);
    form.append('status', formData.status);
    
    if (imageState.selectedImg) {
      form.append('logo', {
        uri: imageState.selectedImg.uri,
        type: imageState.selectedImg.type,
        name: imageState.selectedImg.fileName,
      });
    } 
    // else if (imageState.imageUri) { // This block is commented out, but if you re-enable it, ensure the path is correct
    //   const fileName = imageState.imageUri.split('/').pop();;
    //   const extension = fileName.split('.').pop(); 

    //   form.append('logo', {
    //     uri: image_path + imageState.imageUri,
    //     type: `image/${extension}`,
    //     name: fileName,
    //   });
    // }
    
    if (formData.photo) {
      form.append('photo', {
        uri: formData.photo.uri,
        type: formData.photo.type,
        name: formData.photo.fileName,
      });
    }

    // Append new work images
    if (workImagesState.newImages.length > 0) {
      workImagesState.newImages.forEach((img, index) => {
        form.append(`workImage[${index}]`, { 
          uri: img.uri,
          type: img.type,
          name: img.fileName ,
        });
      });
    }
    


    try {
      const response = await dispatch(UserUpdateApi(form)).unwrap();
      if (response?.status === true) {
        dispatch(UserDetailsApi(token)); // Refresh user details
        setUiState(prev => ({ ...prev, isModalToastVisible: true }));
      }
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', error?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

    const toggleDropdown = (type) => {
    setUiState(prev => ({
      ...prev,
      selectDropdownVisible: type === 'country' ? !prev.selectDropdownVisible : false,
      stateDropdownVisible: type === 'state' ? !prev.stateDropdownVisible : false,
    }));
  };

  const handleCountrySelect = async (option) => {
    handleInputChange('country', option.country_name);
    dispatch(GetStateApi(option.country_code));
    toggleDropdown('country');
  };

  const handleStateSelect = (selectedState) => {
    handleInputChange('state', selectedState);
    toggleDropdown('state');
  };

  const onPressOk = () => {
    navigation.navigate('Profile');
    setUiState(prev => ({ ...prev, isModalToastVisible: false }));
  };


  return {
    formData,
    imageState,
    uiState,
    errors,
    countryList,
    stateList,
    loading: UpdateUserLoading || UserDetailsLoading,
    workImagesState,
    handleImageChange,
    handleTakePhoto,
    handleSelectFromGallery,
    handleInputChange,
    handleSave,
    toggleDropdown,
    handleCountrySelect,
    handleStateSelect,
    onPressOk,
    setUiState,
    handleAddWorkImages, // Consider if still needed, or if camera/gallery functions replace it
    handleRemoveWorkImage,
    handleWorkImageChange, // Opens the modal for work images
    handleWorkImageTakePhoto, // Takes a photo for work images
    handleWorkImageSelectFromGallery, // Selects from gallery for work images
  };
};

export default useEditProfile;