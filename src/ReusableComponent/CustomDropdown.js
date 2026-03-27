import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomDropdown = ({ data, visible, onSelect, onClose }) => {
  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!visible) return null;

  return (
    <View style={styles.dropdownContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        nestedScrollEnabled
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              onSelect(item);
              onClose();
            }}>
            <Text style={styles.dropdownText}>{item}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
    maxHeight: 200,
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    padding: 10,
    textAlign: 'center',
    color: '#999',
  },
});

export default CustomDropdown;
