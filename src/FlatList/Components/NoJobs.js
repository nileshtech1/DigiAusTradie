// components/NoJobs.js
import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import ScheduleListStyle from '../../utils/Stylesheet/TodaysScheduleStyle';
import { logout } from '../../Assets/Images/LottieAnimation/Cancel.json';

const NoJobs = () => {
  return (
    <View style={ScheduleListStyle.noJobsContainer}>
      <LottieView
        source={logout}
        autoPlay
        loop={true}
        style={ScheduleListStyle.animation}
      />
      <Text style={ScheduleListStyle.noJobText}>No Schedule for Today</Text>
    </View>
  );
};

export default NoJobs;