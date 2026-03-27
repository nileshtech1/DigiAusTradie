import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../Assets/Style/Color';

const ConfirmationAlert = ({ 
  isVisible, 
  onClose, 
  onOK, 
  successAnimation, 
  rejectedAnimation, 
  message, 
  showCancelButton = true,
  showOkButton = true,
  okText,
  cancelText
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Lottie Animation */}
          <LottieView
            source={successAnimation}  // Using the passed success animation
            autoPlay
            loop={true} // Continuous loop for animation
            style={styles.animation}
          />

          {/* Message */}
          <Text style={styles.message}>{message || 'Operation in progress...'}</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {showCancelButton && (
              <TouchableOpacity onPress={onClose} style={styles.Cancelbutton}>
                <Text style={styles.buttonText}>{cancelText || 'Cancel'}</Text>
              </TouchableOpacity>
            )}
            {
              showOkButton && (<TouchableOpacity onPress={onOK} style={styles.confirmbutton}>
              <Text style={styles.buttonText}>{okText || "OK"}</Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  animation: {
    width: "100%",
    height: 150,
    // marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  confirmbutton: {
    padding: 10,
    backgroundColor: Colors.blue_theme_Color,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 150,
  },
  Cancelbutton: {
    padding: 10,
    backgroundColor: Colors.pink_theme_color,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign : 'center'
  },
});

export default ConfirmationAlert;
