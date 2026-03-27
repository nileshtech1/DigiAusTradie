import React from 'react';
import {View, Text, FlatList} from 'react-native';
import OperatingExpensesStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/OperatingExpensesStyle';

const OperatingExpenses = ({opExpenseData, OpExpensetotalMonth, OpExpensetotalYearPercentage}) => {
  return (
    <View style={{ padding: 10}}>
      <View style={OperatingExpensesStyle.tableHeader}>
        <View style={OperatingExpensesStyle.cell1}>
          <Text style={OperatingExpensesStyle.headerText}>Operating Expenses</Text>
        </View>
        {/* <View style={OperatingExpensesStyle.cell2}>
          <Text style={OperatingExpensesStyle.headerText}></Text>
        </View>
        <View style={OperatingExpensesStyle.cell3}>
          <Text style={OperatingExpensesStyle.headerText}></Text>
        </View> */}
      </View>

      {/* List Data */}
      <FlatList
        data={opExpenseData}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({item}) => (
          <View style={OperatingExpensesStyle.tableRow}>
            <View style={OperatingExpensesStyle.cell1}>
              <Text style={OperatingExpensesStyle.rowText}>{item.title}</Text>
            </View>
            <View style={OperatingExpensesStyle.cell2}>
              <Text style={OperatingExpensesStyle.rowText}>$ {item.month}</Text>
            </View>
            <View style={OperatingExpensesStyle.cell3}>
              <Text style={OperatingExpensesStyle.rowText}>{item.yearPercentage} %</Text>
            </View>
          </View>
        )}
      />

      <View style={OperatingExpensesStyle.tableRow}>
        <View style={OperatingExpensesStyle.cell1}>
          <Text style={OperatingExpensesStyle.totalBoldText}>Total Operating Expenses</Text>
        </View>
        <View style={OperatingExpensesStyle.cell2}>
          <Text style={OperatingExpensesStyle.rowText}>$ {OpExpensetotalMonth}</Text>
        </View>
        <View style={OperatingExpensesStyle.cell3}>
          <Text style={OperatingExpensesStyle.rowText}>{OpExpensetotalYearPercentage} %</Text>
        </View>
      </View>
    </View>
  );
};


export default OperatingExpenses;
