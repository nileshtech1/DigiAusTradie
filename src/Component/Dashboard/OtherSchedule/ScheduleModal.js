import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import {Checkbox, Switch} from 'react-native-paper';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import TimePickerModal from '../../../ReusableComponent/TimePickerModal';
import Colors from '../../../Assets/Style/Color';
import moment from 'moment';
import ScheduleModalStyle from '../../../utils/Stylesheet/ScheduleModalStyle';
import {useSelector} from 'react-redux';

const ScheduleModal = ({
  isModalVisible,
  setModalVisible,
  date,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  selectCustomer,
  setSelectCustomer,
  customerlist,
  setCust,
  handleSave,
  cust,
  customerData,
  setInitialEndTime,
  calculateTotalTimeEst,
  setSelectDropdownVisbile,
  selectDropdownVisbile,
  handleSelectJob,
  handleRemove,
  setTitle,
  setAddress,
  address,
  title,
  setSelectedType,
  selectedType,
  setUpdatedAddress,
  updatedAddress,
  changeAddressToggled,
  setChangeAddressToggled,
}) => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [isEndTimePickerOpen, setIsEndTimePickerOpen] = useState(false);
  const {InvoiceList} = useSelector(state => state.InvoiceList);

  const toggleSelectCustomer = () => {
    setSelectDropdownVisbile(!selectDropdownVisbile);
  };

  const capitalizeFirstLetter = str => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleCheckboxToggle = type => {
    setSelectedType(type);
    setSelectDropdownVisbile(false);
    setSelectCustomer('');
    setTitle('');
    setAddress('');
    setUpdatedAddress('');
    setChangeAddressToggled(false);
    setCust(null);
  };
  

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}>
      <View style={ScheduleModalStyle.modalContainer}>
        <Pressable
          style={ScheduleModalStyle.backgroundPressable}
          onPress={() => setModalVisible(false)}
        />
        <View style={ScheduleModalStyle.modalContentContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={ScheduleModalStyle.scrollableContent}>
            <Text style={ScheduleModalStyle.modalText}>Schedule</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Checkbox
                status={selectedType === 'Job' ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxToggle('Job')}
              />
              <Text>Job</Text>
              <Checkbox
                status={selectedType === 'Meeting' ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxToggle('Meeting')}
                style={{marginLeft: 20}}
              />
              <Text>Meeting/Task</Text>
              <Checkbox
                status={selectedType === 'Quote' ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxToggle('Quote')}
              />
              <Text>Quote</Text>
            </View>

            {selectedType === 'Job' ? (
              <View style={ScheduleModalStyle.dropdownWrapper}>
                <Text style={ScheduleModalStyle.label}>Select Customer</Text>
                <TouchableOpacity
                  style={ScheduleModalStyle.inputWithIcon}
                  onPress={toggleSelectCustomer}>
                  <VectorIcon
                    icon="FontAwesome"
                    name="user"
                    style={ScheduleModalStyle.iconMargin}
                    size={20}
                    color={Colors.theme_background_dark}
                  />
                  <TextInput
                    placeholder="Select Customer"
                    placeholderTextColor="#757575"
                    value={selectCustomer}
                    editable={false}
                    style={ScheduleModalStyle.inputField}
                  />
                  {selectCustomer !== '' && (
                    <TouchableOpacity onPress={handleRemove}>
                      <VectorIcon
                        icon="FontAwesome"
                        name="times"
                        size={18}
                        color={Colors.theme_background_dark}
                        style={ScheduleModalStyle.clearIcon}
                      />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>

                {selectDropdownVisbile && (
  <ScrollView
    style={ScheduleModalStyle.CustomerDropdown}
    nestedScrollEnabled={true}
    showsVerticalScrollIndicator={false}
  >
    {(() => {
      // Filter customers: accepted and not invoiced
      const filteredCustomers = customerlist.filter(option => {
        if (option?.status?.toUpperCase() !== 'ACCEPTED') return false;

        const isInvoiced = InvoiceList?.Invoices?.some(
          invoice => invoice?.Reference === option?.quotation_serial_no
        );

        return !isInvoiced;
      });

      if (filteredCustomers.length === 0) {
        // Show message if no customers match
        return (
         <TouchableOpacity onPress={toggleSelectCustomer} style={ScheduleModalStyle.dropdownItem}>
           <Text style={ScheduleModalStyle.dropdownText}>
            No customers available
          </Text>
         </TouchableOpacity>
        );
      }

      // Otherwise, render the filtered list
      return filteredCustomers.map((option, index) => (
        <TouchableOpacity
          key={option.quotation_serial_no || `customer-${index}`}
          onPress={() =>
            handleSelectJob(
              option,
              startTime,
              setSelectCustomer,
              setCust,
              setEndTime,
              setSelectDropdownVisbile
            )
          }
          style={ScheduleModalStyle.dropdownItem}
        >
          <Text style={ScheduleModalStyle.dropdownText}>
            {capitalizeFirstLetter(option.customer_name)}
          </Text>
          {option.quotation_serial_no && (
            <Text style={ScheduleModalStyle.dropdownTextSmall}>
              {option.quotation_serial_no}
            </Text>
          )}
        </TouchableOpacity>
      ));
    })()}
  </ScrollView>
)}


                {cust?.category_address && (
                  <>
                    <View style={{marginTop: 10}}>
                      <Text style={ScheduleModalStyle.label}>
                        Current Address ➡️ {cust.category_address}
                      </Text>
                    </View>
                    <View style={ScheduleModalStyle.toggleRow}>
                      <Text style={ScheduleModalStyle.label}>
                        Change Address ? ➡️
                      </Text>

                      <View style={ScheduleModalStyle.switchWithLabels}>
                        <Text
                          style={[
                            ScheduleModalStyle.toggleStateLabel,
                            !changeAddressToggled &&
                              ScheduleModalStyle.activeToggleLabel,
                          ]}>
                          NO
                        </Text>
                        <Switch
                          trackColor={{
                            false: Colors.red_crayola_color,
                            true: Colors.green_color,
                          }}
                          thumbColor={
                            changeAddressToggled
                              ? Colors.white_text_color
                              : Colors.white_text_color
                          }
                          ios_backgroundColor={Colors.white_text_color}
                          onValueChange={setChangeAddressToggled}
                          value={changeAddressToggled}
                          style={ScheduleModalStyle.switch}
                        />
                        <Text
                          style={[
                            ScheduleModalStyle.toggleStateLabel,
                            changeAddressToggled &&
                              ScheduleModalStyle.activeToggleLabel,
                          ]}>
                          YES
                        </Text>
                      </View>
                    </View>
                  </>
                )}

                {changeAddressToggled && (
                  <View style={ScheduleModalStyle.AddressInput}>
                    <TextInput
                      placeholder="Enter new address"
                      placeholderTextColor={Colors.white_Icon_Color}
                      value={updatedAddress}
                      onChangeText={setUpdatedAddress}
                      style={{
                        color: Colors.white_Icon_Color,
                        paddingVertical: 8,
                      }}
                      multiline
                    />
                  </View>
                )}
              </View>
            ) : selectedType === 'Quote' ? (
              <>
                <Text style={ScheduleModalStyle.label}>Title</Text>
                <TextInput
                  style={ScheduleModalStyle.inputWithIcon}
                  placeholder="Enter Quote Title"
                  value={title}
                  onChangeText={setTitle}
                  placeholderTextColor="#757575"
                />
                <Text style={ScheduleModalStyle.label}>Address</Text>
                <TextInput
                  style={ScheduleModalStyle.inputWithIcon}
                  placeholder="Enter Quote Address"
                  value={address}
                  onChangeText={setAddress}
                  placeholderTextColor="#757575"
                  multiline
                />
              </>
            ) : selectedType === 'Meeting' ? (
              <>
                <Text style={ScheduleModalStyle.label}>Title</Text>
                <TextInput
                  style={ScheduleModalStyle.inputWithIcon}
                  placeholder="Enter Meeting/Task Title"
                  value={title}
                  onChangeText={setTitle}
                  placeholderTextColor="#757575"
                />
                <Text style={ScheduleModalStyle.label}>Address</Text>
                <TextInput
                  style={ScheduleModalStyle.inputWithIcon}
                  placeholder="Enter Meeting/Task Address"
                  value={address}
                  onChangeText={setAddress}
                  placeholderTextColor="#757575"
                  multiline
                />
              </>
            ) : null}

            <View style={ScheduleModalStyle.timeSelectionContainer}>
              <View>
                <Text style={ScheduleModalStyle.label}>Start Time</Text>
                <TouchableOpacity
                  style={ScheduleModalStyle.openButton}
                  onPress={() => setModal1Visible(true)}>
                  <Text style={ScheduleModalStyle.buttonText}>
                    {startTime
                      ? `${startTime.hour}:${startTime.minute.padStart(
                          2,
                          '0',
                        )} ${startTime.daySection}`
                      : 'Select Time'}
                  </Text>
                </TouchableOpacity>
                <TimePickerModal
                  visible={modal1Visible}
                  onClose={() => setModal1Visible(false)}
                  onSave={time => {
                    setStartTime(time);
                    const customerToUse = cust?.id ? cust : customerData;
                    const totalTime = calculateTotalTimeEst(customerToUse);
                    const totalEstHours = totalTime.hours;
                    const totalEstMinutes = totalTime.minutes;

                    const startTimeMoment = moment(
                      `${time.hour}:${time.minute} ${time.daySection}`,
                      'h:mm A',
                    )
                      .add(totalEstHours, 'hours')
                      .add(totalEstMinutes, 'minutes');

                    const maxEndTime = moment().hour(23).minute(0).second(0);
                    if (startTimeMoment.isAfter(maxEndTime)) {
                      startTimeMoment.hour(23).minute(0);
                    }

                    let nextHour24 = startTimeMoment.hours();
                    const nextMinute = startTimeMoment.minutes();
                    const nextPeriod = nextHour24 >= 12 ? 'PM' : 'AM';
                    if (nextHour24 > 12) nextHour24 -= 12;
                    else if (nextHour24 === 0) nextHour24 = 12;

                    const formattedEndTime = {
                      daySection: nextPeriod,
                      hour: nextHour24.toString(),
                      minute: nextMinute.toString().padStart(2, '0'),
                    };
                    setEndTime(formattedEndTime);
                  }}
                  initialTime={startTime}
                />
              </View>

              <View>
                <Text style={ScheduleModalStyle.label}>End Time</Text>
                <TouchableOpacity
                  style={ScheduleModalStyle.openButton}
                  onPress={() => setIsEndTimePickerOpen(true)}>
                  <Text style={ScheduleModalStyle.buttonText}>
                    {endTime
                      ? `${endTime.hour}:${endTime.minute.padStart(2, '0')} ${
                          endTime.daySection
                        }`
                      : 'Select Time'}
                  </Text>
                </TouchableOpacity>
                <TimePickerModal
                  visible={isEndTimePickerOpen}
                  onClose={() => setIsEndTimePickerOpen(false)}
                  onSave={time => setEndTime(time)}
                  initialTime={endTime}
                />
              </View>
            </View>

            <View style={ScheduleModalStyle.buttonsContainer}>
              <TouchableOpacity
                style={ScheduleModalStyle.button1}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={ScheduleModalStyle.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={ScheduleModalStyle.button2}
                onPress={handleSave}>
                <Text style={ScheduleModalStyle.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ScheduleModal;
