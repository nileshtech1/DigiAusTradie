import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const TimePickerModal = ({ visible, onClose, onSave, initialTime }) => {
  const hoursOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minOptions = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  const daySectionOptions = ['AM', 'PM'];

  const [selectedHour, setSelectedHour] = useState(initialTime?.hour || '12');
  const [selectedMin, setSelectedMin] = useState(initialTime?.minute || '00');
  const [selectedDaySection, setSelectedDaySection] = useState(initialTime?.daySection || 'AM');

  const renderInfiniteScroll = (options, selectedValue, onSelect) => {
    const extendedOptions = [...options, ...options, ...options,  ...options, ...options, ...options, ...options,  ...options]; // Extend to mimic infinite scroll
    return (
      <FlatList
        data={extendedOptions}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={50} // Adjust item height
        contentContainerStyle={styles.scrollContainer}
        getItemLayout={(data, index) => ({
          length: 50, // Item height
          offset: 50 * index,
          index,
        })}
        initialScrollIndex={options.indexOf(selectedValue)}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / 50) % options.length;
          onSelect(options[index]);
        }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.optionContainer,
              item === selectedValue && styles.selectedOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                item === selectedValue && styles.selectedOptionText,
              ]}
            >
              {item}
            </Text>
          </View>
        )}
      />
    );
  };

  const renderDaySection = () => (
    <FlatList
      data={daySectionOptions}
      keyExtractor={(item) => item}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.optionContainer,
            item === selectedDaySection && styles.selectedOption,
          ]}
          onPress={() => setSelectedDaySection(item)}
        >
          <Text
            style={[
              styles.optionText,
              item === selectedDaySection && styles.selectedOptionText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  const handleSave = () => {
    onSave({ hour: selectedHour, minute: selectedMin, daySection: selectedDaySection });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Time</Text>
          <View style={styles.pickerContainer}>
            <View style={styles.focusBorder}>
              {renderInfiniteScroll(hoursOptions, selectedHour, setSelectedHour)}
            </View>
            <View style={styles.focusBorder}>
              {renderInfiniteScroll(minOptions, selectedMin, setSelectedMin)}
            </View>
            <View style={styles.focusBorder}>
            {renderInfiniteScroll(daySectionOptions, selectedDaySection, setSelectedDaySection)}
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 320,
    height: 280,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  focusBorder: {
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 5,
    width: 80,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  optionContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedOption: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal : 10
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TimePickerModal;
