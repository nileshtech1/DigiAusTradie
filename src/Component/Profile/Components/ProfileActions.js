import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/ProfileStyle';

const ProfileActions = ({ onLogout }) => {
  return (
    <TouchableOpacity style={ProfileStyle.logoutButton} onPress={onLogout}>
      <Icon name="sign-out" size={20} color="#fff" />
      <Text style={ProfileStyle.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
};

export default ProfileActions;