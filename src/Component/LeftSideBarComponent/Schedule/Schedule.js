import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../ReusableComponent/Header';
import CustomCalendar from '../../../ReusableComponent/CustomCalender';
import Colors from '../../../Assets/Style/Color';
import { useSelector } from 'react-redux';
import ScheduleStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/ScheduleStyle';

const Schedule = ({route}) => {
  const customer = route.params;
  const {createScheduleLoading} = useSelector(state => state.CreateSchedule);

  const colorCategories = [
    {name: 'Residential', color: Colors.green_color},
    {name: 'Store Front', color: Colors.blue_theme_Color},
    {name: 'Quote', color: Colors.banana_Yellow_color},
    {name: 'Reserved', color: Colors.gray_text_color},
    
    {name: 'Commercial', color: Colors.Neon_Pink_Theme_Color},
    {name: 'Admin/Tasks', color: Colors.pink_theme_color},
  ];
  return (
    <View style={ScheduleStyle.container}>
      <Header notificationIcon={true} />
      <View style={{flex: 1}}>
        <View style={ScheduleStyle.categoriesContainer}>
          {colorCategories.map((category, index) => (
            <View key={index} style={ScheduleStyle.categoryItem}>
              <View
                style={[
                  ScheduleStyle.categoryColorBox,
                  {backgroundColor: category.color},
                ]}
              />
              <Text style={ScheduleStyle.categoryText}>{category.name}</Text>
            </View>
          ))}
        </View>

        <CustomCalendar customer={customer} />
      </View>
      {createScheduleLoading && (
        <View style={ScheduleStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
    </View>
  );
};



export default Schedule;
