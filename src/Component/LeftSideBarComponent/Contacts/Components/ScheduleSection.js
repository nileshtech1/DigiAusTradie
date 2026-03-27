import React from 'react';
import {View, Text} from 'react-native';
import ContactCardStyle from '../../../../utils/Stylesheet/ContactCardStyle';

const ScheduleSection = ({futureScheduleDates}) => (
  <View style={ContactCardStyle.scheduleSection}>
    <View style={ContactCardStyle.scheduleRow}>
      <View style={ContactCardStyle.scheduleItem}>
        <Text style={ContactCardStyle.scheduleLabel}>
          {`Next Schedule Date${futureScheduleDates?.length > 1 ? 's' : ''}`}
        </Text>
        <View style={[
          ContactCardStyle.scheduleButton,
          futureScheduleDates?.length > 0 && {backgroundColor: 'green'}
        ]}>
          <Text style={ContactCardStyle.buttonText}>
            {futureScheduleDates?.length > 0 
              ? futureScheduleDates?.join(' ') 
              : 'Not Scheduled'}
          </Text>
        </View>
      </View>
      <View style={ContactCardStyle.scheduleItem}>
        <Text style={ContactCardStyle.scheduleLabel}>Booked</Text>
        <View style={[
          ContactCardStyle.scheduleButton,
          futureScheduleDates?.length > 0 && {backgroundColor: 'green'}
        ]}>
          <Text style={ContactCardStyle.buttonText}>
            {futureScheduleDates?.length > 0 ? 'YES' : 'NO'}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

export default ScheduleSection;