import React from 'react';
import {View, Text, FlatList} from 'react-native';
import IncomePLComponentStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/IncomePLComponentStyle';

const IncomePLComponent = ({data, totalMonth, totalYearPercentage,comparessionRange}) => {
  return (
    <View style={{padding: 10}}>
      <View style={IncomePLComponentStyle.tableHeader}>
        <View style={IncomePLComponentStyle.headerCell1}>
          <Text style={IncomePLComponentStyle.headerText}>Trading Income</Text>
        </View>
        <View style={IncomePLComponentStyle.headerCell2}>
          <Text style={IncomePLComponentStyle.headerText}>{comparessionRange || 'Month'}</Text>
        </View>
        <View style={IncomePLComponentStyle.headerCell3}>
          <Text style={IncomePLComponentStyle.headerText}>Trade %</Text>
        </View>
      </View>

      {/* List Data */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({item}) => (
          <View style={IncomePLComponentStyle.tableRow}>
            <View style={IncomePLComponentStyle.cell1}>
              <Text style={IncomePLComponentStyle.rowText}>{item.title}</Text>
            </View>
            <View style={IncomePLComponentStyle.cell2}>
              <Text style={IncomePLComponentStyle.rowText}>$ {item.month}</Text>
            </View>
            <View style={IncomePLComponentStyle.cell3}>
              <Text style={IncomePLComponentStyle.rowText}>{item.yearPercentage} %</Text>
            </View>
          </View>
        )}
      />

      <View style={IncomePLComponentStyle.tableRow}>
        <View style={IncomePLComponentStyle.cell1}>
          <Text style={IncomePLComponentStyle.totalBoldText}>Total Trading Income</Text>
        </View>
        <View style={IncomePLComponentStyle.cell2}>
          <Text style={IncomePLComponentStyle.rowText}>$ {totalMonth}</Text>
        </View>
        <View style={IncomePLComponentStyle.cell3}>
          <Text style={IncomePLComponentStyle.rowText}>{totalYearPercentage} %</Text>
        </View>
      </View>
    </View>
  );
};



export default IncomePLComponent;
