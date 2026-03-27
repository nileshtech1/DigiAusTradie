import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Header from '../../ReusableComponent/Header';
import ProfileStyle from '../../utils/Stylesheet/LeftSideBarComponentStyle/ProfileStyle';
import useProfile from './Hooks/useProfile';
import ProfileHeader from './Components/ProfileHeader';
import ProfileInfoSection from './Components/ProfileInfoSection';
import ProfileActions from './Components/ProfileActions';
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {
  const {
    user,
    target,
    handleLogout,
    handleEditProfile,
    handleShareProfile,
    handleLinkPress,
    handleDeleteAccount,
  } = useProfile();

  return (
    <View style={ProfileStyle.container}>
      <Header notificationIcon={true} />

      <ScrollView
        keyboardShouldPersistTaps="always"
        style={ProfileStyle.contentContainer}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ProfileHeader 
          userData={user} 
          onShareProfile={handleShareProfile} 
          target={target} 
          handleDeleteAccount={handleDeleteAccount}
        />
        
        <ProfileInfoSection
          userData={user} 
          onEditProfile={handleEditProfile} 
          onLinkPress={handleLinkPress} 
        />
        <ProfileActions onLogout={handleLogout} />
       
      </ScrollView>

      {/* Fixed Logout Button */}
    </View>
  );
};

export default Profile;
