import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import CustomTextInput from '../../../ReusableComponent/CustomTextInput';
import Colors from '../../../Assets/Style/Color';
import CreateQuoteStyle from '../../../utils/Stylesheet/CreateQuoteStyle';
import {useSelector} from 'react-redux';
const CommercialQuoteSection = ({
  isCommercial,
  SiteName,
  setSiteName,
  commercialAddress,
  setCommercialAddress,
  ABN,
  setABN,
  rows,
  handleInputChange,
  dropdownVisibleIndex,
  toggleDropdown,
  handleComSelectJob,
  comHoursDropdown,
  toggleComHoursDropdown,
  hoursOptions,
  handleComSelectHours,
  comMinDropdown,
  toggleComMinDropdown,
  minOptions,
  handleComSelectMin,
  notes,
  setNotes,
  handleAddRow,
  handleDeleteRow,
  showTooltip1,
  swmsRows,
  toggleSwmsDropdown,
  selectHazard,
  handleSwmsInputChange,
  handleSwmsImageRemove,
  openSwmsModal,
  handleAddSWMSRow,
  handleDeleteSWMSRow,
  handleCloseAllDropdown,
  SwmsDropdownVisibleIndex,
  showTooltip2,
  toggleSwmsRiskLevelDropdown,
  SwmsRiskLevelDropdownVisibleIndex,
  selectSwmsRiskLevel,
  itemCodeOptions,
  clearHazard,
  setSwmsDropdownVisibleIndex
}) => {
  const {GetHazardData} = useSelector(state => state.GetHazardsSlice);
  const {GetRiskLevelData} = useSelector(state => state.RiskLevelsSlice);
  const {UserData} = useSelector(state => state.UserDetails);
  const comTradeType = UserData?.data?.trade;
  
  

  return (
    <>
      {isCommercial && (
        <>
          <CustomTextInput
            label="Site Name"
            placeholder="Site name"
            icon="domain"
            value={SiteName}
            required={true}
            onChangeText={setSiteName}
            onFocus={handleCloseAllDropdown}
          />
          <CustomTextInput
            label="Commercial Address"
            placeholder="Enter Commercial address"
            icon="map-marker"
            value={commercialAddress}
            onFocus={handleCloseAllDropdown}
            onChangeText={setCommercialAddress}
          />
          <CustomTextInput
            label="ABN"
            placeholder="ABN"
            icon="note"
            value={ABN}
            onFocus={handleCloseAllDropdown}
            onChangeText={setABN}
          />
          {rows.map((row, index) => (
            <View style={CreateQuoteStyle.rowContainer} key={index}>
              <View style={CreateQuoteStyle.dropdownWrapper}>
                <View>
                  {index == 0 && (
                    <Text style={CreateQuoteStyle.label}>
                      Job Type{' '}
                      <Text style={CreateQuoteStyle.requiredText}>*</Text>
                    </Text>
                  )}
                  <View style={CreateQuoteStyle.inputforToolTip}>
                    <TouchableOpacity
                      style={CreateQuoteStyle.setUpContainer}
                      onPress={() => toggleDropdown(index)}>
                      <Text style={CreateQuoteStyle.setUpText}>
                        {row.setUp || 'Set up'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={CreateQuoteStyle.iconContainer}
                      onPress={() => showTooltip1(row?.msg)}>
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
                    style={[
                      CreateQuoteStyle.dropdown,
                      index === 0 ? {top: 78} : {},
                    ]}
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps="always">
                    {itemCodeOptions
                      .filter(option => option?.trade_type?.includes(comTradeType))
                      .map((option, optionIndex) => (
                        <TouchableOpacity
                          key={optionIndex}
                          onPress={() => handleComSelectJob(index, option)}
                          style={CreateQuoteStyle.dropdownItem}>
                          <Text style={CreateQuoteStyle.dropdownText}>
                            {option?.Name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                )}
              </View>

              
              <View>
                {index == 0 && (
                  <Text style={CreateQuoteStyle.label}>
                    Time Est{' '}
                    <Text style={CreateQuoteStyle.requiredText}>*</Text>
                  </Text>
                )}
                <View style={CreateQuoteStyle.hoursMinContainer}>
                  
                  <View style={CreateQuoteStyle.dropdownWrapper}>
                    <TouchableOpacity
                      style={CreateQuoteStyle.inputForHours}
                      onPress={() => toggleComHoursDropdown(index)}>
                      <Text style={CreateQuoteStyle.dropdownText1}>
                        {row.hours ? row.hours : 'Hours'}
                      </Text>
                    </TouchableOpacity>
                    {comHoursDropdown === index && (
                      <ScrollView
                        style={CreateQuoteStyle.dropdown}
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="always">
                        {hoursOptions.map((option, optionIndex) => (
                          <TouchableOpacity
                            key={optionIndex}
                            onPress={() => handleComSelectHours(index, option)}
                            style={CreateQuoteStyle.dropdownItem}>
                            <Text style={CreateQuoteStyle.dropdownText1}>
                              {option}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    )}
                  </View>

                  <View style={CreateQuoteStyle.dropdownWrapper}>
                    <TouchableOpacity
                      style={CreateQuoteStyle.inputForMin}
                      onPress={() => toggleComMinDropdown(index)}>
                      <Text style={CreateQuoteStyle.dropdownText1}>
                        {row.min ? row.min : 'Min'}
                      </Text>
                    </TouchableOpacity>
                    {comMinDropdown === index && (
                      <ScrollView
                        style={CreateQuoteStyle.dropdown}
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="always">
                        {minOptions.map((option, optionIndex) => (
                          <TouchableOpacity
                            key={optionIndex}
                            onPress={() => handleComSelectMin(index, option)}
                            style={CreateQuoteStyle.dropdownItem}>
                            <Text style={CreateQuoteStyle.dropdownText1}>
                              {option}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    )}
                  </View>
                </View>
              </View>

              <View style={{width: 90}}>
                {index == 0 && (
                  <Text style={CreateQuoteStyle.label}>
                    Price <Text style={CreateQuoteStyle.requiredText}>*</Text>
                  </Text>
                )}
                <View style={CreateQuoteStyle.inputPrice}>
                  <TouchableOpacity style={CreateQuoteStyle.iconContainerPrice}>
                    <VectorIcon
                      icon="FontAwesome"
                      name="dollar"
                      size={20}
                      color={Colors.blue_theme_Color}
                    />
                  </TouchableOpacity>
                  <TextInput
                    style={{flex: 1, color: Colors.white_text_color}}
                    placeholder="AUD"
                    placeholderTextColor={Colors.white_text_color}
                    value={row.price}
                    keyboardType="numeric"
                    onChangeText={text =>
                      handleInputChange(index, 'price', text)
                    }
                    onFocus={handleCloseAllDropdown}
                  />
                </View>
              </View>

              <View>
                {index == 0 && <Text style={CreateQuoteStyle.label}></Text>}
                <TouchableOpacity
                  style={CreateQuoteStyle.deleteButton}
                  onPress={() => handleDeleteRow(index)}>
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

          <TouchableOpacity
            style={CreateQuoteStyle.addButton}
            onPress={handleAddRow}>
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

          <Text style={CreateQuoteStyle.label}>
            SWMS <Text style={CreateQuoteStyle.requiredText}>*</Text>
          </Text>
          {swmsRows?.map((row, index) => (
            <View style={CreateQuoteStyle.swmsBlock} key={index}>
              <View style={CreateQuoteStyle.dropdownWrapper}>
                <View style={CreateQuoteStyle.inputforToolTip}>
                  <TextInput
                    style={{flex: 1, color: Colors.white_text_color}}
                    placeholder="Type of Hazard"
                    placeholderTextColor={Colors.gray_html_color}
                    value={row?.hazard}
                    onFocus={() => toggleSwmsDropdown(index)}
                    onChangeText={text =>
                      handleSwmsInputChange(index, 'hazard', text)
                    }
                  />
                   <TouchableOpacity
                    style={CreateQuoteStyle.iconContainer}
                    onPress={showTooltip2}>
                    <VectorIcon
                      icon="Entypo"
                      name="info-with-circle"
                      size={20}
                      color={Colors.blue_theme_Color}
                    />
                  </TouchableOpacity>
                  {row?.hazard && (
                    <TouchableOpacity style={CreateQuoteStyle.iconContainer} onPress={() => clearHazard(index)}>
                      <VectorIcon
                        icon="Entypo"
                        name="cross"
                         
                        size={20}
                        color={Colors.blue_theme_Color}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={CreateQuoteStyle.iconContainer}>
                    <VectorIcon
                    icon="FontAwesome"
                    name={
                      SwmsDropdownVisibleIndex === index
                        ? 'angle-up'
                        : 'angle-down'
                    }
                     
                    size={20}
                    color={Colors.blue_theme_Color}
                  />
                  </TouchableOpacity>
                 
                </View>

                {SwmsDropdownVisibleIndex === index && (
                  <View style={CreateQuoteStyle.dropdown}>
                    <ScrollView
                      nestedScrollEnabled={true}
                      keyboardShouldPersistTaps="always">
                      {GetHazardData?.Data?.filter(option =>
                        option?.name
                          ?.toLowerCase()
                          .includes(row?.hazard?.toLowerCase()),
                      ).map((option, optionIndex) => (
                        <TouchableOpacity
                          key={optionIndex}
                          onPress={() => selectHazard(index, option)}
                          style={CreateQuoteStyle.dropdownItem}>
                          <Text style={CreateQuoteStyle.dropdownText}>
                            {option.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <TouchableOpacity
                      onPress={() => setSwmsDropdownVisibleIndex(false)}
                      style={CreateQuoteStyle.cancelButton}>
                      <Text style={CreateQuoteStyle.cancelText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={CreateQuoteStyle.swmsRow}>
                <View style={CreateQuoteStyle.dropdownWrapper}>
                  <TouchableOpacity
                    onPress={() => toggleSwmsRiskLevelDropdown(index)}
                    style={CreateQuoteStyle.inputforToolTip}>
                    <TextInput
                      style={{flex: 1, color: Colors.white_text_color}}
                      placeholder="Risk Level"
                      placeholderTextColor={Colors.gray_html_color}
                      value={row?.riskLevel}
                      editable={false}
                      onFocus={() => toggleSwmsRiskLevelDropdown(index)}
                      onChangeText={text =>
                        handleSwmsInputChange(index, 'riskLevel', text)
                      }
                    />
                  </TouchableOpacity>

                  {SwmsRiskLevelDropdownVisibleIndex === index && (
                    <ScrollView
                      style={CreateQuoteStyle.dropdown}
                      nestedScrollEnabled={true}
                      keyboardShouldPersistTaps="always">
                      {GetRiskLevelData?.Data?.map((option, optionIndex) => (
                        <TouchableOpacity
                          key={optionIndex}
                          onPress={() => selectSwmsRiskLevel(index, option)}
                          style={CreateQuoteStyle.dropdownItem}>
                          <Text style={CreateQuoteStyle.dropdownText}>
                            {option?.level
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, l => l.toUpperCase())}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>

                {row?.image?.uri ? (
                  <>
                    <Image
                      source={{uri: row?.image?.uri}}
                      style={CreateQuoteStyle.image}
                    />
                    <TouchableOpacity
                      style={CreateQuoteStyle.iconHoverOnImageRow}
                      onPress={() => handleSwmsImageRemove(index)}>
                      <VectorIcon
                        icon="Entypo"
                        name="cross"
                        size={15}
                        color={'#000'}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity onPress={() => openSwmsModal(index)}>
                    <VectorIcon
                      icon="FontAwesome"
                      name="camera"
                      size={30}
                      color={Colors.blue_theme_Color}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => handleDeleteSWMSRow(index)}
                  style={{marginLeft: 10}}>
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

          <TouchableOpacity
            style={CreateQuoteStyle.addButton}
            onPress={handleAddSWMSRow}>
            <VectorIcon
              icon="MaterialIcons"
              name="add-circle"
              size={30}
              color={Colors.blue_theme_Color}
            />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default CommercialQuoteSection;
