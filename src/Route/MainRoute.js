import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Component/Login&registration/Login';
import MainDrawerScreen from './MainDrawerRoute';
import Profile from '../Component/Profile/Profile';
import ForgetPassword from '../Component/ForgetPassowrd/ForgetPassword';
import ResetScreen from '../Component/ForgetPassowrd/ResetScreen';
import { useSelector } from 'react-redux';
import ConfirmationAlert from '../ReusableComponent/ConfirmationAlert';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../Component/Login&registration/SplashScreen';
import OnBoardingScreen from '../Component/Login&registration/OnBoardingScreen';
import JobListingPage from '../Component/Login&registration/JobListingPage';
import JobDescription from '../Component/Login&registration/JobDescription';
import Signup from '../Component/Login&registration/Signup';
import Colors from '../Assets/Style/Color';
import QuoteDetails from '../Component/Dashboard/Revenue/QuotesDetails';
import Revenue from '../Component/Dashboard/Revenue/Revenue';
import XeroQuoteDetails from '../Component/Dashboard/Revenue/XeroQuoteDetails';
import Dashboard from '../Component/Dashboard/Dashboard';
import Notification from '../Component/Notification/Notification';
import NewContact from '../Component/RightSideBarComponent/New Contact/NewContact';
const successAnimation = require('../Assets/Images/LottieAnimation/loginsuccessful.json');

const Stack = createStackNavigator();

const MainRoute = () => {
  const { LoginData, LoginLoading, isLoggedin } = useSelector(
    state => state.Login,
  );
  const [message, setMessage] = useState('Login Successful');
  const [isModalToastVisible, setModalToastVisible] = useState(false);
  const [isNavigated, setIsNavigated] = useState(false);
  const { UserData } = useSelector(state => state.UserDetails);
  const errorMsg =
    'Access denied by Imunify360 bot-protection. IPs used for automation should be whitelisted';
  useEffect(() => {
    const storeToken = async () => {
      if (LoginData?.status === true) {
        await AsyncStorage.setItem('User', JSON.stringify(LoginData?.user));
        await AsyncStorage.setItem('Token', JSON.stringify(LoginData?.token));
      }
    };
    storeToken();
  }, [LoginData]);

  useEffect(() => {
    if (isLoggedin && !isNavigated && LoginData?.status === true) {
      setTimeout(() => {
        setIsNavigated(true);
      }, 1000);
    } else if (LoginData?.message == errorMsg) {
      // setIsNavigated(false);
      Alert.alert('Unable to login', 'Server issue');
    }
  }, [isLoggedin, isNavigated]);

  return (
    <NavigationContainer>
      {isLoggedin && LoginData?.status ? (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen
            name="DashboardDrawer"
            component={MainDrawerScreen}
            options={{ headerShown: false, animation: 'fade' }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen
            name="GetStarted"
            component={SplashScreen}
            options={{ headerShown: false, animation: 'fade' }}
          />
          <Stack.Screen
            name="OnBoardingScreen"
            component={OnBoardingScreen}
            options={{ headerShown: false, animation: 'fade' }}
          />
          <Stack.Screen
            name="JobListingPage"
            component={JobListingPage}
            options={{ headerShown: false, animation: 'fade' }}
          />
          <Stack.Screen
            name="JobDescription"
            component={JobDescription}
            options={{ headerShown: false, animation: 'fade' }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: true,
              animation: 'fade',
              headerStyle: {
                backgroundColor: Colors.grey_bg_Color, // yahan apna color daalo
              },
              headerTintColor: '#fff', // header text color
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, animation: 'fade' }}
          />
          <Stack.Screen
            name="Forgot Password"
            component={ForgetPassword}
            options={{
              headerShown: true,
              animation: 'fade',
              headerBackAccessibilityLabel: '',
              headerStyle: {
                backgroundColor: Colors.grey_bg_Color,
              },
              headerTitleStyle: {
                color: 'white',
              },
              headerTintColor: 'white',

              // 👇 Ye line add karein iOS me text hatane ke liye
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen
            name="Reset Password"
            component={ResetScreen}
            options={{
              headerShown: true,
              animation: 'fade',
              headerStyle: {
                backgroundColor: '#1c1c1c',
              },
              headerTitleStyle: {
                color: 'white',
              },
              headerTintColor: 'white',
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainRoute;
