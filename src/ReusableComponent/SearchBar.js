import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../Assets/Style/Color';

const SearchBar = ({ placeholder = 'Search for Quotes...', onSearch, handleClear, searchQuery }) => {

  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color={Colors.Neon_Blue_Theme_Color} style={styles.leftIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray_text_color}
        onChangeText={onSearch}
        value={searchQuery}
      />
      {
        searchQuery?.length > 0 && <TouchableOpacity onPress={handleClear}>
        <Icon name="x" size={20} color={Colors.Neon_Blue_Theme_Color} style={styles.rightIcon} />
      </TouchableOpacity>
      }
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black_bg_Theme, 
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6, 
    borderWidth: 0.5, 
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom : 5,
    height : 40,
    marginHorizontal : 5
  },
  leftIcon: {
    marginRight: 10,
    borderRightWidth: 1,
    paddingRight: 10,
    borderRightColor: Colors.white_text_color,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.white_text_color,
  },
  rightIcon: {
    marginLeft: 10,
  },
});
