import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import ContactCardStyle from '../../../../utils/Stylesheet/ContactCardStyle';

const DetailCard = ({label, value, onPress, interactive = false}) => (
  <View style={ContactCardStyle.detailCard}>
    <View style={ContactCardStyle.fixedContainer}>
      <Text style={ContactCardStyle.detailLabel}>{label}</Text>
    </View>
    <View style={ContactCardStyle.fixedContainer}>
      {interactive ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={[
            ContactCardStyle.detailValue,
            interactive && ContactCardStyle.detailLabel
          ]}>
            {value}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={ContactCardStyle.detailValue}>{value}</Text>
      )}
    </View>
  </View>
);

export default DetailCard;