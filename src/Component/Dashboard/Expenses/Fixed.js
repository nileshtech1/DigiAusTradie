import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../../Assets/Style/Color';
import FixedStyle from '../../../utils/Stylesheet/FixedStyle';

const Fixed = () => {
  return (
    <View style={FixedStyle.container}>
      <View style={FixedStyle.cell}>
        <View style={FixedStyle.row}>
          <View style={FixedStyle.column}>
            <Text style={FixedStyle.label}>Vehical Lease</Text>
            <Text style={FixedStyle.value}>{'-'}</Text>
          </View>
          <View style={FixedStyle.column}>
            <Text style={FixedStyle.label}>Phone</Text>
            <Text style={FixedStyle.value}>{'-'}</Text>
          </View>
        </View>
        <View style={FixedStyle.row}>
          <View style={FixedStyle.column}>
            <Text style={FixedStyle.label}>Accounting Software</Text>
            <Text style={FixedStyle.value}>{'-'}</Text>
          </View>
          <View style={FixedStyle.column}>
            <Text style={FixedStyle.label}>Equipment Lease</Text>
            <Text style={FixedStyle.value}>{'-'}</Text>
          </View>
        </View>
        <View style={FixedStyle.row}>
          <View style={FixedStyle.column}>
            <Text style={FixedStyle.label}>Accounting Fee</Text>
            <Text style={FixedStyle.value}>{'-'}</Text>
          </View>
          <View style={FixedStyle.column}>
            <Text style={FixedStyle.label}>Other</Text>
            <Text style={FixedStyle.value}>{'-'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};


export default Fixed;
