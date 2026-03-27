import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from '../../../Assets/Style/Color'; // adjust path if needed
import DashboardStyle from '../../../utils/Stylesheet/DashboardStyle';

const { width } = Dimensions.get('window');

const RevenueTarget = ({ target, booked, actual, percentage, navigation }) => {
  
  const data = [
    { label: 'Target', value: target, rate: target > 0 ? 100 : 0, color: Colors.blue_crayola_color },
    { label: 'Booked', value: booked, rate: percentage?.bookedPercentage || 0, color: Colors.Neon_Blue_Theme_Color },
    { label: 'Actual', value: actual, rate: percentage?.paidPercentage || 0, color: Colors.ocean_Green_color },
  ];

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            {/* Circular progress on the left */}
            <Progress.Circle
              size={46}
              progress={item.rate / 100}
              showsText={true}
              formatText={() => `${item.rate.toFixed(0)}%`}
              thickness={4}
              color={item.color}
              unfilledColor={Colors.charcol_color}
              borderWidth={0}
              textStyle={styles.progressText}
              style={styles.progressCircle}
            />

            {/* Label and value on the right */}
            <View style={styles.textContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>${(item.value || 0).toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.plButton}
        onPress={() => navigation.navigate('P/L')}
      >
        <Text style={styles.plButtonText}>FY P/L</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  card: {
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 16,
    padding: 5,
    marginHorizontal: 8,
    width: width * 0.28,
    borderWidth: 1,
    borderColor: Colors.charcol_color,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  progressCircle: {
    marginRight: 10,
  },
  progressText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.white_text_color,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: Colors.gray_text_color,
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    color: Colors.white_text_color,
    fontWeight: '700',
    marginTop: 3,
  },
  plButton: {
    backgroundColor: Colors.blue_theme_Color,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 15,
  },
  plButtonText: {
    color: Colors.white_text_color,
    fontWeight: '600',
    fontSize: 15,
  },
});

export default RevenueTarget;
