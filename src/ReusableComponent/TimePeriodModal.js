import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Colors from '../Assets/Style/Color';

const TimePeriodModal = ({ visible, onClose, onSelectTimePeriod, setComparisonModal, handleFilterOption }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.toLocaleString('default', { month: 'short' });

  const formatDate = (date) => date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const getStartOfQuarter = (month) => {
    const quarter = Math.floor(month / 3);
    return new Date(today.getFullYear(), quarter * 3, 1);
  };

  const getEndOfQuarter = (month) => {
    const quarter = Math.floor(month / 3);
    return new Date(today.getFullYear(), quarter * 3 + 3, 0);
  };

  const getPreviousQuarterRange = () => {
    let quarter = Math.floor(today.getMonth() / 3);
    let startMonth = (quarter - 1 + 4) % 4 * 3;
    let year = quarter === 0 ? currentYear - 1 : currentYear;
    let start = new Date(year, startMonth, 1);
    let end = new Date(year, startMonth + 3, 0);
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const timePeriods = [
    { label: 'This month', range: `${currentMonth} ${currentYear}` },
    { label: 'This quarter', range: `${formatDate(getStartOfQuarter(today.getMonth()))} - ${formatDate(getEndOfQuarter(today.getMonth()))}` },
    { label: 'This financial year', range: `1 Jul ${today.getMonth() < 6 ? currentYear - 1 : currentYear} - 30 Jun ${today.getMonth() < 6 ? currentYear : currentYear + 1}` },
    { label: 'Last month', range: `${new Date(today.getFullYear(), today.getMonth() - 1, 1).toLocaleString('default', { month: 'short' })} ${today.getMonth() === 0 ? currentYear - 1 : currentYear}` },
    { label: 'Last quarter', range: getPreviousQuarterRange() },
    { 
    label: 'Last financial year', 
    range: `1 Jul ${today.getMonth() < 6 ? currentYear - 2 : currentYear - 1} - 30 Jun ${today.getMonth() < 6 ? currentYear - 1 : currentYear}` 
  },
    // { label: 'Month to date', range: `1 ${currentMonth} ${currentYear}` },
    // { label: 'Quarter to date', range: `${formatDate(getStartOfQuarter(today.getMonth()))}` },
    // { label: 'Year to date', range: `1 Jul ${today.getMonth() < 6 ? currentYear - 1 : currentYear} - ${formatDate(today)}` },
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalContainer} onPress={() => setComparisonModal(false)}>
        <View style={styles.modalContent}>
          <ScrollView>
            {timePeriods.map((period, index) => (
              <TouchableOpacity
                key={index}
                style={styles.timePeriodButton}
                onPress={() => onSelectTimePeriod(period)}>
                <View style={{ flex: 0.8 }}>
                  <Text style={styles.timePeriodText}>{period.label}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.timePeriodRange}>{period.range}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    backgroundColor: Colors.blue_theme_Color,
    padding: 10,
    marginTop: 10,
  },
  closeText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  timePeriodButton: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  timePeriodText: {
    fontSize: 14,
    fontWeight: '500',
  },
  timePeriodRange: {
    fontSize: 14,
    color: Colors.blue_theme_Color,
    fontWeight: '500',
  },
});

export default TimePeriodModal;
