import React, { useState } from 'react';
import { View, Text, Alert, StatusBar } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Colors from '../../Assets/Style/Color';
import ConfirmationAlert from '../../ReusableComponent/ConfirmationAlert';
import { useDispatch } from 'react-redux';
import { ForgetPassowrdApi } from '../../Redux/API/ForgetPasswordApi';
import ForgetPasswordStyle from '../../utils/Stylesheet/ForgetPasswordStyle';
const successAnimation = require('../../Assets/Images/LottieAnimation/loginsuccessful.json');

const ResetScreen = ({navigation, route}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [isModalToastVisible, setModalToastVisible]= useState(false);
  const [message, setMessage] = useState('')
  const dispatch = useDispatch();
  const { email } = route.params;


  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Password fields cannot be empty!');
    } 
    else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
    } 
    else {
    const postData =  {
        email_primary: email,
        new_password: password,
        new_password_confirmation:confirmPassword
    }
        dispatch(ForgetPassowrdApi(postData)).then((response)=>{
        if (response.payload.status === true) {
          setMessage(response.payload.message)
          setModalToastVisible(true)
        }

        })
    }
  };
  
  const closeModal = () => {
    setModalToastVisible(false);
  };
  const onPressOk = () => {
    navigation.navigate('Login')
    setModalToastVisible(false);
  };

  return (
    <View style={ForgetPasswordStyle.container}>
       <StatusBar
          barStyle="light-content" 
          backgroundColor={Colors.grey_bg_Color}
        />
      <Text style={ForgetPasswordStyle.title}>Reset Your Password</Text>

      <TextInput
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
        style={ForgetPasswordStyle.input}
        textColor={Colors.white_text_color}
        secureTextEntry={!showPassword} 
        mode="outlined"
        left={<TextInput.Icon icon={'lock'} color={Colors.blue_theme_Color} />}
        theme={{
          colors: {
            primary: Colors.white_text_color,
            underlineColor: 'transparent',
            background: Colors.black_bg_Theme,
          },
        }}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'} 
            color={Colors.blue_theme_Color}
            onPress={() => setShowPassword(!showPassword)} 
          />
        }
      />

      
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={ForgetPasswordStyle.input}
        secureTextEntry={!showPassword}
        mode="outlined"
        textColor={Colors.white_text_color}
        left={<TextInput.Icon icon={'lock'} color={Colors.blue_theme_Color} />}
        theme={{
          colors: {
            primary: Colors.white_text_color,
            underlineColor: 'transparent',
            background: Colors.black_bg_Theme,
          },
        }}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            color={Colors.blue_theme_Color}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      {/* Reset Password Button */}
      <Button buttonColor={Colors.blue_theme_Color} mode="contained" onPress={handleResetPassword} style={ForgetPasswordStyle.button}>
        Reset Password
      </Button>
      <ConfirmationAlert
        isVisible={isModalToastVisible}
        onClose={closeModal}
        onOK={onPressOk}
        successAnimation={successAnimation}
        message={message}
        showCancelButton={false}
      />
    </View>
  );
};


export default ResetScreen;
