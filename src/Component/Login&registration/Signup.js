import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { ActivityIndicator, TextInput, Icon } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Assets/Style/Color';
import { useDispatch, useSelector } from 'react-redux';
import { SignUpApi } from '../../Redux/API/SignUpApi';
import ToastAlert from '../../ReusableComponent/ToastAlert';

const Signup = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [abn, setAbn] = useState('');
  const [gst, setGst] = useState('');
  const [logo, setLogo] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState('');

  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { SignUpLoading } = useSelector(state => state.SignUp);
  const dispatch = useDispatch();

  const handleChooseLogo = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (response.didCancel || response.errorCode) {
        return;
      }
      if (response.assets?.length > 0) {
        setLogo(response.assets[0]);
        setErrors(prev => ({ ...prev, logo: '' }));
      }
    });
  };
  
  const handleRemoveLogo = () => {
    setLogo(null);
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email';
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length > 10) {
      newErrors.password = 'Password must be max 10 characters';
      valid = false;
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone is required';
      valid = false;
    } else {
      const ausPhoneRegex = /^(?:\+?61|0)[2-478]\d{8}$/;
      if (!ausPhoneRegex.test(phone)) {
        newErrors.phone = 'Please enter a valid Australian contact number';
        valid = false;
      }
    }
    if (!logo) {
      newErrors.logo = 'Profile image is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('ABN', abn);
    formData.append('GST', gst);
    if (logo) {
      formData.append('logo', {
        uri: logo.uri,
        type: logo.type || 'image/jpeg',
        name: logo.fileName || 'profile.jpg',
      });
    }

    try {
      const res = await dispatch(SignUpApi(formData)).unwrap();
      if (res?.status === true) {
        setSuccessAlertVisible(true);
        setSuccessAlertMessage(res?.message);
      } else {
        setAlertVisible(true);
        setAlertMessage(res?.response.data.message);
      }
    } catch (error) {
    }
  };
   const handleMsgAlertClose = () => {
    navigation.navigate('Login');
    setSuccessAlertVisible(false);
    setSuccessAlertMessage('');
   };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContainer}
      enableOnAndroid={true}
      extraScrollHeight={150}
      extraHeight={150}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: Colors.black_bg_Theme }}
    >
      <View style={styles.formContainer}>
        <Text style={styles.headerTitle}>Create Account</Text>
        <Text style={styles.headerSubtitle}>
          Join us today and grow your business with ease.
        </Text>

        <View style={styles.profileImageContainer}>
            {logo ? (
                <ImageBackground
                    source={{ uri: logo.uri }}
                    style={styles.profileImagePreview}
                    imageStyle={{ borderRadius: 60 }}
                >
                    <TouchableOpacity
                        style={styles.removeIconContainer}
                        onPress={handleRemoveLogo}
                    >
                        <Icon source="close" size={20} color="#FFF" />
                    </TouchableOpacity>
                </ImageBackground>
            ) : (
                <TouchableOpacity
                    style={styles.profileImagePlaceholder}
                    onPress={handleChooseLogo}
                >
                    <Icon source="camera" size={40} color={Colors.blue_theme_Color} />
                </TouchableOpacity>
            )}
        </View>
        {errors.logo && <Text style={styles.errorTextCenter}>{errors.logo}</Text>}

        <TextInput
          label="First Name*"
          value={firstName}
          onChangeText={text => {
            setFirstName(text);
            setErrors(prev => ({ ...prev, firstName: '' }));
          }}
          style={styles.input}
          textColor={Colors.white_text_color}
          mode="outlined"
          left={<TextInput.Icon icon="account" color={Colors.blue_theme_Color} />}
          theme={{ colors: { primary: Colors.blue_theme_Color } }}
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

        <TextInput
          label="Last Name*"
          value={lastName}
          onChangeText={text => {
            setLastName(text);
            setErrors(prev => ({ ...prev, lastName: '' }));
          }}
          style={styles.input}
          textColor={Colors.white_text_color}
          mode="outlined"
          left={<TextInput.Icon icon="account" color={Colors.blue_theme_Color} />}
          theme={{ colors: { primary: Colors.blue_theme_Color } }}
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

        <TextInput
          label="Email*"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setErrors(prev => ({ ...prev, email: '' }));
          }}
          style={styles.input}
          textColor={Colors.white_text_color}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          left={<TextInput.Icon icon="email" color={Colors.blue_theme_Color} />}
          theme={{ colors: { primary: Colors.blue_theme_Color } }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          label="Password*"
          value={password}
          secureTextEntry={!isPasswordVisible}
          onChangeText={text => {
            setPassword(text);
            setErrors(prev => ({ ...prev, password: '' }));
          }}
          style={styles.input}
          textColor={Colors.white_text_color}
          mode="outlined"
          maxLength={10}
          left={<TextInput.Icon icon="lock" color={Colors.blue_theme_Color} />}
          right={
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye' : 'eye-off'}
              color={Colors.blue_theme_Color}
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            />
          }
          theme={{ colors: { primary: Colors.blue_theme_Color } }}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TextInput
          label="Confirm Password*"
          value={confirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
          onChangeText={text => {
            setConfirmPassword(text);
            setErrors(prev => ({ ...prev, confirmPassword: '' }));
          }}
          style={styles.input}
          textColor={Colors.white_text_color}
          mode="outlined"
          maxLength={10}
          left={<TextInput.Icon icon="lock" color={Colors.blue_theme_Color} />}
          right={
            <TextInput.Icon
              icon={isConfirmPasswordVisible ? 'eye' : 'eye-off'}
              color={Colors.blue_theme_Color}
              onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
            />
          }
          theme={{ colors: { primary: Colors.blue_theme_Color } }}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}

        <TextInput
          label="Phone*"
          value={phone}
          onChangeText={text => {
            setPhone(text);
            setErrors(prev => ({ ...prev, phone: '' }));
          }}
          style={styles.input}
          textColor={Colors.white_text_color}
          mode="outlined"
          keyboardType="numeric"
          left={<TextInput.Icon icon="phone" color={Colors.blue_theme_Color} />}
          theme={{ colors: { primary: Colors.blue_theme_Color } }}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <TextInput
          label="ABN (Optional)"
          value={abn}
          onChangeText={setAbn}
          style={styles.input}
          textColor={Colors.white_text_color}
          mode="outlined"
          keyboardType="numeric"
          left={<TextInput.Icon icon="briefcase" color={Colors.blue_theme_Color} />}
          theme={{ colors: { primary: Colors.blue_theme_Color } }}
        />

        <TextInput
          label="GST (Optional)"
          value={gst}
          onChangeText={setGst}
          style={styles.input}
          textColor={Colors.white_text_color}
          mode="outlined"
          left={<TextInput.Icon icon="receipt" color={Colors.blue_theme_Color} />}
          theme={{ colors: { primary: Colors.blue_theme_Color } }}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('Login')}>
            Sign in
          </Text>
        </Text>

        {SignUpLoading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color={Colors.blue_theme_Color} />
            <Text style={{ color: '#FFF', marginTop: 10 }}>
              Almost there! Setting up your profile...
            </Text>
          </View>
        )}
        
        {alertVisible && (
          <ToastAlert
            message={alertMessage}
            visible={alertVisible}
            onClose={() => setAlertVisible(false)}
          />
        )}
        
        {successAlertVisible && (
          <ToastAlert
            message={successAlertMessage}
            visible={successAlertVisible}
            onClose={handleMsgAlertClose}
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.black_bg_Theme,
    paddingVertical: 30,
    paddingBottom: 100,
  },
  formContainer: {
    width: '88%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white_text_color,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 4,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 60,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.blue_theme_Color,
    borderStyle: 'dotted',
  },
  profileImagePreview: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    padding: 4,
  },
  input: {
    width: '100%',
    marginTop: 8,
    backgroundColor: Colors.black_bg_Theme,
  },
  errorText: {
    color: Colors.pink_theme_color,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  errorTextCenter: {
    color: Colors.pink_theme_color,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.blue_theme_Color,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    color: Colors.blue_theme_Color,
    fontWeight: '600',
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    borderRadius: 16,
  },
});

export default Signup;