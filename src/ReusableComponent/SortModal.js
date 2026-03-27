// SortModal.js (Reusable Component)

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SortModal = ({ visible, onClose, onSort }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Sort Contacts</Text>
          
          <TouchableOpacity style={styles.option} onPress={() => onSort('name')}>
            <Text style={styles.optionText}>Sort by Name</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => onSort('date')}>
            <Text style={styles.optionText}>Sort by Date</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: 'blue',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SortModal;
