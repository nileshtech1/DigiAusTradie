import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../../Assets/Style/Color';
import { useSelector } from 'react-redux';
import { extractAccountAndYTD } from './extractAccountAndYTD';
import VariableStyle from '../../../utils/Stylesheet/VariableStyle';

const Variable = () => {
  const {TrailBalanceData} = useSelector(state => state.TrailBalance);


  const accountData = extractAccountAndYTD(TrailBalanceData);
const WagesAndSalariesAccounts = accountData?.filter(account => account.account.includes("Wages and Salaries"));

  return (
    <View style={VariableStyle.container}>
      <TouchableOpacity style={VariableStyle.cell}>
        <View style={VariableStyle.row}>
          <View style={VariableStyle.column}>
            <Text style={VariableStyle.label}>Wages</Text>
            <Text style={VariableStyle.value}>{WagesAndSalariesAccounts[0]?.ytdCredit || '-'}</Text>
          </View>
          <View style={VariableStyle.column}>
            <Text style={VariableStyle.label}>Consumable</Text>
            <Text style={VariableStyle.value}>{'-'}</Text>
          </View>
        </View>
        <View style={VariableStyle.row}>
          <View style={VariableStyle.column}>
            <Text style={VariableStyle.label}>Fuel</Text>
            <Text style={VariableStyle.value}>{'-'}</Text>
          </View>
          <View style={VariableStyle.column}>
            <Text style={VariableStyle.label}>Equipment</Text>
            <Text style={VariableStyle.value}>{'-'}</Text>
          </View>
        </View>
        <View style={VariableStyle.row}>
          <View style={VariableStyle.column}>
            <Text style={VariableStyle.label}>Uniform</Text>
            <Text style={VariableStyle.value}>{'-'}</Text>
          </View>
          <View style={VariableStyle.column}>
            <Text style={VariableStyle.label}>Ads</Text>
            <Text style={VariableStyle.value}>{'-'}</Text>
          </View>
        </View>
        <View style={VariableStyle.row}>
          <View style={VariableStyle.column}>
            <Text style={VariableStyle.label}>Tolls</Text>
            <Text style={VariableStyle.value}>{'-'}</Text>
          </View>
          <View style={VariableStyle.column}>
            <Text style={VariableStyle.label}>Marketing materials</Text>
            <Text style={VariableStyle.value}>{'-'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};



export default Variable;
