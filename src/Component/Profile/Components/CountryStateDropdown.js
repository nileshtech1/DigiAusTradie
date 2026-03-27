import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Colors from '../../../Assets/Style/Color';
import EditProfileStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/EditProfileStyle';

const CountryStateDropdown = ({
  type,
  value,
  label,
  options,
  isVisible,
  error,
  errorMessage,
  onToggle,
  onSelect,
  onChangeText,
}) => {
  
  const iconName = type === 'country' ? 'globe' : 'map';
  const placeholder = type === 'country' ? 'Select Country' : 'Select State';

  return (
    <View style={EditProfileStyle.dropdownWrapper}>
      <Text style={EditProfileStyle.label}>{label}</Text>
      <TouchableOpacity
        style={[
          EditProfileStyle.inputWithIcon,
          error && EditProfileStyle.inputError
        ]}
        onPress={() => onToggle(type)}>
        <VectorIcon
          icon="FontAwesome"
          name={iconName}
          style={EditProfileStyle.iconMargin}
          size={20}
          color={Colors.blue_theme_Color}
        />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Colors.white_text_color}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => onToggle(type)}
          style={{
            marginLeft: 15,
            flex: 1,
            color: Colors.white_text_color,
          }}
        />
      </TouchableOpacity>

      {isVisible && (
        <View style={EditProfileStyle.dropdown}>
          <ScrollView
            style={EditProfileStyle.CustomerDropdown}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            nestedScrollEnabled={true}>
            {options
              .filter(option =>
                (type === 'country' ? option.country_name : option.state_name)
                  .toLowerCase()
                  .includes(value.toLowerCase()),
              )
              .map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onSelect(type === 'country' ? option : option.state_name)}
                  style={EditProfileStyle.dropdownItem}>
                  <Text style={EditProfileStyle.dropdownText}>
                    {type === 'country' ? option.country_name : option.state_name}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      )}

      {error && (
        <Text style={EditProfileStyle.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default CountryStateDropdown;