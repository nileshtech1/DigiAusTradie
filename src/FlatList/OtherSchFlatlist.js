import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import OtherSchFlatlistStyle from '../utils/Stylesheet/LeftSideBarComponentStyle/OtherSchFlatlistStyle';

const OtherSchFlatlist = ({jobs, date}) => {
  const handlePhoneClick = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const handleAddressClick = (address) => {
    const formattedAddress = encodeURIComponent(address); 
    Linking.openURL(`geo:0,0?q=${formattedAddress}`);
  };
  const length = jobs.length;
  // Render function for each job item
  const renderJobItem = ({item}) => (
    <View style={OtherSchFlatlistStyle.card}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={OtherSchFlatlistStyle.title}>
          Job {item.id}/{length}
        </Text>
      </View>
      <View style={OtherSchFlatlistStyle.row}>
        <View style={OtherSchFlatlistStyle.input}>
          <Text style={{textAlign : 'center', fontWeight : 'bold'}}>{item.type}</Text>
        </View>
      </View>

      {/* Checkboxes */}
      <View style={OtherSchFlatlistStyle.checkboxContainer}>
        <View style={{flexDirection: 'column'}}>
          {item.categories.map((category, index) => (
            <TouchableOpacity key={index} style={OtherSchFlatlistStyle.checkbox}>
              <Text>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={OtherSchFlatlistStyle.imgContainer}>
          <Image
            source={require('../Assets/Images/Cleaningteam.png')}
            resizeMode="contain"
            style={OtherSchFlatlistStyle.image}
          />
        </View>
      </View>

      {/* Customer Details */}
      <View style={OtherSchFlatlistStyle.valueLabel}>
        <Text style={OtherSchFlatlistStyle.label}>Customer Name</Text>
        <View style={OtherSchFlatlistStyle.row}>
          <View style={OtherSchFlatlistStyle.input}>
            <Text>{item.customer.firstName}</Text>
          </View>
          <View style={OtherSchFlatlistStyle.input}>
            <Text>{item.customer.lastName}</Text>
          </View>
        </View>
      </View>

      <View style={OtherSchFlatlistStyle.valueLabel}>
          <Text style={OtherSchFlatlistStyle.label}>Phone</Text>
          {/* Make the phone number clickable */}
          <TouchableOpacity onPress={() => handlePhoneClick(item.customer.phoneNumber)}>
            <View style={OtherSchFlatlistStyle.input}>
              <Text>{item.customer.phoneNumber}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={OtherSchFlatlistStyle.valueLabel}>
          <Text style={OtherSchFlatlistStyle.label}>Address</Text>
          {/* Make the address clickable and open maps */}
          <TouchableOpacity onPress={() => handleAddressClick(item.customer.address)}>
            <View style={OtherSchFlatlistStyle.input}>
              <Text>{item.customer.address}</Text>
            </View>
          </TouchableOpacity>
        </View>

      {/* Time Details */}
      <View style={OtherSchFlatlistStyle.row}>
        <View style={{flex: 1}}>
          <Text style={OtherSchFlatlistStyle.label}>Est Finish</Text>
          <View style={OtherSchFlatlistStyle.input}>
            <Text>{item.time.start}</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={OtherSchFlatlistStyle.label}>Actual</Text>
          <View style={OtherSchFlatlistStyle.input}>
            <Text>{item.time.finish}</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={OtherSchFlatlistStyle.label}>Efficiency</Text>
          <View style={OtherSchFlatlistStyle.input}>
            <Text>{item.time.duration}</Text>
          </View>
        </View>
      </View>

      {/* Job Notes */}
      <Text style={OtherSchFlatlistStyle.label}>Job Notes</Text>
      <View style={OtherSchFlatlistStyle.inputForNotes}>
        <Text>{item.notes}</Text>
      </View>

      <View style={OtherSchFlatlistStyle.row}>
       
        <View style={{flex: 1}}>
          <Text style={OtherSchFlatlistStyle.label}>Value</Text>
          <View style={OtherSchFlatlistStyle.input}>
            <Text>8995</Text>
          </View>
        </View>
      </View>
      {/* Buttons */}
      {/* <View style={OtherSchFlatlistStyle.buttonContainer}>
        <TouchableOpacity style={OtherSchFlatlistStyle.button}>
          <Text style={OtherSchFlatlistStyle.buttonText}>Send Invoice</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );

  return (
    <>
      <View style={OtherSchFlatlistStyle.titleContainer}>
        <Text style={OtherSchFlatlistStyle.titleMain}>{date?.date} Job Schedule's</Text>
      </View>
      <View style={OtherSchFlatlistStyle.rowUp}>
        <Text style={OtherSchFlatlistStyle.labelUp}>Jobs Booked</Text>
        <Text style={OtherSchFlatlistStyle.value}>5</Text>
      </View>
      <View style={OtherSchFlatlistStyle.rowUp}>
        <Text style={OtherSchFlatlistStyle.labelUp}>Est Revenue</Text>
        <Text style={OtherSchFlatlistStyle.value}>$ 500</Text>
      </View>
      <FlatList
        data={jobs}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={renderJobItem}
      />
    </>
  );
};



export default OtherSchFlatlist;
