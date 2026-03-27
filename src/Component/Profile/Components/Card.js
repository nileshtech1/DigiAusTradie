import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../Assets/Style/Color';
import ProfileStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/ProfileStyle';

const Card = ({ title, icon, content, isLink = false, onLinkPress }) => {
  const handlePress = () => {
    if (isLink && content && onLinkPress) {
      onLinkPress(content);
    }
  };

  const capitalizeFirstLetter = str => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <View style={ProfileStyle.infoCard}>
      <View style={ProfileStyle.infoRow}>
        <Icon name={icon} size={20} color={Colors.blue_theme_Color} />
        <Text style={ProfileStyle.infoTitle}>{title}</Text>
      </View>
      {isLink && content ? (
        <TouchableOpacity onPress={handlePress}>
          <Text style={[ProfileStyle.infoText, ProfileStyle.linkText]}>
            {content}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={ProfileStyle.infoText}>
          {content ? capitalizeFirstLetter(content) : ''}
        </Text>
      )}
    </View>
  );
};

export default Card;