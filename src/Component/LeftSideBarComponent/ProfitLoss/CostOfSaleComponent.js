import React from 'react';
import {View, Text, FlatList} from 'react-native';
import CostOfSaleComponentStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/CostOfSaleComponentStyle';

const CostOfSaleComponent = ({cosData, CostotalMonth, CostotalYearPercentage}) => {
  return (
    <View style={{padding: 10}}>
      <View style={CostOfSaleComponentStyle.tableHeader}>
        <View style={CostOfSaleComponentStyle.cell1}>
          <Text style={CostOfSaleComponentStyle.headerText}>Cost Of Sales</Text>
        </View>
        {/* <View style={CostOfSaleComponentStyle.cell2}>
          <Text style={CostOfSaleComponentStyle.headerText}></Text>
        </View>
        <View style={CostOfSaleComponentStyle.cell3}>
          <Text style={CostOfSaleComponentStyle.headerText}></Text>
        </View> */}
      </View>

      {/* List Data */}
      <FlatList
        data={cosData}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({item}) => (
          <View style={CostOfSaleComponentStyle.tableRow}>
            <View style={CostOfSaleComponentStyle.cell1}>
              <Text style={CostOfSaleComponentStyle.rowText}>{item.category}</Text>
            </View>
            <View style={CostOfSaleComponentStyle.cell2}>
              <Text style={CostOfSaleComponentStyle.rowText}>$ {item.month}</Text>
            </View>
            <View style={CostOfSaleComponentStyle.cell3}>
              <Text style={CostOfSaleComponentStyle.rowText}>{item.yearPercentage}</Text>
            </View>
          </View>
        )}
      />

      <View style={CostOfSaleComponentStyle.tableRow}>
        <View style={CostOfSaleComponentStyle.cell1}>
          <Text style={CostOfSaleComponentStyle.totalBoldText}>Total Cost Of Sales</Text>
        </View>
        <View style={CostOfSaleComponentStyle.cell2}>
          <Text style={CostOfSaleComponentStyle.rowText}>$ {CostotalMonth}</Text>
        </View>
        <View style={CostOfSaleComponentStyle.cell3}>
          <Text style={CostOfSaleComponentStyle.rowText}>{CostotalYearPercentage}%</Text>
        </View>
      </View>
    </View>
  );
};



export default CostOfSaleComponent;
