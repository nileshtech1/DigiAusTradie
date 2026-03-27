import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import VectorIcon from './VectorIcon';
import Colors from '../Assets/Style/Color';
import {logo3, MainLogo, profileImagePlaceholder2} from '../Assets/Images';
import {useTimer} from './TimerContext';

const img = require('../Assets/Images/coffee-break.png');

const Header2 = ({
  notificationIcon = false,
  addContactIcon = false,
  backButton = false,
  route = null,
  backButtonPress,
  logoIcon
}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const {elapsedTime, isRunning} = useTimer();

  const formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };

  const openLeftDrawer = () => {
    navigation.openDrawer();
  };

  const hanleProfileCick = () => {
    setModalVisible(false);
    navigation.navigate('Profile');
  };
  const handleChangePassword = () => {
    setModalVisible(false);
    navigation.navigate('Change Password');
  };

  const handleLogoutClick = () => {
    navigation.navigate('Login');
    setModalVisible(false);
    setModalVisible1(false);
  };

  // Handle back button press
  const handleBackButton = () => {
    backButtonPress()
    // if (route) {
    //   navigation.navigate(route); // Navigate to the passed route if provided
    // } else {
    //   navigation.goBack(); // Go back in the navigation stack if no route is passed
    // }
  };

  return (
      <View style={styles.headerContainer}>
          <StatusBar
          barStyle="light-content" 
          backgroundColor={Colors.grey_bg_Color}
        />
        <View style={styles.headerLeft}>
          {backButton ? (
            <TouchableOpacity
              onPress={handleBackButton}
              style={styles.iconButton}>
              <Icon name="arrow-back" size={26} color={Colors.white_Icon_Color} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={openLeftDrawer}
              style={styles.iconButton}>
              <Icon name="menu" size={26} color={Colors.white_Icon_Color} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={logoIcon}
          style={styles.headerCenter}>
          <Image source={MainLogo} style={styles.logo} />
        </TouchableOpacity>
        {elapsedTime > 0 && isRunning && (
          <TouchableOpacity
            style={styles.timeContainer}
            onPress={() => navigation.navigate('Start Store')}>
            <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.headerRight}>
          {notificationIcon && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={styles.iconButton}>
              <Icon
                name="notifications"
                size={26}
                color={Colors.white_Icon_Color}
              />
            </TouchableOpacity>
          )}
          {
            addContactIcon && (
            <TouchableOpacity
            onPress={() => navigation.navigate('New Contact')}
            style={styles.iconButton}>
            <VectorIcon
              icon="MaterialIcons"
              name="add"
              size={26}
              color={Colors.white_Icon_Color}
            />
          </TouchableOpacity>
            )
          }
          
        </View>

        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={profileImagePlaceholder2}
                style={styles.logo1}
                resizeMode="contain"
              />
              <Text style={styles.modalText1}>John Doe</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}>
                <VectorIcon
                  icon="FontAwesome"
                  name="times"
                  size={22}
                  color={Colors.white_Icon_Color}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={hanleProfileCick}>
                <VectorIcon
                  icon="FontAwesome"
                  name="user"
                  size={22}
                  color={Colors.white_Icon_Color}
                />
                <Text style={styles.modalText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={handleChangePassword}>
                <VectorIcon
                  icon="FontAwesome"
                  name="lock"
                  size={22}
                  color={Colors.white_Icon_Color}
                />
                <Text style={styles.modalText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(true);
                  setModalVisible(false);
                }}
                style={styles.modalItem}>
                <VectorIcon
                  icon="FontAwesome"
                  name="sign-out"
                  size={22}
                  color={Colors.white_Icon_Color}
                />
                <Text style={styles.modalText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={modalVisible1}
          animationType="slide"
          onRequestClose={() => setModalVisible1(false)}>
          <View style={styles.modalOverlayLog}>
            <View style={styles.modalContentLog}>
              <Text style={styles.modalTextLog}>
                Are you sure you want to logout?
              </Text>
              <View style={styles.modalActionsLog}>
                <TouchableOpacity
                  style={[styles.modalButtonLog, styles.cancelButtonLog]}
                  onPress={() => setModalVisible1(false)}>
                  <Text style={styles.buttonTextLog}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButtonLog, styles.confirmButtonLog]}
                  onPress={handleLogoutClick}>
                  <Text style={styles.buttonTextLog}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingVertical: 20, // Slightly more padding for a comfortable look
    backgroundColor: Colors.grey_bg_Color, // Dark background for black theme
    elevation: 5, // Add elevation to create a shadow effect on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Slight shadow offset for a floating effect
    shadowOpacity: 0.1, // Light opacity for shadow to make it subtle
    shadowRadius: 5, // Soft shadow radius
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    borderLeftWidth: 0.5,
    borderLeftColor: '#444', // Slightly lighter border for contrast
    borderRightWidth: 0.5,
    borderRightColor: '#444', // Slightly lighter border for contrast
    borderBottomWidth: 0.5,
    borderBottomColor: '#444', // Slightly lighter border for contrast
    paddingHorizontal: 30,
    position: 'relative', // Ensures the header stays in place
    zIndex: 1, // Ensures the header stays on top of other elements
  },
  
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 100,
    resizeMode: 'contain',
  },
  iconButton: {
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
    paddingTop: 60,
    paddingRight: 10,
  },
  logo1: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 200,
    borderRadius: 10,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: 180,
  },
  modalText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#000',
  },
  modalText1: {
    width: '100%',
    fontSize: 18,
    // marginLeft: 10,
    color: '#000',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    padding: 10,
  },

  modalOverlayLog: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentLog: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTextLog: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActionsLog: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonLog: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonLog: {
    backgroundColor: Colors.begonia_color,
  },
  confirmButtonLog: {
    backgroundColor: Colors.theme_background_dark,
  },
  buttonTextLog: {
    color: '#fff',
    fontSize: 16,
  },
  timeContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    elevation: 5,
    borderWidth: 0.7,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  timeText: {
    fontSize: 15,
    color: Colors.black_text_color,
    fontWeight: 'bold',
  },
});

export default Header2;