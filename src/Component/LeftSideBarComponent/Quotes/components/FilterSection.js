import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../../Assets/Style/Color'; // Adjust path if needed
import SearchBar from '../../../../ReusableComponent/SearchBar'; // Adjust path if needed

const FilterSection = ({
  showFilter,
  handleFilter,
  startDate,
  endDate,
  setIsStartDateModalVisible,
  setIsEndDateModalVisible,
  min,
  max,
  handleMinPriceChange,
  handleMaxPriceChange,
  handleReset,
  searchQuery,
  setSearchQuery,
  handleClear,
  handleSearch,
  sentChecked,
  setSentChecked,
  acceptChecked,
  setAcceptChecked,
}) => {
  return (
    <>
      {/* --- Floating Filter Icon (Always visible on the parent screen) --- */}
      <TouchableOpacity onPress={handleFilter} style={styles.floatingFilterButton}>
        <Icon name="filter-list" size={28} color={Colors.white_text_color} />
      </TouchableOpacity>

      {/* --- Modal containing the filter UI --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilter}
        onRequestClose={handleFilter} // Closes modal on Android back press
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* --- Header --- */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Filters</Text>
                <TouchableOpacity onPress={handleFilter}>
                  <Icon name="close" size={26} color={Colors.gray_text_color} />
                </TouchableOpacity>
              </View>

              {/* --- Search Section --- */}
              <View style={styles.section}>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleClear={handleClear}
                  onSearch={handleSearch}
                  placeholder="Search by name or quote #"
                />
              </View>

              {/* --- Status Section --- */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Status</Text>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={styles.checkboxRow}
                    onPress={() => setSentChecked(!sentChecked)}>
                    <Checkbox.Android
                      status={sentChecked ? 'checked' : 'unchecked'}
                      onPress={() => setSentChecked(!sentChecked)}
                      color={Colors.blue_theme_Color}
                    />
                    <Text style={styles.checkboxLabel}>Sent</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.checkboxRow}
                    onPress={() => setAcceptChecked(!acceptChecked)}>
                    <Checkbox.Android
                      status={acceptChecked ? 'checked' : 'unchecked'}
                      onPress={() => setAcceptChecked(!acceptChecked)}
                      color={Colors.blue_theme_Color}
                    />
                    <Text style={styles.checkboxLabel}>Accepted</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* --- Date Range Section --- */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Date Range</Text>
                <View style={styles.rangeContainer}>
                  <TouchableOpacity
                    style={styles.dateInputContainer}
                    onPress={() => setIsStartDateModalVisible(true)}>
                    <Icon
                      name="calendar-today"
                      size={20}
                      color={Colors.gray_text_color}
                    />
                    <Text style={styles.dateText}>{startDate || 'Start Date'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dateInputContainer}
                    onPress={() => setIsEndDateModalVisible(true)}>
                    <Icon
                      name="calendar-today"
                      size={20}
                      color={Colors.gray_text_color}
                    />
                    <Text style={styles.dateText}>{endDate || 'End Date'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* --- Amount Range Section --- */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Amount Range</Text>
                <View style={styles.rangeContainer}>
                  <View style={styles.amountInput}>
                    <Text style={styles.dollarSign}>$</Text>
                    <TextInput
                      style={styles.inputText}
                      value={min}
                      onChangeText={handleMinPriceChange}
                      placeholder="Min"
                      keyboardType="numeric"
                      placeholderTextColor={Colors.gray_text_color}
                    />
                  </View>
                  <View style={styles.amountInput}>
                    <Text style={styles.dollarSign}>$</Text>
                    <TextInput
                      style={styles.inputText}
                      value={max}
                      onChangeText={handleMaxPriceChange}
                      placeholder="Max"
                      keyboardType="numeric"
                      placeholderTextColor={Colors.gray_text_color}
                    />
                  </View>
                </View>
              </View>

              {/* --- Action Buttons Footer --- */}
              <View style={styles.footer}>
                <TouchableOpacity
                  style={[styles.button, styles.resetButton]}
                  onPress={handleReset}>
                  <Text style={[styles.buttonText, styles.resetButtonText]}>
                    Reset
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.applyButton]}
                  onPress={handleFilter} // Apply and close the modal
                >
                  <Text style={[styles.buttonText, styles.applyButtonText]}>
                    Apply Filters
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

// --- Custom Stylesheet ---
const styles = StyleSheet.create({
  floatingFilterButton: {
    position: 'absolute',
    zIndex: 1000,
    right : 20,
    bottom : 50,
    backgroundColor: Colors.blue_theme_Color,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: Colors.blue_theme_Color,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {height: 4, width: 0},
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: Colors.grey_bg_Color,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.charcol_color,
    paddingBottom: 15,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white_text_color,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white_text_color,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 15,
    color: Colors.white_text_color,
    marginLeft: -5,
  },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  dateInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.eerie_black_color,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.charcol_color,
  },
  dateText: {
    color: Colors.white_text_color,
    fontSize: 15,
    marginLeft: 10,
  },
  amountInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.eerie_black_color,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.charcol_color,
  },
  dollarSign: {
    color: Colors.gray_text_color,
    fontSize: 16,
    marginRight: 5,
  },
  inputText: {
    flex: 1,
    color: Colors.white_text_color,
    fontSize: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.charcol_color,
    paddingTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.blue_theme_Color,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: Colors.blue_theme_Color,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButtonText: {
    color: Colors.blue_theme_Color,
  },
  applyButtonText: {
    color: Colors.white_text_color,
  },
});

export default FilterSection;