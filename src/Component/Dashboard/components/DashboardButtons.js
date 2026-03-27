import React from 'react';
import {Button, Text} from 'react-native-paper';
import Colors from '../../../Assets/Style/Color';
import DashboardStyle from '../../../utils/Stylesheet/DashboardStyle';
import smileIcon from '../../../Assets/Images/smile.png';

const DashboardButtons = ({handleStartButton, handleRefresh}) => {

   const onStartPress = () => {
    handleStartButton();
    handleRefresh();
  };
  
  return (
    <Button
      mode="contained"
      style={DashboardStyle.actionButton}
      buttonColor={Colors.blue_theme_Color}
      onPress={onStartPress}
      >
      <Text style={DashboardStyle.label}>Start Day</Text>
    </Button>
  );
};

export default DashboardButtons;