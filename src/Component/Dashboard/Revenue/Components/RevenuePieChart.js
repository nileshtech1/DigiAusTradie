import React from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import Colors from '../../../../Assets/Style/Color';
import RevenueRevenueStyle from '../../../../utils/Stylesheet/RevenueRevenueStyle';

const RevenuePieChart = ({pieData}) => {
  const hasPieData =
    pieData?.length > 0 && pieData.some(item => item.value > 0);

  // Validate the data prop
  if (!pieData || pieData.length === 0) {
    return (
      <View style={RevenueRevenueStyle.chartContainer}>
        <Text
          style={{
            color: Colors.white_text_color,
            textAlign: 'center',
            marginTop: 20,
          }}>
          No data available for the pie chart.
        </Text>
      </View>
    );
  }

  return (
    <View style={RevenueRevenueStyle.chartContainer}>
      {hasPieData ? (
        <PieChart
          data={pieData}
          radius={80}
          showText
          textSize={12}
          textColor="#ffffff"
          showValuesAsLabels
          backgroundColor={Colors.black_bg_Theme}
          innerRadius={35}
          centerLabelComponent={() => (
            <Text
              style={{fontWeight: 'bold', textAlign: 'center', color: '#fff'}}>
              MTD Revenue
            </Text>
          )}
        />
      ) : (
        <View style={RevenueRevenueStyle.noDataContainer}>
          <Text style={RevenueRevenueStyle.noDataText}>
            No Revenue Data Available
          </Text>
        </View>
      )}
      <View style={RevenueRevenueStyle.legendContainer}>
        <View style={RevenueRevenueStyle.legendItem}>
          <View
            style={[
              RevenueRevenueStyle.legendColor,
              {backgroundColor: Colors.green_color},
            ]}
          />
          <Text style={RevenueRevenueStyle.legendText}>Paid</Text>
        </View>
        <View style={RevenueRevenueStyle.legendItem}>
          <View
            style={[
              RevenueRevenueStyle.legendColor,
              {backgroundColor: Colors.blue_theme_Color},
            ]}
          />
          <Text style={RevenueRevenueStyle.legendText}>Unpaid</Text>
        </View>
        <View style={RevenueRevenueStyle.legendItem}>
          <View
            style={[
              RevenueRevenueStyle.legendColor,
              {backgroundColor: Colors.Neon_Pink_Theme_Color},
            ]}
          />
          <Text style={RevenueRevenueStyle.legendText}>Total Sent</Text>
        </View>
      </View>
    </View>
  );
};

export default RevenuePieChart;
