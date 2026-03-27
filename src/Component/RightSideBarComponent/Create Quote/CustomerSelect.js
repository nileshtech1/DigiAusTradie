import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Colors from '../../../Assets/Style/Color';
import CreateQuoteStyle from '../../../utils/Stylesheet/CreateQuoteStyle';
import CustomTextInput from '../../../ReusableComponent/CustomTextInput';

const CustomerSelect = ({
  selectCustomer,
  setSelectCustomer,
  selectDropdownVisbile,
  customerList,
  toggleSelectCustomer,
  showInfo,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  email,
  setEmail,
  address,
  setAddress,
  businessName,
  setBusinessName,
  isCommercial,
  isStorefront,
  source,
  setSource,
  isSourceDropdown,
  sources,
  handleSourceSelect,
  toggleSource,
  handleCloseAllDropdown,
  setIsCommercial,
  setIsResidential,
  setIsStorefront,
  setIsShowResidential,
  setIsShowStorefront,
  setIsShowCommercial,
  setSelectDropdownVisbile,
  setShowInfo,
  setResidentialAddress,
  setCommercialAddress,
  setStoreFrontAddress,
  setNotes,
  setSelectedCustomerId,
  isResidential,
  editQuote,
}) => {
  const handleSelectJob = selectedJob => {
    if (selectedJob) {
      setFirstName(selectedJob?.first_name || '');
      setLastName(selectedJob?.last_name || '');
      setPhone(selectedJob?.phone || '');
      setEmail(selectedJob?.email || '');
      setAddress(selectedJob?.address || '');
      setResidentialAddress(selectedJob?.address || '');
      setCommercialAddress(selectedJob?.address || '');
      setStoreFrontAddress(selectedJob?.address || '');
      setBusinessName(selectedJob?.business_name || '');
      setNotes(selectedJob?.notes || '');
      setSource(selectedJob?.how_did_you_hear || '');
      setSelectedCustomerId(selectedJob?.id || '');
      setSelectCustomer(
        selectedJob?.first_name + ' ' + selectedJob?.last_name || '',
      );
      const checkboxesData = {
        residential: selectedJob?.contact_category?.includes('residential'),
        commercial: selectedJob?.contact_category?.includes('commercial'),
        storefront: selectedJob?.contact_category?.includes('storefront'),
      };
      const checkboxes = checkboxesData || {};

      const checkedCount = Object.values(checkboxes).filter(
        value => value,
      ).length;

      if (checkedCount > 1) {
        // Check only the first one that is true, and uncheck the rest
        setIsCommercial(checkboxes.commercial && checkedCount === 1);
        setIsResidential(checkboxes.residential && checkedCount === 1);
        setIsStorefront(checkboxes.storefront && checkedCount === 1);
      } else {
        // If only one checkbox is checked, set it accordingly
        setIsCommercial(checkboxes.commercial);
        setIsResidential(checkboxes.residential);
        setIsStorefront(checkboxes.storefront);
      }

      setIsShowResidential(
        selectedJob?.contact_category?.includes('residential') || false,
      );
      setIsShowStorefront(
        selectedJob?.contact_category?.includes('storefront') || false,
      );
      setIsShowCommercial(
        selectedJob?.contact_category?.includes('commercial') || false,
      );
    }
    setSelectDropdownVisbile(false);
    setShowInfo(true);
  };

  const removeSelectedCustomer = () => {
    setSelectCustomer('');
    setSelectDropdownVisbile(true);
    setShowInfo(false);
    setIsResidential(false);
    setIsCommercial(false);
    setIsStorefront(false);
    setIsShowCommercial(false);
    setIsShowResidential(false);
    setIsShowStorefront(false);
  };

  return (
    <View>
      <View style={CreateQuoteStyle.dropdownWrapper}>
        {!editQuote && (
          <Text style={CreateQuoteStyle.label}>Select Customer</Text>
        )}
        <TouchableOpacity
          style={{...CreateQuoteStyle.inputWithIcon}}
          onPress={() => toggleSelectCustomer()}
          disabled={editQuote && true}>
          <VectorIcon
            icon="FontAwesome"
            name="user"
            style={CreateQuoteStyle.iconMargin}
            size={20}
            color={Colors.blue_theme_Color}
          />
          <TextInput
            placeholder="Select Customer"
            placeholderTextColor={Colors.white_text_color}
            value={selectCustomer}
            editable={editQuote && false}
            onChangeText={setSelectCustomer}
            onFocus={() => toggleSelectCustomer()}
            style={{marginLeft: 10, flex: 1, color: Colors.white_text_color}}
          />
          {selectCustomer !== '' && !editQuote && (
            <TouchableOpacity
              onPress={removeSelectedCustomer}
              style={{padding: 5}}>
              <VectorIcon
                icon="Entypo"
                name="cross"
                style={CreateQuoteStyle.crossIcon}
                size={20}
                color={Colors.blue_theme_Color}
              />
            </TouchableOpacity>
          )}
          {!editQuote && (
            <VectorIcon
              icon="FontAwesome"
              name={selectDropdownVisbile ? 'angle-up' : 'angle-down'}
              size={20}
              color={Colors.blue_theme_Color}
            />
          )}
        </TouchableOpacity>
        {selectDropdownVisbile && (
          <View style={CreateQuoteStyle.CustomerDropdown}>
            <ScrollView
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always">
              {customerList &&
              customerList.filter(
                option =>
                  (`${option.first_name} ${option.last_name}`
                    .toLowerCase()
                    .includes(selectCustomer.toLowerCase()) ||
                    option.email
                      .toLowerCase()
                      .includes(selectCustomer.toLowerCase())) &&
                  option.contact_category[0] !== 'supplier',
              ).length > 0 ? (
                customerList
                  .filter(
                    option =>
                      (`${option.first_name} ${option.last_name}`
                        .toLowerCase()
                        .includes(selectCustomer.toLowerCase()) ||
                        option.email
                          .toLowerCase()
                          .includes(selectCustomer.toLowerCase())) &&
                      option.contact_category[0] !== 'supplier',
                  )
                  .map((option, optionIndex) => (
                    <TouchableOpacity
                      key={optionIndex}
                      onPress={() => handleSelectJob(option)}
                      style={CreateQuoteStyle.dropdownItem}>
                      <Text style={CreateQuoteStyle.dropdownText}>
                        {`${option.first_name} ${option.last_name} - ${option.email}`}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          marginTop: 4,
                        }}>
                        {option.contact_category?.map((category, catIndex) => (
                          <View
                            key={catIndex}
                            style={{
                              backgroundColor: Colors.blue_theme_Color,
                              paddingHorizontal: 6,
                              paddingVertical: 2,
                              borderRadius: 10,
                              marginRight: 5,
                              marginTop: 4,
                            }}>
                            <Text
                              style={{
                                color: Colors.white_text_color,
                                fontSize: 12,
                              }}>
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </TouchableOpacity>
                  ))
              ) : (
                <View style={{alignItems: 'center', marginTop: 20}}>
                  <Text style={{color: Colors.gray_text_color, fontSize: 14}}>
                    No customers found.
                  </Text>
                </View>
              )}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setSelectDropdownVisbile(false)}
              style={CreateQuoteStyle.cancelButton}>
              <Text style={CreateQuoteStyle.cancelText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {showInfo && (
        <>
          <View style={{flexDirection: 'row'}}>
            <CustomTextInput
              label="First Name"
              placeholder="First name     "
              icon="account"
              value={firstName}
              editable={false}
              required={true}
              onChangeText={setFirstName}
              onFocus={() => handleCloseAllDropdown()}
              style={{
                marginRight: 5,
                backgroundColor: 'transparent',
                height: 50,
              }}
            />
            <CustomTextInput
              label="Last Name"
              placeholder="Last name       "
              icon="account"
              value={lastName}
              editable={false}
              required={true}
              onFocus={() => handleCloseAllDropdown()}
              onChangeText={setLastName}
            />
          </View>
          <CustomTextInput
            label="Phone"
            placeholder="Enter phone number"
            icon="phone"
            keyboardType="numeric"
            editable={false}
            value={phone}
            required={true}
            onFocus={() => handleCloseAllDropdown()}
            onChangeText={setPhone}
          />
          <CustomTextInput
            label="Email"
            placeholder="Enter email address"
            icon="email"
            editable={false}
            value={email}
            required={true}
            onFocus={() => handleCloseAllDropdown()}
            onChangeText={setEmail}
          />
          <CustomTextInput
            label="Address"
            placeholder="Enter address"
            icon="map-marker"
            editable={false}
            value={address}
            onFocus={() => handleCloseAllDropdown()}
            onChangeText={setAddress}
          />
          {!isResidential && (
            <CustomTextInput
              label="Business Name"
              placeholder="Enter business name"
              icon="briefcase"
              editable={false}
              value={businessName}
              onFocus={() => handleCloseAllDropdown()}
              required={isCommercial || isStorefront ? true : false}
              onChangeText={setBusinessName}
            />
          )}

          <View style={CreateQuoteStyle.dropdownWrapper}>
            <Text style={CreateQuoteStyle.label}>
              How did you hear about us:
            </Text>
            <TouchableOpacity
              style={{...CreateQuoteStyle.inputWithIcon}}
              disabled={true}
              onPress={() => toggleSource()}>
              <VectorIcon
                icon="FontAwesome"
                name="bullhorn"
                style={CreateQuoteStyle.iconMargin}
                size={20}
                color={Colors.blue_theme_Color}
              />
              <TextInput
                placeholder="Specific reference.."
                placeholderTextColor="#cccccc"
                value={source}
                editable={false}
                onChangeText={setSource}
                onFocus={() => toggleSource()}
                style={{
                  marginLeft: 10,
                  backgroundColor: 'transparent',
                  flex: 1,
                  color: '#fff',
                }}
              />
            </TouchableOpacity>
            {isSourceDropdown && (
              <ScrollView
                style={CreateQuoteStyle.CustomerDropdown}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps="always">
                {sources.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    onPress={() => handleSourceSelect(option.label)}
                    style={CreateQuoteStyle.dropdownItem}>
                    <Text style={CreateQuoteStyle.dropdownText}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default CustomerSelect;
