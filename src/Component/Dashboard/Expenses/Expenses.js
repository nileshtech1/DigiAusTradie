import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Header from '../../../ReusableComponent/Header';
import {BarChart, PieChart} from 'react-native-gifted-charts';
import Colors from '../../../Assets/Style/Color';
import Fixed from './Fixed';
import Variable from './Variable';
import Obligations from './Obligations';
import {useSelector} from 'react-redux';
import {extractAccountAndYTD} from './extractAccountAndYTD';
import MTDExpenseStyle from '../../../utils/Stylesheet/MTDExpenseStyle';

const Expenses = () => {
  const layout = Dimensions.get('window');
  const {TrailBalanceData} = useSelector(state => state.TrailBalance);
  const accountData = extractAccountAndYTD(TrailBalanceData);

  const Wages = accountData?.filter(account =>
    account.account.includes('Cost of Goods Sold'),
  );
  const Material = accountData?.filter(account =>
    account.account.includes('Wages and Salaries'),
  );
  const Marketing = accountData?.filter(account =>
    account.account.includes('Advertising & Marketing'),
  );

  // Dummy data for the Pie Chart
  const pieData = [
    {value: Wages[0]?.ytdCredit, color: Colors.pink_theme_color},
    {value: Material[0]?.ytdCredit, color: Colors.blue_theme_Color},
    {value: Marketing[0]?.ytdCredit, color: Colors.Neon_Pink_Theme_Color},
  ];

  const total2 = pieData.reduce((acc, item) => acc + item.value, 0);
  const hasExpenseData =
    pieData?.length > 0 && pieData.some(item => item.value > 0);
  const labels1 = ['Wages', 'Material', 'Marketing'];

  const calculatePercentage = (value, total) =>
    ((value / total) * 100).toFixed(1);

  const chartData2 = pieData.map(item => ({
    ...item,
    text: `${calculatePercentage(item.value, total2)}%`,
  }));

  // Dummy data for the Bar Chart
  const barData = [
    {value: 0, label: 'Jan', frontColor: Colors.Neon_SkyBlue_Theme_color},
    {value: 0, label: 'Feb', frontColor: Colors.blue_theme_Color},
    {value: 0, label: 'Mar', frontColor: Colors.Neon_Pink_Theme_Color},
    {value: 0, label: 'Apr', frontColor: Colors.green_color},
    {value: 0, label: 'Mar', frontColor: Colors.pink_theme_color},
  ];

  const [activeTab, setActiveTab] = useState('Fixed');

  const renderContent = () => {
    switch (activeTab) {
      case 'Fixed':
        return <Fixed />;
      case 'Variable':
        return <Variable />;
      case 'Obligations':
        return <Obligations />;
      default:
        return null;
    }
  };

  return (
    <View style={MTDExpenseStyle.container}>
      <Header notificationIcon={true} backButton={true} />

      <ScrollView
        style={MTDExpenseStyle.contentContainer}
        showsVerticalScrollIndicator={false}>
        {/* Pie Chart */}
        <View style={MTDExpenseStyle.chartContainer}>
          {hasExpenseData ? (
            <PieChart
              data={chartData2}
              radius={80}
              showText
              textSize={12}
              textColor="#ffffff"
              showValuesAsLabels
              backgroundColor={Colors.black_bg_Theme}
              innerRadius={35}
              centerLabelComponent={() => (
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#fff',
                  }}>
                  MTD Expenses
                </Text>
              )}
            />
          ) : (
            <View style={MTDExpenseStyle.noDataContainer}>
              <Text style={MTDExpenseStyle.noDataText}>
                No Expense Data Available
              </Text>
            </View>
          )}
          <View style={MTDExpenseStyle.legendContainer}>
            <View style={MTDExpenseStyle.legendItem}>
              <View
                style={[
                  MTDExpenseStyle.legendColor,
                  {backgroundColor: Colors.pink_theme_color},
                ]}
              />
              <Text style={MTDExpenseStyle.legendText}>Wages</Text>
            </View>
            <View style={MTDExpenseStyle.legendItem}>
              <View
                style={[
                  MTDExpenseStyle.legendColor,
                  {backgroundColor: Colors.blue_theme_Color},
                ]}
              />
              <Text style={MTDExpenseStyle.legendText}>Material</Text>
            </View>
            <View style={MTDExpenseStyle.legendItem}>
              <View
                style={[
                  MTDExpenseStyle.legendColor,
                  {backgroundColor: Colors.Neon_Pink_Theme_Color},
                ]}
              />
              <Text style={MTDExpenseStyle.legendText}>Marketing</Text>
            </View>
          </View>
        </View>

        {/* Bar Chart */}
        <View style={MTDExpenseStyle.chartContainer1}>
          <BarChart
            data={barData}
            width={layout.width - 80}
            height={200}
            barWidth={30}
            noOfSections={4}
            yAxisThickness={1}
            xAxisThickness={1}
            isAnimated
            frontColor="#FF6347"
            yAxisColor="#FFFFFF"
            xAxisColor="#FFFFFF"
            valueColor="#FFFFFF"
            hideRules={false}
          />
        </View>

        {/* Custom Tab View */}
        <View style={MTDExpenseStyle.tabContainer}>
          <View style={MTDExpenseStyle.tabHeader}>
            {['Fixed', 'Variable', 'Obligations'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  MTDExpenseStyle.tabButton,
                  activeTab === tab && MTDExpenseStyle.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}>
                <Text
                  style={[
                    MTDExpenseStyle.tabText,
                    activeTab === tab && MTDExpenseStyle.activeTabText,
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={MTDExpenseStyle.tabContent}>{renderContent()}</View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Expenses;
