// components/JobItem.js
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import ScheduleListStyle from '../../utils/Stylesheet/TodaysScheduleStyle';
import VectorIcon from '../../ReusableComponent/VectorIcon';
import DashboardButtons from '../../Component/Dashboard/components/DashboardButtons';
import { useNavigation } from '@react-navigation/native';
import DashboardStyle from '../../utils/Stylesheet/DashboardStyle';
import { Button } from 'react-native-paper';
import Colors from '../../Assets/Style/Color';

const JobItem = ({
  item,
  index,
  length,
  handlePhoneClick,
  handleTextMessage,
  handleAddressClick,
  LoginData,
  quote_image_path,
  estimatedTime,
  totalPrice,
}) => {
  const residentialJobs = item?.quotation?.residential_job ? JSON.parse(item?.quotation.residential_job) : [];
  const commercialJobs = item?.quotation?.commercial_job ? JSON.parse(item?.quotation.commercial_job) : [];
  const storefrontJobs = item?.quotation?.storefront_job ? JSON.parse(item?.quotation.storefront_job) : [];
  const images = item?.quotation?.image ? JSON.parse(item?.quotation.image) : [];
  const imageZero = images[0];
  const navigation = useNavigation();

  const capitalizeFirstLetter = str => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const smsReminderTemplate = (
    customerName,
    franchiseeName,
    dateOfSchedule,
    timeOfSchedule
  ) => `  Hi ${customerName},
  
  This is ${franchiseeName} from JH Group Cleaning 
  Services.
  
  We're getting things ready for your 
  appointment on 
  ${dateOfSchedule} at ${timeOfSchedule}. 
  Does this still work for you?
  
  Looking forward to bringing the shine to 
  your windows.
  
  Cheers,  
  ${franchiseeName}  
  JH Group Cleaning Services`;

  if (item?.type === 'Quote') {
    return null;
  }
  if (!item?.customer_id && item?.type === 'Job') {
  return null;
  }
  const handleStartButton = () => {
    navigation.navigate('Start Store');
  };

  return (
    <View style={item?.customer_id ? ScheduleListStyle.card : ScheduleListStyle.card1}>
        <>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Text style={ScheduleListStyle.title}>
              Job {(index + 1)}/{length}
            </Text>
          </View>

          {
            item.customer_id &&
            <View style={ScheduleListStyle.row}>
            <View style={ScheduleListStyle.input}>
              <Text style={ScheduleListStyle.labelUp}>{capitalizeFirstLetter(item?.quotation?.category_type)}</Text>
            </View>
          </View>
          }
        </>

      {/* Checkboxes */}
      {item?.customer_id && (
        <View style={ScheduleListStyle.checkboxContainer}>
          <View style={{ flexDirection: 'column' }}>
            {item?.quotation?.category_type === "residential" &&
              residentialJobs?.map((category, index) => (
                <TouchableOpacity key={index} style={ScheduleListStyle.checkbox}>
                  <Text style={ScheduleListStyle.labelUp}>{category.job}</Text>
                </TouchableOpacity>
              ))
            }
            {item?.quotation?.category_type === "commercial" &&
              commercialJobs?.map((category, index) => (
                <TouchableOpacity key={index} style={ScheduleListStyle.checkbox}>
                  <Text style={ScheduleListStyle.labelUp}>{category.job}</Text>
                </TouchableOpacity>
              ))
            }
            {item?.quotation?.category_type === "storefront" &&
              storefrontJobs?.map((category, index) => (
                <TouchableOpacity key={index} style={ScheduleListStyle.checkbox}>
                  <Text style={ScheduleListStyle.labelUp}>{category.job}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
          <View style={ScheduleListStyle.imgContainer}>
            <Image
              source={{ uri: quote_image_path + imageZero?.path }}
              resizeMode="contain"
              style={ScheduleListStyle.image}
            />
          </View>
        </View>
      )}

      {/* Customer Details */}
      <View style={ScheduleListStyle.valueLabel}>
        <Text style={ScheduleListStyle.label}>{item?.customer_id ? 'Customer Name' : 'Meeting/Task'}</Text>
        <View style={ScheduleListStyle.row}>
          <View style={ScheduleListStyle.input}>
            <Text style={ScheduleListStyle.labelUp}>{item?.customer_name}</Text>
          </View>
        </View>
      </View>

      {item?.customer_id && (
        <>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={ScheduleListStyle.label}>Phone</Text>
              <TouchableOpacity
                onPress={() => handlePhoneClick(item?.quotation?.customer_phone)}>
                <View style={ScheduleListStyle.input}>
                  <Text style={{ color: '#0066FFFF' }}>
                    {item?.quotation?.customer_phone}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={ScheduleListStyle.inputRemainder}
              onPress={() => {
                const customerName = item?.quotation?.customer_name || 'there';
                const franchiseeName = LoginData?.user?.first_name;
                const dateOfSchedule = item?.date || 'your scheduled date';
                const timeOfSchedule = item?.start_time || 'your scheduled time';

                const message = smsReminderTemplate(
                  customerName,
                  franchiseeName,
                  dateOfSchedule,
                  timeOfSchedule
                );

                handleTextMessage(item?.quotation?.customer_phone, message);
              }}>
              <View style={ScheduleListStyle.inputRemainderRow}>
                <VectorIcon
                  icon="AntDesign"
                  name="message1"
                  size={18}
                  color={'#ffffff'}
                />
                <Text style={{ marginLeft: 5, color: '#ffffff' }}>Reminder</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={ScheduleListStyle.valueLabel}>
            <Text style={ScheduleListStyle.label}>Address</Text>
            <TouchableOpacity
              onPress={() => handleAddressClick(item?.quotation?.category_address)}>
              <View style={ScheduleListStyle.input}>
                <Text style={{ color: '#0066FFFF' }}>{item?.customer_address ? item?.customer_address : item?.quotation?.category_address}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Time Details */}
      <View style={ScheduleListStyle.row}>
        <View style={{ flex: 1 }}>
          <Text style={ScheduleListStyle.label}>Start</Text>
          <View style={ScheduleListStyle.input}>
            <Text style={ScheduleListStyle.labelUp}>{item?.start_time}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={ScheduleListStyle.label}>Est Finish</Text>
          <View style={ScheduleListStyle.input}>
            <Text style={ScheduleListStyle.labelUp}>{item?.end_time}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={ScheduleListStyle.label}>Time</Text>
          <View style={ScheduleListStyle.input}>
            <Text style={ScheduleListStyle.labelUp}>{estimatedTime}</Text>
          </View>
        </View>
      </View>

      {item?.customer_id && (
        <>
          <Text style={ScheduleListStyle.label}>Job Notes</Text>
          <View style={ScheduleListStyle.inputForNotes}>
            <Text style={item?.quotation?.notes ? ScheduleListStyle.labelUp : ScheduleListStyle.notvalue}>
              {item?.quotation?.notes ? item?.quotation?.notes : 'No notes available'}
            </Text>
          </View>
          {/* Placeholder Images */}
          <FlatList
            data={images}
            numColumns={2}
            renderItem={({ item, index }) => (
              <View style={ScheduleListStyle.imageContainer}>
                <Image
                  source={{ uri: quote_image_path + item.path }}
                  resizeMode="contain"
                  style={ScheduleListStyle.image}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={ScheduleListStyle.imageRow}
          />

          <View style={ScheduleListStyle.row}>
            <View style={{ flex: 1 }}>
              <Text style={ScheduleListStyle.label}>Quotes No</Text>
              <View style={ScheduleListStyle.input}>
                <Text style={ScheduleListStyle.labelUp}>{item?.quotation?.quotation_serial_no}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={ScheduleListStyle.label}>Value</Text>
              <View style={ScheduleListStyle.input}>
                <Text style={ScheduleListStyle.labelUp}>$ {totalPrice}</Text>
              </View>
            </View>
          </View>
        </>
      )}
      <Button
      mode="contained"
      style={DashboardStyle.actionButton}
      buttonColor={Colors.blue_theme_Color}
      onPress={handleStartButton}
      >
      <Text style={DashboardStyle.label}>Start Day</Text>
    </Button>
    </View>
  );
};

export default JobItem;