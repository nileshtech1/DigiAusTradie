import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { logo, logo2, logo3, MainLogo } from '../../Assets/Images';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const navigateBasedOnLogin = async () => {
      try {
        const loginDataString = await AsyncStorage.getItem('userLoginData');
        console.log('loginDataString splash screen', loginDataString);
        
  
        if (loginDataString) {
          const loginData = JSON.parse(loginDataString);
          if (loginData) {
            // Navigate to Login after 2 seconds
            setTimeout(() => {
              navigation.replace('Login');
            }, 2000);
            return;
          }
        }
        // If no login data, navigate to OnBoardingScreen after 3 seconds
        setTimeout(() => {
          navigation.replace('OnBoardingScreen');
        }, 3000);
  
      } catch (error) {
        console.error('Failed to read login data:', error);
        // fallback to OnBoardingScreen
        setTimeout(() => {
          navigation.replace('OnBoardingScreen');
        }, 3000);
      }
    };
  
    navigateBasedOnLogin();
  }, [navigation]);
  
    

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Image
        source={MainLogo}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* <Text style={styles.appName}>Tradie</Text> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3498db',
    letterSpacing: 1,
  },
});