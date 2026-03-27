import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import VectorIcon from './VectorIcon';
import Colors from '../Assets/Style/Color';

const DropdownWithIconInput = ({
  label,
  placeholder,
  value,
  onSelect,
  toggleDropdown,
  selectDropdownVisible,
  setSelectDropdownVisible,
  iconName = 'bullhorn',
  placeholderTextColor = '#505050FF',
  maxHeight = 200,
  dropdownList
}) => {
  const handleSourceSelect = (option) => {
    onSelect(option);
    setSelectDropdownVisible(false);
  };

  const clearSelection = () => {
    onSelect('');
  };

  return (
    <View style={styles.dropdownWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.inputContainer} onPress={() => setSelectDropdownVisible(false)}>
        <VectorIcon
          icon="FontAwesome"
          name={iconName}
          style={styles.iconMargin}
          size={20}
          color={Colors.blue_theme_Color}
        />
        <TouchableOpacity onPress={toggleDropdown} style={{ marginLeft: 5, flex: 1 }}>
          <Text style={{ color: value ? '#000' : placeholderTextColor }}>
            {value || placeholder}
          </Text>
        </TouchableOpacity>
        {value ? (
          <TouchableOpacity onPress={clearSelection} style={styles.clearButton}>
            <VectorIcon
              icon="FontAwesome"
              name="times"
              size={18}
              color="#999"
            />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
      {selectDropdownVisible && (
        <View style={[styles.dropdown, { maxHeight }]}>  
          <ScrollView
            style={styles.CustomerDropdown}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps='always'
          >
            {dropdownList
              .filter((option) => option.toLowerCase().includes(value.toLowerCase()))
              .map((option, optionIndex) => (
                <TouchableOpacity
                  key={optionIndex}
                  onPress={() => handleSourceSelect(option)}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownText}>{option}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownWrapper: {
    position: 'relative',
  },
  label: {
    fontSize: 16,
    color: Colors.blue_theme_Color,
    marginBottom: 4,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: 275,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    marginRight: 5,
  },
  iconMargin: {
    marginRight: 10,
  },
  clearButton: {
    padding: 5,
  },
  dropdown: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: Colors.blue_theme_Color,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 1,
    elevation: 1,
    height: 'auto',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
    color: '#fff',
  },
  CustomerDropdown: {
    flex: 1,
    top: -2,
    left: 0,
    right: 0,
    backgroundColor: Colors.blue_theme_Color,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 1,
    elevation: 1,
    maxHeight: 200,
    overflow: 'scroll',
  },
});

export default DropdownWithIconInput;