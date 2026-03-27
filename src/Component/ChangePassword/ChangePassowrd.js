import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Colors from '../../Assets/Style/Color'; 
import ConfirmationAlert from '../../ReusableComponent/ConfirmationAlert'; 
import Header from '../../ReusableComponent/Header';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePasswordApi } from '../../Redux/API/ChangePasswordApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import ChangePasswordStyle from '../../utils/Stylesheet/ChangePasswordStyle';

const successAnimation = require('../../Assets/Images/LottieAnimation/loginsuccessful.json'); 

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isModalToastVisible, setModalToastVisible] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
  const dispatch = useDispatch();
  const { ChangePasswordLoading } = useSelector(state => state.ChangePassword);

  useEffect(() => {
    const currentPassword = async () =>{
      const user = await AsyncStorage.getItem('userLoginData');
      const parsedUser = JSON.parse(user);
      setCurrentPassword(parsedUser?.password);
    }
    currentPassword();
  }, []);

  const handleChangePassword = async () => {
    if (currentPassword && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        Alert.alert('','New password and confirm password not matched');
        return;
      }
  
      if (newPassword.length < 8) {
        Alert.alert('','New password must be at least 8 characters long');
        return;
      }
  
      const user = await AsyncStorage.getItem('User');
      const parsedUser = JSON.parse(user);
  
      if (!parsedUser?.id) {
        Alert.alert('User ID is not available');
        return;
      }
  
      const postData = {
        user_id: parsedUser.id,
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      };
  
      try {
        await dispatch(ChangePasswordApi(postData)).then((res) => {
          if (res.payload.status === true) {
            setMessage(res.payload.message);
            setModalToastVisible(true);
          }
        });
      } catch (error) {
        Alert.alert('An error occurred while changing the password');
      }
    } else {
      Alert.alert('Error','Please fill in all fields');
    }
  };
  

  const onPressOk = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    navigation.goBack();
    setModalToastVisible(false);
  };

  return (
    <View style={ChangePasswordStyle.container}>
      <Header notificationIcon={true} backButton={true} />
      <View style={ChangePasswordStyle.contentContainer}>
        <Text style={ChangePasswordStyle.heading}>Change Password</Text>

        <TextInput
          label="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          textColor={Colors.white_text_color}
          placeholder="Enter current password"
          placeholderTextColor={Colors.white_text_color}
          style={ChangePasswordStyle.input}
          mode="outlined"
          secureTextEntry={!isPasswordVisible}
          left={
            <TextInput.Icon icon="key" color={Colors.blue_theme_Color} />
          }
          right={
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye' : 'eye-off'}
              color={Colors.blue_theme_Color}
              onPress={() => setPasswordVisible(!isPasswordVisible)} 
            />
          }
          theme={{
            colors: {
              primary: Colors.white_text_color,
              underlineColor: 'transparent',
              background: Colors.black_bg_Theme,
            },
          }}
        />

        <TextInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          textColor={Colors.white_text_color}
          placeholder="Enter new password"
          placeholderTextColor={Colors.white_text_color}
          style={ChangePasswordStyle.input}
          mode="outlined"
          secureTextEntry={!isNewPasswordVisible}
          left={
            <TextInput.Icon icon="key" color={Colors.blue_theme_Color} />
          }
          right={
            <TextInput.Icon
              icon={isNewPasswordVisible ? 'eye' : 'eye-off'}
              color={Colors.blue_theme_Color}
              onPress={() => setNewPasswordVisible(!isNewPasswordVisible)} 
            />
          }
          theme={{
            colors: {
              primary: Colors.white_text_color,
              underlineColor: 'transparent',
              background: Colors.black_bg_Theme,
            },
          }}
        />

        {/* Confirm New Password Input */}
        <TextInput
          label="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          textColor={Colors.white_text_color}
          placeholder="Confirm new password"
          placeholderTextColor={Colors.white_text_color}
          style={ChangePasswordStyle.input}
          mode="outlined"
          secureTextEntry={!isConfirmPasswordVisible}
          left={
            <TextInput.Icon icon="key" color={Colors.blue_theme_Color} />
          }
          right={
            <TextInput.Icon
              icon={isConfirmPasswordVisible ? 'eye' : 'eye-off'}
              color={Colors.blue_theme_Color}
              onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)} // Toggle visibility
            />
          }
          theme={{
            colors: {
              primary: Colors.white_text_color,
              underlineColor: 'transparent',
              background: Colors.black_bg_Theme,
            },
          }}
        />

        {/* Change Password button */}
        <Button
          buttonColor={Colors.blue_theme_Color}
          mode="contained"
          onPress={handleChangePassword}
          style={ChangePasswordStyle.button}>
          Change Password
        </Button>

        {/* Confirmation Alert */}
        <ConfirmationAlert
          isVisible={isModalToastVisible}
          onOK={onPressOk}
          successAnimation={successAnimation}
          message={message}
          showCancelButton={false}
        />
      </View>
      {ChangePasswordLoading && (
        <View style={ChangePasswordStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
    </View>
  );
};

export default ChangePassword;
