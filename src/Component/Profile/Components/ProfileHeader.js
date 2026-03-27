import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { profileImagePlaceholder } from '../../../Assets/Images';
import { BASE_URL, IMAGE_BASE_URL, image_path, Tradie_Status_Update_Url } from '../../../Redux/NWConfig';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProfileHeader = ({ userData, onShareProfile, target, onTogglePublic, handleDeleteAccount }) => {
  const [isPublic, setIsPublic] = useState(false);
  const { LoginData } = useSelector(state => state.Login);

  const capitalize = str => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '');

  useEffect(() => {
    if (userData?.status === 'public') {
    setIsPublic(true);
    }
  }, [userData]);

  const handleToggle = async () => {
    const newValue = !isPublic;
    const token = LoginData.token;
  
    const postData = {
      status: newValue ? "public" : "private",
    };
  
    try {
      const res = await axios.post(BASE_URL + Tradie_Status_Update_Url, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      setIsPublic(newValue);
      if (onTogglePublic) {
        onTogglePublic(newValue);
      }
  
      Alert.alert(
        'Profile Visibility Changed',
        newValue
          ? 'Your profile is now public. Other users can see it.'
          : 'Your profile is now private. It is hidden from others.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile visibility. Please try again.');
    }
  };

  const getFullImageUrl = (logo) => {
    if (!logo) return null;
  
    // Check if "storage/" exists in the URL
    const parts = logo.split('storage/');
    if (parts.length > 1) {
      return IMAGE_BASE_URL + parts[1]; // IMAGE_BASE_URL + "logo/46_1763104966.jpg"
    } else {
      return IMAGE_BASE_URL + logo; // fallback
    }
  };
  
  

  return (
    <View style={ProfileStyle.card}>
  <View style={ProfileStyle.headerRow}>
    <View style={ProfileStyle.imageWrapper}>
    <Image
  source={userData?.logo ? { uri: getFullImageUrl(userData.logo) } : profileImagePlaceholder}
  style={ProfileStyle.profileImage}
/>

    </View>

    <View style={ProfileStyle.profileInfo}>
      <Text style={ProfileStyle.profileName}>
        {capitalize(userData?.first_name)} {capitalize(userData?.last_name)}
      </Text>
      <Text style={ProfileStyle.targetRevenue}>
        🎯 Target Revenue: <Text style={ProfileStyle.targetValue}>${target?.toFixed(2)}</Text>
      </Text>
    </View>
  </View>

  <View style={ProfileStyle.SwitchContainer}>
    <Text style={ProfileStyle.publicProfileText}>Make profile public</Text>
    <Switch
      value={isPublic}
      onValueChange={handleToggle}
      thumbColor={isPublic ? '#4CAF50' : '#f4f3f4'}
      trackColor={{ false: '#767577', true: '#81b0ff' }}
    />
  </View>

  <TouchableOpacity style={ProfileStyle.shareButton} onPress={onShareProfile}>
    <Icon name="share-alt" size={16} color="#fff" />
    <Text style={ProfileStyle.shareText}>Share Profile</Text>
  </TouchableOpacity>

    <TouchableOpacity style={ProfileStyle.DeleteButton} onPress={handleDeleteAccount}>
                <Icon name="trash" size={20} color="#fff" />
                <Text style={ProfileStyle.logoutText}>Delete Account</Text>
              </TouchableOpacity>
</View>

  );
};

export default ProfileHeader;
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../Assets/Style/Color';

const { width } = Dimensions.get('window');

const ProfileStyle = StyleSheet.create({
  card: {
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  imageWrapper: {
    marginRight: 16,
    borderRadius: 50,
    overflow: 'hidden',
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white_text_color,
    marginBottom: 4,
  },

  targetRevenue: {
    fontSize: 14,
    color: Colors.ghost_white_color,
  },
  publicProfileText: {
    fontSize: 14,
    color: Colors.smoky_black_color,
    fontWeight: '600',
  },

  targetValue: {
    fontWeight: '600',
    color: Colors.green_color,
  },

  SwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#E7F5FF',
    borderRadius: 12,
  },

  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue_theme_Color,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 8,
  },

  shareText: {
    color: Colors.white_text_color,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
   logoutText: {
      color: Colors.white_text_color,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    DeleteButton :{
   flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.pink_theme_color,
      paddingVertical: 10,
     borderRadius: 12,
      elevation: 5,
      marginTop : 20,
      opacity : 0.8
    },
});

