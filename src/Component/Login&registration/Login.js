import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  StatusBar,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import LoginStyle from './LoginStyle';
import {useNavigation} from '@react-navigation/native';
import VectorIcon from '../../ReusableComponent/VectorIcon';
import Colors from '../../Assets/Style/Color';
import {useDispatch, useSelector} from 'react-redux';
import {googleLoginApi, LoginApi} from '../../Redux/API/LoginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserDetailsApi} from '../../Redux/API/GetUserDetailsApi';
import {TextInput} from 'react-native-paper';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {apple, google, logo, logo2, MainLogo} from '../../Assets/Images';
import ConfirmationAlert from '../../ReusableComponent/ConfirmationAlert';
import {SignUpApi} from '../../Redux/API/SignUpApi';
import {SafeAreaView} from 'react-native-safe-area-context';
import DashboardStyle from '../../utils/Stylesheet/DashboardStyle';
import DashedLoader from '../../ReusableComponent/DashedLoader';
import appleAuth from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth'

const successAnimation = require('../../Assets/Images/LottieAnimation/loginsuccessful.json');

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isModalToastVisible, setModalToastVisible] = useState(false);
  const [message, setMessage] = useState('Login Successful');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

  const {LoginLoading, isError} = useSelector(state => state.Login);
  const dispatch = useDispatch();

  const [sessionFetched, setSessionFetched] = useState(false);

  useEffect(() => {
    const fetchAndNavigate = async () => {
      try {
        const loginDataString = await AsyncStorage.getItem('userLoginData');

        if (loginDataString) {
          const loginData = JSON.parse(loginDataString);
          if (loginData && loginData != undefined && !sessionFetched) {
            try {
              dispatch(LoginApi(loginData)).then(async data => {
                if (data?.payload?.status === true) {
                  await AsyncStorage.setItem(
                    'User',
                    JSON.stringify(data.payload?.user),
                  );
                  await AsyncStorage.setItem(
                    'Token',
                    JSON.stringify(data.payload?.token),
                  );
                  dispatch(UserDetailsApi(data.payload?.token));
                }
              });
            } catch (error) {
              await AsyncStorage.removeItem('userLoginData');
              await AsyncStorage.removeItem('Token');
              await AsyncStorage.removeItem('User');
              navigation.navigate('DashboardDrawer');
            }
          }
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error retrieving login data:', error);
        navigation.navigate('OnBoardingScreen');
      } finally {
        setSessionFetched(false);
      }
    };

    fetchAndNavigate();
  }, [dispatch, navigation, sessionFetched]);

  const handleLogin = () => {
    let valid = true;
    setLoginFailed(false);

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    const postData = {email, password};

    try {
      AsyncStorage.setItem('userLoginData', JSON.stringify(postData));
    } catch (error) {
      console.error('Error saving login data:', error);
    }

    dispatch(LoginApi(postData)).then(async data => {
      if (data?.payload?.status === true) {
        setModalToastVisible(true);
        await AsyncStorage.setItem('User', JSON.stringify(data.payload?.user));
        await AsyncStorage.setItem(
          'Token',
          JSON.stringify(data.payload?.token),
        );
        dispatch(UserDetailsApi(data.payload?.token));
        setTimeout(() => {
          setModalToastVisible(false);
        }, 1000);
      } else {
        setLoginFailed(true);
      }
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      GoogleSignin.signOut();
  
      const userInfo = await GoogleSignin.signIn();
  
      // CASE: If Google returns { type: "cancelled", data: null }
      if (userInfo?.type === "cancelled") {
        Alert.alert(
          "Login Cancelled",
          "You’ve cancelled the Google sign-in."
        );
        return;
      }
  
      console.log("User Info:", userInfo);
  
      const user = userInfo?.data?.user;
  
      const postData = {
        first_name: user?.givenName,
        last_name: user?.familyName,
        email: user?.email,
        google_id: user?.id,
        password: user?.givenName,
      };
  
      await AsyncStorage.setItem("userLoginData", JSON.stringify(postData));
  
      dispatch(googleLoginApi(postData)).then(async data => {
        if (data?.payload?.status === true) {
          setModalToastVisible(true);
  
          await AsyncStorage.setItem("User", JSON.stringify(data.payload?.user));
          await AsyncStorage.setItem("Token", JSON.stringify(data.payload?.token));
  
          dispatch(UserDetailsApi(data.payload?.token));
  
          setTimeout(() => setModalToastVisible(false), 1000);
        } else {
          setLoginFailed(true);
        }
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available or outdated");
      } else {
        console.error("Some other error happened:", error);
      }
    }
  };

  // रैंडम स्ट्रिंग जनरेट करने के लिए फंक्शन
function generateNonce(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const handleAppleLogin = async () => {
  try {
    const rawNonce = generateNonce(32);
    
    // 1. Apple Request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      nonce: rawNonce,
    });

    const { identityToken, fullName, email } = appleAuthRequestResponse;

    // 2. Firebase Sign-in
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, rawNonce);
    const userCredential = await auth().signInWithCredential(appleCredential);
    const firebaseUser = userCredential.user;

    // 3. डेटा तैयार करें
    // Apple नियम: fullName और email सिर्फ पहली बार मिलते हैं।
    // अगर अगली बार लॉगिन करेंगे तो ये null होंगे, तब हम Firebase से लेंगे।
    const postData = {
      first_name: fullName?.givenName || firebaseUser.displayName?.split(' ')[0] || 'Apple',
      last_name: fullName?.familyName || firebaseUser.displayName?.split(' ')[1] || 'User',
      email: firebaseUser.email || email,
      google_id: firebaseUser.uid, // बैकएंड पर 'apple_id' नाम की फील्ड बनवा लें
      password: firebaseUser.uid, // सोशल लॉगिन के लिए डमी पासवर्ड
    };

    console.log("Sending to Backend:", postData);

    // 4. अपनी API Call करें (आप googleLoginApi का नाम बदलकर socialLoginApi भी कर सकते हैं)
    dispatch(googleLoginApi(postData)).then(async (data) => {
      if (data?.payload?.status === true) {
        setModalToastVisible(true);
        setMessage("Apple Login Successful");

        await AsyncStorage.setItem("User", JSON.stringify(data.payload?.user));
        await AsyncStorage.setItem("Token", JSON.stringify(data.payload?.token));
        await AsyncStorage.setItem("userLoginData", JSON.stringify(postData));

        dispatch(UserDetailsApi(data.payload?.token));

        setTimeout(() => {
          setModalToastVisible(false);
          navigation.navigate('DashboardDrawer');
        }, 1000);
      } else {
        Alert.alert("Login Failed", data?.payload?.message || "Backend error");
      }
    });

  } catch (error) {
    if (error.code === appleAuth.Error.CANCELED) {
      console.log('User cancelled');
    } else {
      Alert.alert("Apple Login Error", error.message);
    }
  }
};
  

  const onPressOk = () => {
    setModalToastVisible(false);
    console.log('Pressed OK button');
    
    navigation.navigate('DashboardDrawer');
  };
 

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar
      barStyle="light-content"
      backgroundColor={Colors.eerie_black_color}
    />
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* --- Header Section --- */}
        <View style={styles.headerContainer}>
          <Image source={MainLogo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your journey
          </Text>
        </View>
  
        {/* --- Input Section --- */}
        <View style={styles.inputSection}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            style={styles.input}
            textColor={Colors.white_text_color}
            keyboardType="email-address"
            autoCapitalize="none"
            mode="outlined"
            left={
              <TextInput.Icon
                icon="email-outline"
                color={Colors.gray_text_color}
              />
            }
            theme={inputTheme}
            outlineStyle={styles.inputOutline}
            error={!!emailError}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
  
          <TextInput
            label="Password"
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            style={styles.input}
            textColor={Colors.white_text_color}
            secureTextEntry={!isPasswordVisible}
            mode="outlined"
            left={
              <TextInput.Icon
                icon="lock-outline"
                color={Colors.gray_text_color}
              />
            }
            right={
              <TextInput.Icon
                icon={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                color={Colors.gray_text_color}
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              />
            }
            theme={inputTheme}
            outlineStyle={styles.inputOutline}
            error={!!passwordError}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
  
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() => navigation.navigate('Forgot Password')}>
            <Text style={styles.forgotPasswordText}>Forgotten your password?</Text>
          </TouchableOpacity>
        </View>
  
        {/* --- Actions Section --- */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign in</Text>
          </TouchableOpacity>
  
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>
  
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleSignIn}>
              <Image source={google} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleAppleLogin}>
               <VectorIcon
              icon="FontAwesome"
              name="apple"
              size={35}
              color={Colors.white_Icon_Color}
            />
            </TouchableOpacity>
          </View>
        </View>
  
        {/* --- Footer Section --- */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  
    {/* --- Loading Overlay --- */}
    {LoginLoading && (
      <View style={DashboardStyle.loaderContainer}>
        <View style={DashboardStyle.loader}>
          <DashedLoader color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      </View>
    )}
  
    {/* --- Confirmation Modal --- */}
    <ConfirmationAlert
      isVisible={isModalToastVisible}
      onOK={onPressOk}
      successAnimation={successAnimation}
      message={message}
      showCancelButton={false}
    />
  </SafeAreaView>
  
  );
};

// --- Custom Theme for TextInput ---
const inputTheme = {
  colors: {
    primary: Colors.blue_theme_Color,
    text: Colors.white_text_color,
    placeholder: Colors.gray_text_color,
    background: 'transparent',
    onSurfaceVariant: Colors.gray_text_color,
  },
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_bg_Theme,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white_text_color,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray_text_color,
  },
  inputSection: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.black_bg_Theme,
    marginBottom: 5,
  },
  inputOutline: {
    borderRadius: 12,
    borderWidth: 1.5,
  },
  errorText: {
    color: Colors.red_crayola_color,
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: Colors.blue_theme_Color,
    fontSize: 14,
    fontWeight: '600',
  },
  actionsSection: {
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: Colors.blue_theme_Color,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: Colors.blue_theme_Color,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: {height: 4, width: 0},
  },
  loginButtonText: {
    color: Colors.white_text_color,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.charcol_color,
  },
  dividerText: {
    color: Colors.gray_text_color,
    marginHorizontal: 15,
    fontSize: 14,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  socialButton: {
    borderWidth: 1.5,
    borderColor: Colors.charcol_color,
    borderRadius: 100,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  appleButton: {
    width: 60,
    height: 60,
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: Colors.gray_text_color,
    fontSize: 15,
  },
  footerLink: {
    color: Colors.blue_theme_Color,
    fontSize: 15,
    fontWeight: 'bold',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
