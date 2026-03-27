import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import Colors from '../../../Assets/Style/Color';
import { coffeBreak } from '../../../Assets/Images';

const DashboardCharts = ({
  pieData = [],
  labels = [],
  data2 = [],
  labels1 = [],
  navigation,
}) => {
  const normalizeData = (arr) =>
    (arr || []).map(item => ({
      ...item,
      value: Number(item?.value) || 0,
    }));

  const formatValue = (value) => `${Number(value).toLocaleString()}`;

  const normalizedRevenue = useMemo(
    () => normalizeData(pieData),
    [pieData]
  );
  
  const normalizedExpenses = useMemo(
    () => normalizeData(data2),
    [data2]
  );
  
  const enrichedRevenueData = useMemo(
    () =>
      normalizedRevenue.map((item, idx) => ({
        ...item,
        label: item.label || labels[idx] || 'N/A',
        text: formatValue(item.value),
      })),
    [normalizedRevenue, labels]
  );
  
  const enrichedExpenseData = useMemo(
    () =>
      normalizedExpenses.map((item, idx) => ({
        ...item,
        label: item.label || labels1[idx] || 'N/A',
        text: formatValue(item.value),
      })),
    [normalizedExpenses, labels1]
  );
  
  const totalRevenue = normalizedRevenue.reduce((acc, item) => acc + item.value, 0);
  const totalExpenses = normalizedExpenses.reduce((acc, item) => acc + item.value, 0);


  const hasRevenueData = enrichedRevenueData.length > 0 && enrichedRevenueData.some(i => i.value > 0);
  const hasExpenseData = enrichedExpenseData.length > 0 && enrichedExpenseData.some(i => i.value > 0);

  const EmptyState = ({ title }) => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{title}</Text>
    </View>
  );

  const ChartCard = ({ title, hasData, data, total, onPress }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.9}>
      <Text style={styles.cardTitle}>{title}</Text>
      {!hasData ? (
        <EmptyState title={`No ${title} Data`} />
      ) : (
        <View style={styles.chartContent}>
          <PieChart
            data={data}
            radius={55}
            innerRadius={35}
            strokeWidth={1}
            strokeColor="#1C1F2A"
            centerLabelComponent={() => (
              <View style={styles.centerLabel}>
                <Text style={styles.centerLabelTotal}>{formatValue(total)}</Text>
                <Text style={styles.centerLabelSubtext}>Total</Text>
              </View>
            )}
          />
          <View style={styles.legendContainer}>
            {data.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColorBox, { backgroundColor: item.color || '#ccc' }]} />
                <Text style={styles.legendLabel} numberOfLines={1}>{item.label}</Text>
                <Text style={styles.legendValue}>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ChartCard
        title="MTD Revenue"
        hasData={hasRevenueData}
        data={enrichedRevenueData}
        total={totalRevenue}
        onPress={() => navigation.navigate('Revenue')}
      />
      <ChartCard
        title="MTD Expenses"
        hasData={hasExpenseData}
        data={enrichedExpenseData}
        total={totalExpenses}
        onPress={() => navigation.navigate('Expenses')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, paddingVertical: 8 },
  cardContainer: {
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2D3A',
  },
  cardTitle: { color: Colors.white_text_color, fontSize: 15, fontWeight: '600', marginBottom: 10 },
  chartContent: { flexDirection: 'row', alignItems: 'center' },
  centerLabel: { justifyContent: 'center', alignItems: 'center' },
  centerLabelTotal: { fontSize: 14, color: Colors.black_text_color, fontWeight: 'bold' },
  centerLabelSubtext: { fontSize: 11, color: Colors.black_text_color, fontWeight: 'bold'  },
  legendContainer: { flex: 1, marginLeft: 15 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  legendColorBox: { width: 10, height: 10, borderRadius: 2, marginRight: 6 },
  legendLabel: { color: '#B0B0C0', fontSize: 12, flex: 1 },
  legendValue: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  emptyContainer: { justifyContent: 'center', alignItems: 'center', paddingVertical: 25 },
  emptyImage: { width: 50, height: 50, opacity: 0.6, marginBottom: 10 },
  emptyText: { color: '#A0A0A0', fontSize: 13, textAlign: 'center' },
});

export default DashboardCharts;
