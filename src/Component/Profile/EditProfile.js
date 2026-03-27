import React, { useMemo, useState } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity, Text, Image } from 'react-native';
import Header from '../../ReusableComponent/Header';
import CustomTextInput from '../../ReusableComponent/CustomTextInput';
import BottomSheetModal from '../../ReusableComponent/BottomSheetModal';
import ConfirmationAlert from '../../ReusableComponent/ConfirmationAlert';
import useEditProfile from './Hooks/useEditProfile';
import ProfileImagePicker from './Components/ProfileImagePicker';
import EditProfileStyle from '../../utils/Stylesheet/LeftSideBarComponentStyle/EditProfileStyle';
import Colors from '../../Assets/Style/Color';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IMAGE_BASE_URL } from '../../Redux/NWConfig';
import { useSelector } from 'react-redux';

const successAnimation = require('../../Assets/Images/LottieAnimation/loginsuccessful.json');

const EditProfile = ({ navigation }) => {
  const {
    formData,
    imageState,
    uiState,
    errors,
    loading,
    workImagesState,
    handleImageChange,
    handleTakePhoto,
    handleSelectFromGallery,
    handleInputChange,
    handleSave,
    onPressOk,
    setUiState,
    handleWorkImageChange,
    handleWorkImageTakePhoto,
    handleWorkImageSelectFromGallery,
    handleRemoveWorkImage,
  } = useEditProfile(navigation);

  const [isTradeDropdownOpen, setIsTradeDropdownOpen] = useState(false);
  const {TradeTypeData} = useSelector(state => state.TradeType);

  const selectedTrade = useMemo(() => {
    const trade = formData.trade;
    return typeof trade === 'string' && trade.length > 0 ? trade : '';
  }, [formData.trade]);

  const handleTradeToggle = (trade) => {
    if (selectedTrade === trade?.name) handleInputChange('trade', '');
    else handleInputChange('trade', trade?.name);
    setIsTradeDropdownOpen(false);
  };

  const getFullImageUrl = (url) => {
    if (!url) return null;
  
    const parts = url.split('storage/');
    if (parts.length > 1) {
      return IMAGE_BASE_URL + parts[1];
    } else {
      return IMAGE_BASE_URL + url;
    }
  };

  return (
    <View style={EditProfileStyle.container}>
      <Header notificationIcon backButton route="Profile" />

      <ScrollView keyboardShouldPersistTaps="always" style={EditProfileStyle.contentContainer}>
        <ProfileImagePicker
          imageUri={imageState.imageUri}
          selectedImg={imageState.selectedImg}
          onPress={handleImageChange}
        />

        <CustomTextInput
          label="First Name"
          placeholder="Enter First Name"
          icon="account"
          value={formData.firstName}
          required
          onChangeText={(value) => handleInputChange('firstName', value)}
          error={!!errors.firstName}
          errorMessage={errors.firstName}
        />
        <CustomTextInput
          label="Last Name"
          placeholder="Enter Last Name"
          icon="account"
          value={formData.lastName}
          required
          onChangeText={(value) => handleInputChange('lastName', value)}
          error={!!errors.lastName}
          errorMessage={errors.lastName}
        />
        <CustomTextInput
          label="Phone"
          placeholder="Enter phone number"
          keyboardType="numeric"
          icon="phone"
          value={formData.phone}
          error={!!errors.phone}
          errorMessage={errors.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
        />
        <CustomTextInput
          label="Email"
          placeholder="Enter email"
          icon="email"
          editable={false}
          value={formData.email}
        />
        <CustomTextInput
          label="About"
          placeholder="Enter About"
          value={formData.about}
          icon="information-outline"
          multiline
          numberOfLines={4}
          required
          onChangeText={(value) => handleInputChange('about', value)}
          inputStyle={{ minHeight: 100, textAlignVertical: 'top' }}
        />
        <CustomTextInput
          label="Address"
          placeholder="Enter address"
          value={formData.address}
          icon="map-marker"
          required
          onChangeText={(value) => handleInputChange('address', value)}
          error={!!errors.address}
          errorMessage={errors.address}
        />
        <CustomTextInput
          label="Hourly Rate"
          placeholder="Enter Rate"
          value={formData.rate}
          icon="currency-usd"
          required
          onChangeText={(value) => handleInputChange('rate', value)}
          error={!!errors.rate}
          errorMessage={errors.rate}
        />
        <CustomTextInput
          label="Business Name"
          placeholder="Enter Business Name"
          value={formData.businessName}
          icon="briefcase"
          onChangeText={(value) => handleInputChange('businessName', value)}
          error={!!errors.businessName}
          errorMessage={errors.businessName}
        />
        <CustomTextInput
          label="Website"
          placeholder="Enter Business Site"
          value={formData.occupation}
          icon="web"
          onChangeText={(value) => handleInputChange('occupation', value)}
          error={!!errors.occupation}
          errorMessage={errors.occupation}
        />
        <CustomTextInput
          label="Work Experience"
          placeholder="Enter Work Experience"
          value={formData.workExperience}
          icon="file"
          onChangeText={(value) => handleInputChange('workExperience', value)}
        />

        {/* Trade Type Dropdown (styled like other inputs) */}
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsTradeDropdownOpen(!isTradeDropdownOpen)}
          >
            <CustomTextInput
              label="Trade Type"
              placeholder="Select Trade Type"
              value={selectedTrade}
              icon="wrench"
              required
              editable={false}
              error={!!errors.trade}
              errorMessage={errors.trade}
            />
          </TouchableOpacity>

          {isTradeDropdownOpen && (
            <View style={EditProfileStyle.tradeDropdownContainer}>
              <ScrollView nestedScrollEnabled style={{ maxHeight: 150 }}>
                {TradeTypeData?.trade_type?.map((trade) => {
                  const isSelected = trade === selectedTrade;
                  return (
                    <TouchableOpacity
                      key={trade?.id}
                      style={[
                        EditProfileStyle.tradeListItem,
                        isSelected && EditProfileStyle.tradeListItemSelected,
                      ]}
                      onPress={() => handleTradeToggle(trade)}
                    >
                      <Text
                        style={[
                          EditProfileStyle.tradeListItemText,
                          isSelected && EditProfileStyle.tradeListItemTextSelected,
                        ]}
                      >
                        {trade?.name}
                      </Text>
                      {isSelected && (
                        <Icon name="check" size={20} color={Colors.White} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>
        {selectedTrade === 'Other' && (
        <CustomTextInput
          label="Specify Other Trade"
          placeholder="Enter your trade"
          value={formData.tradeOther || ''}
          icon="pencil"
          onChangeText={(value) => handleInputChange('tradeOther', value)}
          required
        />
      )}

        <CustomTextInput
          label="ABN"
          placeholder="Enter ABN"
          value={formData.abn}
          icon="id-card"
          onChangeText={(value) => handleInputChange('abn', value)}
        />
        <CustomTextInput
          label="Suburb"
          placeholder="Enter Suburb"
          value={formData.suburb}
          icon="map"
          onChangeText={(value) => handleInputChange('suburb', value)}
        />
        <CustomTextInput
          label="GST"
          placeholder="Registered / Not Registered"
          value={formData.gst}
          icon="check-circle"
          onChangeText={(value) => handleInputChange('gst', value)}
        />

        <TouchableOpacity style={EditProfileStyle.uploadBox} onPress={handleWorkImageChange}>
          <Text style={EditProfileStyle.uploadText}>+ Upload Work Images (Max 5)</Text>
        </TouchableOpacity>

        <View style={EditProfileStyle.imagePreviewRow}>
        {workImagesState.existingImages?.map((img, idx) => (
            <View key={`existing-${idx}`} style={EditProfileStyle.workImageContainer}>
              <Image
                source={{ uri: getFullImageUrl(img) }}
                style={EditProfileStyle.workImage}
              />
              <TouchableOpacity
                style={EditProfileStyle.removeImageButton}
                onPress={() => handleRemoveWorkImage(idx, 'existing')}
              >
                <Text style={EditProfileStyle.removeImageText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          {workImagesState.newImages?.map((img, idx) => (
            <View key={`new-${idx}`} style={EditProfileStyle.workImageContainer}>
              <Image source={{ uri: img.uri }} style={EditProfileStyle.workImage} />
              <TouchableOpacity
                style={EditProfileStyle.removeImageButton}
                onPress={() => handleRemoveWorkImage(idx, 'new')}
              >
                <Text style={EditProfileStyle.removeImageText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={EditProfileStyle.saveButton} onPress={handleSave}>
          <Text style={EditProfileStyle.saveText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomSheetModal
        visible={uiState.isModalVisible}
        onClose={() => setUiState((prev) => ({ ...prev, isModalVisible: false }))}
        onTakePhoto={handleTakePhoto}
        onSelectFromGallery={handleSelectFromGallery}
      />
      <BottomSheetModal
        visible={uiState.isWorkImageModalVisible}
        onClose={() => setUiState((prev) => ({ ...prev, isWorkImageModalVisible: false }))}
        onTakePhoto={handleWorkImageTakePhoto}
        onSelectFromGallery={handleWorkImageSelectFromGallery}
      />

      <ConfirmationAlert
        isVisible={uiState.isModalToastVisible}
        onOK={onPressOk}
        successAnimation={successAnimation}
        message="User Details Updated Successfully!"
        okText="Ok"
        showCancelButton={false}
      />

      {loading && (
        <View style={EditProfileStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
    </View>
  );
};

export default EditProfile;
