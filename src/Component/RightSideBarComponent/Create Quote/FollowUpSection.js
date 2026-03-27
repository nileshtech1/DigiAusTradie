import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Colors from '../../../Assets/Style/Color';
import CreateQuoteStyle from '../../../utils/Stylesheet/CreateQuoteStyle';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import CustomTimePicker from '../../../ReusableComponent/CustomTimePicker';
import {Checkbox} from 'react-native-paper';

const FollowUpForm = ({
  followUpDate,
  followUpTime,
  location,
  suggestions,
  isFetching,
  setFollowUpDate,
  setFollowUpTime,
  setLocation,
  fetchLocationSuggestions,
  fetchLocation,
  handleSelectLocation,
  handleImageRemove,
  setModalVisible,
  selectedImage,
  handleCloseAllDropdown,
  isTimePickerOpen,
  setTimePickerOpen,
  setCalendarOpen,
  handleTimeSelect,
  isQuote,
  handleMeetingPress,
  isMeeting,
  handleQuotePress,
}) => {
  return (
    <View>
      <Text style={CreateQuoteStyle.label}>Follow Up</Text>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TouchableOpacity
          style={CreateQuoteStyle.inputWithIcon}
          onPress={() => {
            setCalendarOpen(true);
            handleCloseAllDropdown();
          }}>
          <VectorIcon
            icon="MaterialIcons"
            name="event"
            size={20}
            color={Colors.blue_theme_Color}
          />
          <Text
            style={[
              {marginLeft: 5, color: '#949191FF'},
              followUpDate && {color: '#fff'},
            ]}>
            {followUpDate ? followUpDate : 'Select Date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CreateQuoteStyle.inputWithIcon}
          onPress={() => {
            setTimePickerOpen(true);
            handleCloseAllDropdown();
          }}>
          <VectorIcon
            icon="MaterialIcons"
            name="access-time"
            size={20}
            color={Colors.blue_theme_Color}
          />
          <Text
            style={[
              {marginLeft: 5, color: '#949191FF'},
              followUpTime && {color: '#fff'},
            ]}>
            {followUpTime ? followUpTime : 'Select Time'}
          </Text>
        </TouchableOpacity>

        {/* Time picker modal */}
        <CustomTimePicker
          visible={isTimePickerOpen}
          onClose={() => setTimePickerOpen(false)}
          onConfirm={time => setFollowUpTime(time)}
          selectedTime={followUpTime}
        />
      </View>

      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
          <Checkbox.Android
            status={isQuote ? 'checked' : 'unchecked'}
            onPress={handleQuotePress}
            color={Colors.blue_theme_Color}
          />
          <Text style={{color: Colors.white_text_color}}>Quote</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox.Android
            status={isMeeting ? 'checked' : 'unchecked'}
            onPress={handleMeetingPress}
            color={Colors.blue_theme_Color}
          />
          <Text style={{color: Colors.white_text_color}}>Meeting</Text>
        </View>
      </View>

      <View>
        {/* <Text style={CreateQuoteStyle.label}>Location</Text>
        <View style={CreateQuoteStyle.row}>
          <TextInput
            placeholder="Location"
            placeholderTextColor="#949191FF"
            value={location}
            onChangeText={text => {
              setLocation(text);
              fetchLocationSuggestions(text);
            }}
            style={CreateQuoteStyle.inputLocation}
            onFocus={() => handleCloseAllDropdown()}
          />
          <TouchableOpacity
            onPress={() => {
              fetchLocation();
              handleCloseAllDropdown();
            }}
            style={CreateQuoteStyle.fetchLocation}>
            <VectorIcon
              icon="MaterialIcons"
              name="my-location"
              size={20}
              color="#FFFFFFFF"
            />
            <Text style={{color: '#ffffff'}}>Location</Text>
          </TouchableOpacity>
        </View> */}

        {/* Suggestion List */}
        {suggestions.length > 0 && (
          <View style={CreateQuoteStyle.suggestionList}>
            <FlatList
              data={suggestions}
              keyExtractor={item => item.place_id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleSelectLocation(item)}>
                  <Text style={CreateQuoteStyle.suggestionText}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {isFetching && (
          <Text style={{marginLeft: 5, color: Colors.white_text_color}}>
            Loading...
          </Text>
        )}
      </View>

      {/* Image Picker */}
      <Text style={CreateQuoteStyle.label}>Pick Profile Image</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={CreateQuoteStyle.selectimageCont}
          onPress={() => {
            setModalVisible(true);
            handleCloseAllDropdown();
          }}>
          <VectorIcon
            icon="FontAwesome"
            name="camera"
            size={20}
            color={Colors.blue_theme_Color}
          />
          <Text style={{marginLeft: 5, color: Colors.white_text_color}}>
            Pick Profile Image
          </Text>
        </TouchableOpacity>
      </View>
      {selectedImage?.length > 0 && (
        <View style={CreateQuoteStyle.imageRowContainer}>
          {selectedImage?.map((imageUri, index) => (
            <View key={index} style={CreateQuoteStyle.imageContainer}>
              <Image
                source={{uri: imageUri && imageUri}}
                resizeMode="contain"
                style={CreateQuoteStyle.imageBottom}
              />
              <TouchableOpacity
                style={CreateQuoteStyle.iconHoverOnImage}
                onPress={() => handleImageRemove(index)}>
                <VectorIcon
                  icon="Entypo"
                  name="cross"
                  size={12}
                  color={'#000000'}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default FollowUpForm;
