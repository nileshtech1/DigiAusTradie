import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Colors from '../Assets/Style/Color';
import VectorIcon from './VectorIcon';

const BottomSheetModal = ({ visible, onClose, onTakePhoto, onSelectFromGallery }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.option} onPress={onTakePhoto}>
          <VectorIcon icon="FontAwesome" name="camera" size={20} color={Colors.theme_background_dark}/>
          <Text style={styles.text}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={onSelectFromGallery}>
          <VectorIcon icon="FontAwesome" name="photo" size={20} color={Colors.theme_background_dark}/>
          <Text style={styles.text}>Select from Gallery</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.theme_background_dark,
  },
});

export default BottomSheetModal;
