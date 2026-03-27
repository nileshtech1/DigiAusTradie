import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import RevenueRevenueStyle from '../../../../utils/Stylesheet/RevenueRevenueStyle';
import Colors from '../../../../Assets/Style/Color';

const RevenueBarChart = ({ barData }) => {
  const layout = Dimensions.get('window');

  return (
    <>
      <View style={RevenueRevenueStyle.barContainer}>
        <View style={RevenueRevenueStyle.legendItem}>
          <View style={[RevenueRevenueStyle.legendDot, { backgroundColor: Colors.red_crayola_color }]} />
          <Text style={RevenueRevenueStyle.text}>Previous Month</Text>
        </View>
        <View style={RevenueRevenueStyle.legendItem}>
          <View style={[RevenueRevenueStyle.legendDot, { backgroundColor: Colors.green_color }]} />
          <Text style={RevenueRevenueStyle.text}>Current Month</Text>
        </View>
      </View>

      <View style={RevenueRevenueStyle.chartContainer1}>
        <BarChart
          data={barData}
          width={layout.width - 80}
          height={200}
          barWidth={27}
          noOfSections={6}
          yAxisThickness={1}
          xAxisThickness={1}
          frontColor={Colors.Neon_Blue_Theme_Color}
          yAxisColor={Colors.Neon_Blue_Theme_Color}
          xAxisColor={Colors.Neon_Blue_Theme_Color}
          valueColor={Colors.Neon_Blue_Theme_Color}
        />
      </View>
    </>
  );
};

export default RevenueBarChart;
