import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import CustomTextInput from '../../../ReusableComponent/CustomTextInput';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Colors from '../../../Assets/Style/Color';
import CreateQuoteStyle from '../../../utils/Stylesheet/CreateQuoteStyle';
import { useSelector } from 'react-redux';

const ResidentialQuoteForm = ({
  isResidential,
  ResidentialAddress,
  resrows,
  resDropdownVisibleIndex,
  hoursDropdown,
  minDropdown,
  resJobOptions,
  hoursOptions,
  minOptions,
  notes,
  handleCloseAllDropdown,
  setResidentialAddress,
  handleResInputChange,
  toggleResDropdown,
  handleResSelectJob,
  toggleHoursDropdown,
  handleResSelectHours,
  toggleMinDropdown,
  handleResSelectMin,
  handleTimeEstInputChange,
  handleDeleteResRow,
  handleAddResRow,
  showTooltip,
  setNotes,
  itemCodeOptions
}) => {
  const [jobList, setJobLst] = useState([]);
  const {ResidentialDropdownData} = useSelector(state => state.DropdownList);
  const {UserData} = useSelector(state => state.UserDetails);
  const resTradeType = UserData?.data?.trade;
  
  useEffect(() => {
    const residential = async () => {
      if (ResidentialDropdownData?.status === true) {
        setJobLst(ResidentialDropdownData.CommercialJob);
      }
    };
    residential();
  }, [ResidentialDropdownData]);
  return (
    isResidential && (
      <>
        <CustomTextInput
          label="Residential Address"
          placeholder="Enter Residential address"
          icon="map-marker"
          value={ResidentialAddress}
          onFocus={() => handleCloseAllDropdown()}
          onChangeText={setResidentialAddress}
        />
        {/* Dynamic Rows */}
        {resrows.map((row, index) => (
          <View style={CreateQuoteStyle.rowContainer} key={index}>
            {/* Job Input and Dropdown */}
            <View style={CreateQuoteStyle.dropdownWrapper}>
              <View>
                {index === 0 && <Text style={CreateQuoteStyle.label}>Job type <Text style={CreateQuoteStyle.requiredText}>*</Text></Text>}
                <View style={CreateQuoteStyle.inputforToolTip}>
                  <TouchableOpacity style={CreateQuoteStyle.setUpContainer} onPress={() => toggleResDropdown(index)}>
                    <Text style={CreateQuoteStyle.setUpText}>{row.setUp || 'Set up'}</Text>
                  </TouchableOpacity>
                  {/* Icon container */}
                  <TouchableOpacity
                    style={CreateQuoteStyle.iconContainer}
                    onPress={()=>showTooltip(row.msg)}
                  >
                    <VectorIcon
                      icon="Entypo"
                      name="info-with-circle"
                      size={20}
                      color={Colors.blue_theme_Color}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Dropdown */}
              {resDropdownVisibleIndex === index && (
                <ScrollView
                  style={[
                    CreateQuoteStyle.residentialJobDropdown,
                    index === 0 ? { top: 78 } : {}
                  ]}
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps="always"
                  showsVerticalScrollIndicator={false}
                >
                  {itemCodeOptions
                   .filter(option => option?.trade_type?.includes(resTradeType))
                    .map((option, optionIndex) => (
                      <TouchableOpacity
                        key={optionIndex}
                        onPress={() => handleResSelectJob(index, option)}
                        style={CreateQuoteStyle.dropdownItem}
                      >
                        <Text style={CreateQuoteStyle.dropdownText}>
                          {option?.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              )}

            </View>

            {/* timeEst Input */}
            <View>
              {index === 0 && <Text style={CreateQuoteStyle.label}>Est Time <Text style={CreateQuoteStyle.requiredText}>*</Text></Text>}
              <View style={CreateQuoteStyle.hoursMinContainer}>
                <View style={CreateQuoteStyle.dropdownWrapper}>
                  <TouchableOpacity
                    style={CreateQuoteStyle.inputForHours}
                    onPress={() => toggleHoursDropdown(index)}
                  >
                    <Text
                      style={{
                        justifyContent: 'center',
                        textAlign: 'center',
                        color : Colors.white_text_color
                      }}
                    >
                      {row.hours} Hour
                    </Text>
                  </TouchableOpacity>

                  {/* Dropdown */}
                  {hoursDropdown === index && (
                    <ScrollView
                      style={CreateQuoteStyle.dropdown}
                      nestedScrollEnabled={true}
                     keyboardShouldPersistTaps='always'
                      showsVerticalScrollIndicator={false}
                    >
                      {hoursOptions.map((option, optionIndex) => (
                        <TouchableOpacity
                          key={optionIndex}
                          onPress={() => handleResSelectHours(index, option)}
                          style={CreateQuoteStyle.dropdownItem}
                        >
                          <Text style={CreateQuoteStyle.dropdownText}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>
                <View style={CreateQuoteStyle.dropdownWrapper}>
                  <TouchableOpacity
                    style={CreateQuoteStyle.inputForMin}
                    onPress={() => toggleMinDropdown(index)}
                  >
                    <Text
                      style={{
                        justifyContent: 'center',
                        textAlign: 'center',
                        color : Colors.white_text_color
                      }}
                    >
                      {row.min} Min
                    </Text>
                  </TouchableOpacity>

                  {/* Dropdown */}
                  {minDropdown === index && (
                    <ScrollView
                      style={CreateQuoteStyle.dropdown}
                      nestedScrollEnabled={true}
                     keyboardShouldPersistTaps='always'
                      showsVerticalScrollIndicator={false}
                    >
                      {minOptions.map((option, optionIndex) => (
                        <TouchableOpacity
                          key={optionIndex}
                          onPress={() => handleResSelectMin(index, option)}
                          style={CreateQuoteStyle.dropdownItem}
                        >
                          <Text style={CreateQuoteStyle.dropdownText}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>
              </View>
            </View>

            {/* Price Input */}
            <View style={{ width: 90 }}>
              {index === 0 && <Text style={CreateQuoteStyle.label}>Price <Text style={CreateQuoteStyle.requiredText}>*</Text></Text>}
              <View style={CreateQuoteStyle.inputPrice}>
                {/* Icon container */}
                <TouchableOpacity style={CreateQuoteStyle.iconContainerPrice}>
                  <VectorIcon
                    icon="FontAwesome"
                    name="dollar"
                    size={20}
                    color={Colors.blue_theme_Color}
                  />
                </TouchableOpacity>
                <TextInput
                  style={{ flex: 1, color : Colors.white_text_color  }}
                  placeholder="AUD"
                  placeholderTextColor={Colors.white_text_color}
                  value={row.price}
                  keyboardType="numeric"
                  onChangeText={(text) => handleTimeEstInputChange(index, 'price', text)}
                  onFocus={() => handleCloseAllDropdown()}
                />
              </View>
            </View>
            {/* Delete Button */}
            <View>
              {index === 0 && <Text style={CreateQuoteStyle.label}></Text>}
              <TouchableOpacity
                style={CreateQuoteStyle.deleteButton}
                onPress={() => handleDeleteResRow(index)}
              >
                <VectorIcon
                  icon="MaterialIcons"
                  name="delete"
                  size={20}
                  color={Colors.blue_theme_Color}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add Row Button */}
        <TouchableOpacity
          style={CreateQuoteStyle.addButton}
          onPress={handleAddResRow}
        >
          <VectorIcon
            icon="MaterialIcons"
            name="add-circle"
            size={30}
            color={Colors.blue_theme_Color}
            style={{ textAlign: 'center' }}
          />
        </TouchableOpacity>

        <CustomTextInput
          label="Notes"
          placeholder="Add any additional notes"
          icon="note"
          value={notes}
          onChangeText={setNotes}
          onFocus={() => handleCloseAllDropdown()}
        />
      </>
    )
  );
};

export default ResidentialQuoteForm;
