import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Checkbox, RadioButton } from 'react-native-paper';
import Colors from '../Assets/Style/Color';

const SettingsModal = ({ visible, onClose, onSelectOption }) => {
  const [radioSelection, setRadioSelection] = useState('Accrual');
  const [checkboxSelection, setCheckboxSelection] = useState({
    percentageOfTradingIncome: true,
    accountingBasis : false,
    accountingCodes : false,
    decimals : false,
    total : false,
    yearToDate : false,
  });

  const handleRadioChange = (label) => {
    setRadioSelection(label);
    onSelectOption(label);
  };

  const handleCheckboxChange = (label) => {
    setCheckboxSelection((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
    onSelectOption(radioSelection);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Section for Accounting Basis */}
          <Text style={styles.sectionTitle}>Accounting basis</Text>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleRadioChange('Accrual')}>
            <RadioButton
              value="Accrual"
              status={radioSelection === 'Accrual' ? 'checked' : 'unchecked'}
              onPress={() => handleRadioChange('Accrual')}
            />
            <Text style={styles.optionText}>Accrual</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleRadioChange('Cash')}>
            <RadioButton
              value="Cash"
              status={radioSelection === 'Cash' ? 'checked' : 'unchecked'}
              onPress={() => handleRadioChange('Cash')}
            />
            <Text style={styles.optionText}>Cash</Text>
          </TouchableOpacity>

          {/* Section for Show */}
          <Text style={styles.sectionTitle}>Show</Text>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleCheckboxChange('accountingBasis')}>
            <Checkbox
              status={
                checkboxSelection.accountingBasis ? 'checked' : 'unchecked'
              }
              onPress={() => handleCheckboxChange('accountingBasis')}
            />
            <Text style={styles.optionText}>Accounting Basis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleCheckboxChange('accountingCodes')}>
            <Checkbox
              status={
                checkboxSelection.accountingCodes ? 'checked' : 'unchecked'
              }
              onPress={() => handleCheckboxChange('accountingCodes')}
            />
            <Text style={styles.optionText}>Accounting Codes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleCheckboxChange('decimals')}>
            <Checkbox
              status={
                checkboxSelection.decimals ? 'checked' : 'unchecked'
              }
              onPress={() => handleCheckboxChange('decimals')}
            />
            <Text style={styles.optionText}>Decimals</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleCheckboxChange('percentageOfTradingIncome')}>
            <Checkbox
              status={
                checkboxSelection.percentageOfTradingIncome ? 'checked' : 'unchecked'
              }
              onPress={() => handleCheckboxChange('percentageOfTradingIncome')}
            />
            <Text style={styles.optionText}>Percentage of trading income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleCheckboxChange('total')}>
            <Checkbox
              status={
                checkboxSelection.total ? 'checked' : 'unchecked'
              }
              onPress={() => handleCheckboxChange('total')}
            />
            <Text style={styles.optionText}>Total</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => handleCheckboxChange('yearToDate')}>
            <Checkbox
              status={
                checkboxSelection.yearToDate ? 'checked' : 'unchecked'
              }
              onPress={() => handleCheckboxChange('yearToDate')}
            />
            <Text style={styles.optionText}>Year To Date</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    backgroundColor: Colors.blue_theme_Color,
    padding: 10,
  },
  closeText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SettingsModal;
