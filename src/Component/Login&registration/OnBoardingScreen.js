import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  firstSwipperLottie,
  lanugageLottie,
  secondSwipperLottie,
} from '../../Assets/Images/LottieAnimation';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../Assets/Style/Color';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Manage Jobs Easily',
    subtitle: 'Create, track, and complete jobs in one place with Tradie.',
    animation: lanugageLottie,
  },
  {
    id: '2',
    title: 'Send Invoices & Get Paid',
    subtitle: 'Generate GST-ready invoices and accept card or PayID payments.',
    animation: firstSwipperLottie,
  },
  {
    id: '3',
    title: 'Get Discovered',
    subtitle:
      'Your business is listed in the free Tradie Directory automatically.',
    animation: secondSwipperLottie,
  },
];

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     try {
  //       const loginDataString = await AsyncStorage.getItem('userLoginData');
  //       if (loginDataString) {
  //         const loginData = JSON.parse(loginDataString);
  //         if (loginData) {
  //           navigation.navigate('Login');
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Failed to read login data:', error);
  //     }
  //   };
  
  //   checkLogin();
  // }, []);
  
  

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <LottieView
        source={item.animation}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'#121212'} />
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {currentIndex === slides.length - 1 ? (
        <TouchableOpacity
          style={styles.getStartedBtn}
          onPress={() => navigation.replace('JobListingPage')}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.replace('JobListingPage')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            onPress={() =>
              flatListRef.current.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
              })
            }
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  lottie: {
    width: width * 0.9,
    height: height * 0.55,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#EAEAEA',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#A9A9A9',
    textAlign: 'center',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#555',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.blue_theme_Color,
    width: 20,
    height: 8,
    borderRadius: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  skipText: {
    fontSize: 16,
    color: Colors.blue_theme_Color,
    fontWeight: '600',
  },
  nextText: {
    fontSize: 16,
    color: Colors.blue_theme_Color,
    fontWeight: '600',
  },
  getStartedBtn: {
    backgroundColor: Colors.blue_theme_Color,
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 50,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});