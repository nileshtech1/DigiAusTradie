import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

// Local Imports
import Colors from '../../Assets/Style/Color';
import ConfirmationAlert from '../../ReusableComponent/ConfirmationAlert';
import { ForgetPassowrdApi } from '../../Redux/API/ForgetPasswordApi';
import DashedLoader from '../../ReusableComponent/DashedLoader';
import VectorIcon from '../../ReusableComponent/VectorIcon'; // Assuming you have this

const successAnimation = require('../../Assets/Images/LottieAnimation/loginsuccessful.json');

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isModalToastVisible, setModalToastVisible] = useState(false);
  const dispatch = useDispatch();
  const { ForgetPasswordLoading } = useSelector(state => state.ForgetPassword);

  const closeModal = () => {
    setModalToastVisible(false);
  };

  const onPressOk = () => {
    navigation.navigate('Login');
    setModalToastVisible(false);
  };

  const handleForgetPassword = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailRegex.test(email)) {
      const postData = { email };
      try {
        dispatch(ForgetPassowrdApi(postData)).then((response) => {
          if (response.payload.status === true) {
            setMessage(response.payload.message);
            setModalToastVisible(true);
          } else {
            Alert.alert("Error", response.payload.message || "Could not process your request.");
          }
        });
      } catch (error) {
        Alert.alert("Incorrect Email", 'Please enter the email associated with your account.');
      }
    } else {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.grey_bg_Color} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 0.8, width: '100%' }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          
          {/* --- Header Section --- */}
          <View style={styles.headerContainer}>
            <View style={styles.iconContainer}>
              <VectorIcon icon="MaterialCommunityIcons" name="lock-question" size={50} color={Colors.blue_theme_Color} />
            </View>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Don't worry! Enter your email and we'll send you a link to reset your password.
            </Text>
          </View>

          {/* --- Input Section --- */}
          <View style={styles.inputSection}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              textColor={Colors.white_text_color}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="email-outline" color={Colors.gray_text_color} />}
              theme={inputTheme}
              outlineStyle={styles.inputOutline}
            />
          </View>

          {/* --- Action Section --- */}
          <Button
            mode="contained"
            onPress={handleForgetPassword}
            style={styles.button}
            labelStyle={styles.buttonText}
            disabled={ForgetPasswordLoading}
          >
            Recover Password
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* --- Loader Overlay --- */}
      {ForgetPasswordLoading && (
        <View style={styles.loaderOverlay}>
          <DashedLoader color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}

      {/* --- Confirmation Modal --- */}
      <ConfirmationAlert
        isVisible={isModalToastVisible}
        onClose={closeModal}
        onOK={onPressOk}
        successAnimation={successAnimation}
        message={message}
        showCancelButton={false}
      />
    </SafeAreaView>
  );
};

const inputTheme = {
  colors: {
    primary: Colors.blue_theme_Color,
    text: Colors.white_text_color,
    placeholder: Colors.grey_bg_Color,
    background: 'transparent',
    onSurfaceVariant: Colors.white_text_color,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_bg_Theme,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    width: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1C1F2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#2A2D3A',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 24,
  },
  inputSection: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#1C1F2A',
  },
  inputOutline: {
    borderRadius: 12,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.blue_theme_Color,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgotPassword;