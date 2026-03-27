import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import QuotesStyle from '../../../../utils/Stylesheet/QuotesStyle';
import Colors from '../../../../Assets/Style/Color';
import {Calendar} from 'react-native-calendars';

const CalendarModal = ({isVisible, onClose, onDayPress, markedDate, title}) => {
  if (!isVisible) return null;

  return (
    <View style={QuotesStyle.modalContainer}>
      <View style={QuotesStyle.modalContent}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [markedDate]: {selected: true, selectedColor: 'blue'},
          }}
          monthFormat={'yyyy MM'}
        />
        <Button
          mode="contained"
          buttonColor={Colors.pink_theme_color}
          onPress={onClose}>
          Close
        </Button>
      </View>
    </View>
  );
};

export default CalendarModal;
