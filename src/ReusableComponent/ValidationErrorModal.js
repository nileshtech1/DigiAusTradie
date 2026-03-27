import React from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import VectorIcon from './VectorIcon';
import Colors from '../Assets/Style/Color';

const ValidationErrorModal = ({ visible, errors, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <StatusBar
        backgroundColor={'rgba(0, 0, 0, 0.8)'}
        barStyle="light-content"
      />
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <VectorIcon
              icon="FontAwesome"
              name="exclamation-triangle"
              size={26}
              color={Colors.red_crayola_color}
            />
            <Text style={styles.title}>Validation Errors</Text>
          </View>

          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            {Array.isArray(errors) && errors.length > 0 ? (
              errors.map((err, index) => (
                <View key={index} style={styles.errorRow}>
                  <VectorIcon
                    icon="FontAwesome"
                    name="times-circle"
                    size={18}
                    color={Colors.red_crayola_color}
                  />
                  <Text style={styles.errorText}>{err}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noErrorsText}>
                No specific errors to display.
              </Text>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Got It</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ValidationErrorModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '88%',
    maxHeight: '80%',
    backgroundColor: Colors.bgwhite,
    borderRadius: 15,
    elevation: 8,
    shadowColor: Colors.box_shadow_color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cultured_f6f6f6_color,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bright_gray_color,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black_text_color,
    marginLeft: 12,
  },
  scroll: {
    maxHeight: 250,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  errorText: {
    color: Colors.text_color,
    marginLeft: 12,
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  noErrorsText: {
    textAlign: 'center',
    color: Colors.gray_text_color,
    fontSize: 16,
    paddingVertical: 20,
  },
  footer: {
    padding: 15,
    backgroundColor: Colors.bgwhite,
    borderTopWidth: 1,
    borderTopColor: Colors.bright_gray_color,
    alignItems: 'flex-end',
  },
  closeButton: {
    backgroundColor: Colors.blue_theme_Color,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 4,
    shadowColor: Colors.blue_theme_Color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  closeText: {
    color: Colors.white_text_color,
    fontWeight: 'bold',
    fontSize: 16,
  },
});