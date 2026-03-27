import React from 'react';
import {View, Text} from 'react-native';
import ContactCardStyle from '../../../../utils/Stylesheet/ContactCardStyle';

const StatCard = ({label, value}) => (
  <View style={ContactCardStyle.statCard}>
    <Text style={ContactCardStyle.statCardLabel}>{label}</Text>
    <Text style={ContactCardStyle.statCardValue}>{value}</Text>
  </View>
);

export default StatCard;