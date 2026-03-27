// 1. CustomerNumber.js
import React from 'react';
import {View, Text} from 'react-native';
import ContactCardStyle from '../../../../utils/Stylesheet/ContactCardStyle';

const CustomerNumber = ({id}) => (
  <View style={ContactCardStyle.customerNumberContainer}>
    <Text style={ContactCardStyle.customerNumberLabel}>Customer Number</Text>
    <Text style={ContactCardStyle.customerNumber}>{id}</Text>
  </View>
);

export default CustomerNumber;