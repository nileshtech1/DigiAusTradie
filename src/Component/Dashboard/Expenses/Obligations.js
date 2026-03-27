import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../../Assets/Style/Color';
import { useSelector } from 'react-redux';
import { extractAccountAndYTD } from './extractAccountAndYTD';
import ObligationsStyle from '../../../utils/Stylesheet/ObligationsStyle';

const Obligations = () => {
  const {TrailBalanceData} = useSelector(state => state.TrailBalance);
  const accountData = extractAccountAndYTD(TrailBalanceData);
  const Gst = accountData?.filter(account => account.account.includes("GST"));
  const SuperannuationAccounts = accountData?.filter(account => account.account.includes("Superannuation"));
  const BuisnessInsurance = accountData?.filter(account => account.account.includes("Insurance"));
  const Tax = accountData?.filter(account => account.account.includes("Income Tax Expense"));


  return (
    <View style={ObligationsStyle.container}>
      <TouchableOpacity style={ObligationsStyle.cell}>
        <View style={ObligationsStyle.row}>
          <View style={ObligationsStyle.column}>
            <Text style={ObligationsStyle.label}>GST</Text>
            <Text style={ObligationsStyle.value}>{Gst[0]?.ytdCredit || '-'}</Text>
          </View>
          <View style={ObligationsStyle.column}>
            <Text style={ObligationsStyle.label}>Superannuation</Text>
            <Text style={ObligationsStyle.value}>{SuperannuationAccounts[0]?.ytdCredit || '-'}</Text>
          </View>
        </View>
        <View style={ObligationsStyle.row}>
          <View style={ObligationsStyle.column}>
            <Text style={ObligationsStyle.label}>Tax</Text>
            <Text style={ObligationsStyle.value}>{Tax[0]?.ytdCredit || '-'}</Text>
          </View>
          <View style={ObligationsStyle.column}>
            <Text style={ObligationsStyle.label}>Franchise Fee</Text>
            <Text style={ObligationsStyle.value}>{'-'}</Text>
          </View>
        </View>
        <View style={ObligationsStyle.row}>
          <View style={ObligationsStyle.column}>
            <Text style={ObligationsStyle.label}>Business Insurance</Text>
            <Text style={ObligationsStyle.value}>{BuisnessInsurance[0]?.ytdCredit || '-'}</Text>
          </View>
          <View style={ObligationsStyle.column}>
            <Text style={ObligationsStyle.label}>Vehical Insurance</Text>
            <Text style={ObligationsStyle.value}>{'-'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};


export default Obligations;
