import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const TooltipModal = ({ visible, message, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose} // Close tooltip when pressing back button on Android
    >
      <View style={styles.tooltipWrapper}>
        <View style={styles.tooltipContainer}>
          <Text style={styles.tooltipText}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  tooltipWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  tooltipContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: 300,
    alignItems: 'center',
  },
  tooltipText: {
    color: '#424242FF',
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#4285F4',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
};

export default TooltipModal;
