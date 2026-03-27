import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import Colors from '../../../../Assets/Style/Color';

// Get screen width for responsive scaling
const { width } = Dimensions.get('window');
const scale = width / 375; // iPhone X base width

const normalize = size => Math.round(size * scale);

// Reusable Stat Card
const StatCard = ({ iconName, value, label, iconColor }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Icon
        name={iconName}
        size={normalize(22)}
        color={iconColor || Colors.gray_text_color}
      />
    </View>
    <Text style={styles.valueText}>{value}</Text>
    <Text style={styles.labelText}>{label}</Text>
  </View>
);

// Progress Stat Card
const ProgressStatCard = ({ rate, label }) => (
  <View style={styles.card}>
    <View style={styles.progressContainer}>
      <Progress.Circle
        size={normalize(55)}
        progress={rate / 100}
        showsText={true}
        formatText={() => `${rate.toFixed(1)}%`}
        thickness={normalize(5)}
        color={Colors.Neon_Blue_Theme_Color}
        unfilledColor={Colors.charcol_color}
        borderWidth={0}
        textStyle={styles.progressText}
      />
    </View>
    <Text style={styles.labelText}>{label}</Text>
  </View>
);

// Main Summary Row
const SummaryRow = ({ totalSent, totalAcceptedCount, acceptanceRate }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <StatCard
          iconName="send-outline"
          value={totalSent.toFixed(0)}
          label="Total Sent"
          iconColor={Colors.blue_crayola_color}
        />
        <StatCard
          iconName="check-circle-outline"
          value={totalAcceptedCount.toFixed(0)}
          label="Total Accepted"
          iconColor={Colors.ocean_Green_color}
        />
        <ProgressStatCard rate={acceptanceRate} label="Acceptance Rate" />
      </ScrollView>
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0, // removes extra bottom space
    paddingBottom: 0,
  },
  container: {
    alignItems: 'center', // centers vertically
    justifyContent: 'center',
    paddingVertical: normalize(6),
    // paddingHorizontal: normalize(8),
  },
  card: {
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: normalize(14),
    padding: normalize(14),
    marginHorizontal: normalize(6),
    width: width * 0.28, // responsive width (~3 cards fit in a row)
    height: normalize(115), // compact fixed height for all devices
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.charcol_color,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    width: '100%',
    alignItems: 'flex-start',
  },
  valueText: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    color: Colors.white_text_color,
    marginTop: normalize(-2),
  },
  labelText: {
    fontSize: normalize(11),
    fontWeight: '500',
    color: Colors.gray_text_color,
  },
  progressContainer: {
    width: '100%',
    height: normalize(55),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  progressText: {
    fontSize: normalize(13),
    fontWeight: 'bold',
    color: Colors.white_text_color,
  },
});

export default SummaryRow;
