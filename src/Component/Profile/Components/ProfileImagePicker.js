import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import EditProfileStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/EditProfileStyle';
import { IMAGE_BASE_URL, image_path } from '../../../Redux/NWConfig';
import { profileImagePlaceholder } from '../../../Assets/Images';
import Colors from '../../../Assets/Style/Color';

const ProfileImagePicker = ({ imageUri, selectedImg, onPress }) => {
  const getFullImageUrl = (logo) => {
    if (!logo) return null;
  
    // Check if "storage/" exists in the URL
    const parts = logo.split('storage/');
    if (parts.length > 1) {
      return IMAGE_BASE_URL + parts[1];
    } else {
      return IMAGE_BASE_URL + logo; // fallback
    }
  };
  
  
  return (
    <TouchableOpacity
      style={EditProfileStyle.imgContainer}
      onPress={onPress}>
      {imageUri && !selectedImg ? (
        <Image 
          source={{ uri:getFullImageUrl(imageUri) }} 
          style={EditProfileStyle.img} 
        />
      ) : imageUri ? (
        <Image 
          source={{ uri: imageUri }} 
          style={EditProfileStyle.img} 
        />
      ) : (
        <Image 
          source={profileImagePlaceholder} 
          style={EditProfileStyle.img} 
        />
      )}
      <View style={EditProfileStyle.plusIcon}>
        <VectorIcon
          icon="FontAwesome5"
          name="camera"
          size={20}
          color={Colors.white_text_color}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileImagePicker;