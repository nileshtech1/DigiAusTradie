import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import CustomTextInput from '../../../ReusableComponent/CustomTextInput';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import DatePicker from 'react-native-date-picker';
import CreateQuoteStyle from '../../../utils/Stylesheet/CreateQuoteStyle';
import Colors from '../../../Assets/Style/Color';
import {useSelector} from 'react-redux';
import CustomTimePicker from '../../../ReusableComponent/CustomTimePicker';
import { store } from '../../../Redux/Store/Store';

const StorefrontForm = ({
  storeName,
  setStorename,
  storeFrontAddress,
  setStoreFrontAddress,
  storeABN,
  setStoreABN,
  timePick1,
  setTimePick1,
  timePick2,
  setTimePick2,
  beforeTime,
  setBeforeTime,
  afterTime,
  setAfterTime,
  isTimePickerOpen1,
  setTimePickerOpen1,
  isTimePickerOpen2,
  setTimePickerOpen2,
  beforePickerOpen,
  setBeforePickerOpen,
  afterPickerOpen,
  setAfterPickerOpen,
  storerows,
  handleStoreInputChange,
  handleSelectStoreFrontJob,
  handleSelectRotation,
  handleAddStoreRow,
  handleDeleteStoreRow,
  handleCloseAllDropdown,
  storeFrontJobOptions,
  rotationOptions,
  showTooltip3,
  dropdownVisibleIndex,
  rotationdropdownVisibleIndex,
  notes,
  setNotes,
  isStorefront,
  toggleRotationDropdown,
  toggleDropdown,
  itemCodeOptions,
}) => {
  const [jobList, setJobLst] = useState([]);
  const {StoreFrontDropdownData} = useSelector(state => state.DropdownList);
  const {UserData} = useSelector(state => state.UserDetails);
  const strTradeType = UserData?.data?.trade;
  
  useEffect(() => {
    const storeFront = async () => {
      if (StoreFrontDropdownData?.status === true) {
        setJobLst(StoreFrontDropdownData.CommercialJob);
      }
    };
    storeFront();
  }, [StoreFrontDropdownData]);
  return (
    <>
      {isStorefront && (
        <>
          <CustomTextInput
            label="Store Name (Trading As)"
            placeholder="Store name"
            icon="store"
            value={storeName}
            required={true}
            onChangeText={setStorename}
            onFocus={handleCloseAllDropdown}
          />
          <CustomTextInput
            label="Store Front Address"
            placeholder="Enter Store Front address"
            icon="map-marker"
            value={storeFrontAddress}
            onFocus={handleCloseAllDropdown}
            onChangeText={setStoreFrontAddress}
          />
          <CustomTextInput
            label="ABN"
            placeholder="ABN"
            icon="note"
            value={storeABN}
            onFocus={handleCloseAllDropdown}
            onChangeText={setStoreABN}
          />

          {/* Trading Hours */}
          <Text style={CreateQuoteStyle.label}>Trading Hours <Text style={CreateQuoteStyle.requiredText}>*</Text></Text>
          <View style={{flexDirection: 'row', flex: 1}}>
            {/* First Time Picker */}
            <TouchableOpacity
              style={CreateQuoteStyle.inputWithIcon}
              onPress={() => {
                setTimePickerOpen1(true);
                handleCloseAllDropdown();
              }}>
              <VectorIcon
                icon="MaterialIcons"
                name="access-time"
                size={20}
                color={Colors.blue_theme_Color}
              />
              <Text style={{marginLeft: 5, color: Colors.white_text_color}}>
                {timePick1
                  ? timePick1
                  : 'Pick Time'}
              </Text>
            </TouchableOpacity>

            {/* Second Time Picker */}
            <TouchableOpacity
              style={CreateQuoteStyle.inputWithIcon}
              onPress={() => {
                setTimePickerOpen2(true);
                handleCloseAllDropdown();
              }}>
              <VectorIcon
                icon="MaterialIcons"
                name="access-time"
                size={20}
                color={Colors.blue_theme_Color}
              />
              <Text style={{marginLeft: 5, color: Colors.white_text_color}}>
                {timePick2
                  ? timePick2
                  : 'Pick Time'}
              </Text>
            </TouchableOpacity>

            <CustomTimePicker
              visible={isTimePickerOpen1}
              onClose={() => setTimePickerOpen1(false)}
              onConfirm={time => setTimePick1(time)}
              selectedTime={timePick1}
            />

            <CustomTimePicker
              visible={isTimePickerOpen2}
              onClose={() => setTimePickerOpen2(false)}
              onConfirm={time => setTimePick2(time)}
              selectedTime={timePick2}
            />
          </View>

          {/* Not Before/Not After */}
          <Text style={CreateQuoteStyle.label}>Not Before/Not After <Text style={CreateQuoteStyle.requiredText}>*</Text></Text>
          <View style={{flexDirection: 'row', flex: 1}}>
            {/* Before Time Picker */}
            <TouchableOpacity
              style={CreateQuoteStyle.inputWithIcon}
              onPress={() => {
                setBeforePickerOpen(true);
                handleCloseAllDropdown();
              }}>
              <VectorIcon
                icon="MaterialIcons"
                name="access-time"
                size={20}
                color={Colors.blue_theme_Color}
              />
              <Text style={{marginLeft: 5, color: Colors.white_text_color}}>
                {beforeTime
                  ? beforeTime : 'Before Time'}
              </Text>
            </TouchableOpacity>

            {/* Custom Time Picker for Before Time */}
            <CustomTimePicker
              visible={beforePickerOpen}
              onClose={() => setBeforePickerOpen(false)}
              onConfirm={time => setBeforeTime(time)}
              selectedTime={beforeTime}
            />

            {/* After Time Picker */}
            <TouchableOpacity
              style={CreateQuoteStyle.inputWithIcon}
              onPress={() => {
                setAfterPickerOpen(true);
                handleCloseAllDropdown();
              }}>
              <VectorIcon
                icon="MaterialIcons"
                name="access-time"
                size={20}
                color={Colors.blue_theme_Color}
              />
              <Text style={{marginLeft: 5, color: Colors.white_text_color}}>
                {afterTime ? afterTime : 'After Time'}
              </Text>
            </TouchableOpacity>

            {/* Custom Time Picker for After Time */}
            <CustomTimePicker
              visible={afterPickerOpen}
              onClose={() => setAfterPickerOpen(false)}
              onConfirm={time => setAfterTime(time)}
              selectedTime={afterTime}
            />
          </View>

          {/* Dynamic Rows */}
          {storerows.map((row, index) => (
            <View style={CreateQuoteStyle.rowContainer} key={index}>
              {/* Job Input and Dropdown */}
              <View style={CreateQuoteStyle.dropdownWrapper}>
                <View>
                  {index == 0 && (
                    <Text style={CreateQuoteStyle.label}>Job Type <Text style={CreateQuoteStyle.requiredText}>*</Text></Text>
                  )}
                  <View style={CreateQuoteStyle.inputforToolTip}>
                    <TouchableOpacity
                      style={CreateQuoteStyle.setUpContainer}
                      onPress={() => toggleDropdown(index)}>
                      <Text style={CreateQuoteStyle.setUpText}>
                        {row?.job || 'Set up'}
                      </Text>
                    </TouchableOpacity>
                    {/* Icon container */}
                    <TouchableOpacity
                      style={CreateQuoteStyle.iconContainer}
                      onPress={() => showTooltip3(row?.msg)}>
                      <VectorIcon
                        icon="Entypo"
                        name="info-with-circle"
                        size={20}
                        color={Colors.blue_theme_Color}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {dropdownVisibleIndex === index && (
                  <ScrollView
                    style={
                      index === 0
                        ? CreateQuoteStyle.storeFrontdropdown
                        : CreateQuoteStyle.storeFrontdropdown1
                    }
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}>
                    {itemCodeOptions
                      // .filter(option => option.Code.includes('Str'))
                      .filter(option => option?.trade_type?.includes(strTradeType))
                      .map((option, optionIndex) => (
                        <TouchableOpacity
                          key={optionIndex}
                          onPress={() =>
                            handleSelectStoreFrontJob(index, option)
                          }
                          style={CreateQuoteStyle.dropdownItem}>
                          <Text style={CreateQuoteStyle.dropdownText}>
                            {option?.Name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                )}
              </View>

              {/* Rotation Input */}
              <View style={CreateQuoteStyle.dropdownWrapper}>
                <View>
                  {index == 0 && (
                    <Text style={CreateQuoteStyle.label}>Rotation <Text style={CreateQuoteStyle.requiredText}>*</Text></Text>
                  )}
                  <TouchableOpacity
                    onPress={() => toggleRotationDropdown(index)}
                    style={CreateQuoteStyle.inputforToolTip}>
                    <TextInput
                      style={{flex: 1, color: Colors.white_text_color}}
                      placeholder="Rotation"
                      placeholderTextColor={Colors.white_text_color}
                      value={row.rotation}
                      onChangeText={text =>
                        handleStoreInputChange(index, 'rotation', text)
                      }
                      editable={false}
                      onFocus={() => toggleRotationDropdown(index)}
                    />
                    {/* Icon container */}
                    {/* <TouchableOpacity
                      style={CreateQuoteStyle.iconContainer}
                      onPress={showTooltip3}>
                      <VectorIcon
                        icon="Entypo"
                        name="info-with-circle"
                        size={20}
                        color={Colors.blue_theme_Color}
                      />
                    </TouchableOpacity> */}
                  </TouchableOpacity>
                </View>
                {rotationdropdownVisibleIndex === index && (
                  <ScrollView
                    style={
                      index == 0
                        ? CreateQuoteStyle.storeFrontdropdown
                        : CreateQuoteStyle.storeFrontdropdown1
                    }
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}>
                    {rotationOptions
                      // .filter(option =>
                      //   option
                      //     .toLowerCase()
                      //     .includes(row.rotation.toLowerCase()),
                      // )
                      .map((option, optionIndex) => (
                        <TouchableOpacity
                          key={optionIndex}
                          onPress={() => handleSelectRotation(index, option)}
                          style={CreateQuoteStyle.dropdownItem}>
                          <Text style={CreateQuoteStyle.dropdownText}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                )}
              </View>

              {/* Price Input */}
              <View>
                {index == 0 && (
                  <Text style={CreateQuoteStyle.label}>Price <Text style={CreateQuoteStyle.requiredText}>*</Text></Text>
                )}
                <TextInput
                    style={[CreateQuoteStyle.input, {flex: 0.6}]}
                    placeholder="Price in AUD"
                    placeholderTextColor={Colors.white_text_color}
                    value={row.price}
                    keyboardType="numeric"
                    onChangeText={text =>
                      handleStoreInputChange(index, 'price', text)
                    }
                    onFocus={handleCloseAllDropdown} // Close dropdown
                  />
              </View>
              {/* Delete Button */}
              <View>
                {index == 0 && <Text style={CreateQuoteStyle.label}> </Text>}
                <TouchableOpacity
                  style={CreateQuoteStyle.deleteButton}
                  onPress={() => handleDeleteStoreRow(index)}>
                  <VectorIcon
                    icon="MaterialIcons"
                    name="delete"
                    size={24}
                    color={Colors.pink_theme_color}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {/* Add Row Button */}
          <TouchableOpacity
            style={CreateQuoteStyle.addButton}
            onPress={handleAddStoreRow}>
            <VectorIcon
              icon="MaterialIcons"
              name="add-circle"
              size={30}
              color={Colors.blue_theme_Color}
              style={{textAlign: 'center'}}
            />
          </TouchableOpacity>

          <CustomTextInput
            label="Notes"
            placeholder="Add any additional notes"
            icon="note"
            value={notes}
            onChangeText={setNotes}
            onFocus={handleCloseAllDropdown}
          />
        </>
      )}
    </>
  );
};

export default StorefrontForm;
