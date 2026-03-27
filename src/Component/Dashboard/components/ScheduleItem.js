import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DashboardStyle from '../../../utils/Stylesheet/DashboardStyle';
import Colors from '../../../Assets/Style/Color';

const ScheduleItem = ({
  task,
  colorCategories,
  handleSchedule,
  routeName,
  capitalizeFirstLetter,
  handleRefresh,
}) => {
  return (
    <TouchableOpacity
        style={DashboardStyle.tomDetailCont}
        onPress={() => {
          handleSchedule(routeName, task?.id);
          handleRefresh();
        }}
      >

      <Text
        style={[
          DashboardStyle.scheduleSubTitle,
          {
            color:
              colorCategories.find(category => {
                if (task?.customer_id === null) {
                  return (
                    category?.name?.toLowerCase() === task?.type?.toLowerCase()
                  );
                }
                return (
                  category?.name?.toLowerCase() ===
                  task?.quotation?.category_type.toLowerCase()
                );
              })?.color || Colors.gray_text_color,
          },
        ]}>
        {task?.customer_id
          ? capitalizeFirstLetter(task?.quotation?.category_type)
          : 'Meeting/Task'}
      </Text>
      {task?.customer_id && (
        <Text style={DashboardStyle.label}>
          {task?.quotation?.category_type?.toLowerCase() === 'commercial' &&
          task?.quotation?.site_name
            ? capitalizeFirstLetter(task?.quotation?.site_name)
            : task?.quotation?.category_type?.toLowerCase() === 'storefront' &&
              task?.quotation?.store_name
            ? capitalizeFirstLetter(task?.quotation?.store_name)
            : task?.quotation?.category_type?.toLowerCase() === 'residential' &&
              task?.customer_name
            ? capitalizeFirstLetter(task?.customer_name)
            : 'Not available'}
        </Text>
      )}

      <View style={DashboardStyle.tomTimeContainer}>
        <Text style={DashboardStyle.label}>{task?.start_time}</Text>
        <Text style={DashboardStyle.label}> - </Text>
        <Text style={DashboardStyle.label}>{task?.end_time}</Text>
      </View>
      <View style={DashboardStyle.tomTimeContainer}>
        <Text style={DashboardStyle.label}>{task?.estimatedTime}</Text>
      </View>
      {task?.customer_id && (
        <View style={DashboardStyle.tomTimeContainer}>
          <Text style={DashboardStyle.label}>
            {capitalizeFirstLetter(task?.quotation?.category_address)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ScheduleItem;