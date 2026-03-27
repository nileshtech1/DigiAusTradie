import React from 'react';
import { View, Text, Modal, StyleSheet, Button } from 'react-native';

const SmsAlertModal = ({
  visible,
  onClose,
  showSendButton = false,
  onSend,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Important!</Text>
          <Text style={styles.message}>
            Sending validation SMS to customer is required...
          </Text>

          {/* Conditionally show Send SMS */}
          {showSendButton && (
            <View style={styles.buttonContainer}>
              <Button title="Send SMS" onPress={onSend} color="#3182ce" />
            </View>
          )}

          {/* OK button always visible */}
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} color="#4A5568" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e53e3e',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#e53e3e',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
});

export default SmsAlertModal;
