import React from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, StyleSheet } from 'react-native';
import Colors from '../../../Assets/Style/Color';
import ScheduleItem from './ScheduleItem';
import { coffeBreak } from '../../../Assets/Images';
import VectorIcon from '../../../ReusableComponent/VectorIcon';

const ScheduleBox = ({
  title,
  schedules,
  colorCategories,
  handleSchedule,
  routeName,
  handleRefresh,
}) => {
  const capitalizeFirstLetter = str => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filteredSchedules = schedules?.filter(task => {
    if (task?.type === 'Quote') return false;
    if (task?.type === 'Job' && !task?.customer_id) return false;
    return true;
  });

  const hasSchedules = filteredSchedules?.length > 0;

  return (
    <View style={styles.cardContainer}>
      {/* --- Card Header --- */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {hasSchedules && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleSchedule(routeName)}>
            <VectorIcon
              icon="MaterialIcons"
              name="arrow-forward-ios"
              size={18}
              color={Colors.blue_theme_Color}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* --- Scrollable Content Area --- */}
      <View style={styles.contentContainer}>
        {!hasSchedules ? (
          <View style={styles.emptyStateContainer}>
            <Image
              source={coffeBreak}
              resizeMode="contain"
              style={styles.emptyStateImage}
            />
            <Text style={styles.emptyStateText}>You're all clear!</Text>
            <Text style={styles.emptyStateSubtext}>
              No schedules for {title.toLowerCase()}.
            </Text>
          </View>
        ) : (
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            {filteredSchedules.map((task, index) => (
              <ScheduleItem
                key={index}
                task={task}
                colorCategories={colorCategories}
                handleSchedule={handleSchedule}
                handleRefresh={handleRefresh}
                routeName={routeName}
                capitalizeFirstLetter={capitalizeFirstLetter}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // --- Main Card ---
  cardContainer: {
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 12,
    padding: 10,
    // marginVertical: 8,
    bottom : 0,
    top : 0,
    borderWidth: 1,
    borderColor: '#2A2D3A',
    height: 300, // slightly smaller height for compact look
  },
  // --- Header Section ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D3A',
  },
  title: {
    color: '#EAEAEA',
    fontSize: 16,
    fontWeight: '600',
  },
  iconButton: {
    padding: 4,
    backgroundColor: 'rgba(59,130,246,0.1)',
    borderRadius: 6,
  },
  // --- Content Area ---
  contentContainer: {
    flex: 1,
  },
  // --- Empty State ---
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateImage: {
    width: 70,
    height: 70,
    opacity: 0.6,
    marginBottom: 10,
  },
  emptyStateText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptyStateSubtext: {
    color: '#A0A0A0',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default ScheduleBox;
