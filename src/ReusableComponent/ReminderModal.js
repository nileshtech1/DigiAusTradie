import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Colors from '../Assets/Style/Color';

const ReminderModal = ({
  visible,
  onClose,
  data = [],
  onSendReminder,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Upcoming Job's Reminders</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Reminders List */}
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.reminderCard}>
                <Text style={styles.label}>
                  <Text style={styles.labelBold}>Customer:</Text> {item.customer_name}
                </Text>
                <Text style={styles.label}>
                  <Text style={styles.labelBold}>Date:</Text> {item.date}
                </Text>
                <Text style={styles.label}>
                  <Text style={styles.labelBold}>Start Time:</Text> {item.start_time}
                </Text>
                <Text style={styles.label}>
                  <Text style={styles.labelBold}>Address:</Text> {item?.quotation?.category_address}
                </Text>
                <TouchableOpacity
                  onPress={() => onSendReminder(item)}
                  style={styles.sendButton}
                >
                  <Text style={styles.sendButtonText}>Send Reminder</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  closeButton: {
    fontSize: 19,
    color: Colors.red_crayola_color,
    fontWeight: 'bold',
  },
  reminderCard: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'serif',
    color: 'white',
  },
  labelBold: {
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: 'white',
  },
  sendButton: {
    marginTop: 12,
    backgroundColor: Colors.green_color,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'serif',
  },
});

export default ReminderModal;
