import React from 'react';
import { View, Text } from 'react-native';
import ScheduleListStyle from '../../utils/Stylesheet/TodaysScheduleStyle';

const SummaryRow = ({ label, value }) => {
  return (
    <View style={ScheduleListStyle.rowUp}>
      <Text style={ScheduleListStyle.labelUp}>{label}</Text>
      <Text style={ScheduleListStyle.value}>{value}</Text>
    </View>
  );
};

export default SummaryRow;