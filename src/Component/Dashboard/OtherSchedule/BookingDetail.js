import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import Header from '../../../ReusableComponent/Header';
import Colors from '../../../Assets/Style/Color';
import {quote_image_path} from '../../../Redux/NWConfig';
import StartStoreFlatlist from '../../../utils/Stylesheet/StartStoreFlatlistStyle';
import CustomTimePicker from '../../../ReusableComponent/CustomTimePicker';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {UpdateScheduleApi} from '../../../Redux/API/UpdateScheduleApi';
import {Switch} from 'react-native-paper';
import ConfirmationAlert from '../../../ReusableComponent/ConfirmationAlert';
import {GetScheduleApi} from '../../../Redux/API/GetScheduleApi';
const successAnimation = require('../../../Assets/Images/LottieAnimation/loginsuccessful.json'); // Adjust the path as needed

const BookingDetail = ({route, navigation}) => {
  const {event} = route.params;
  const job = event;

  const storefrontJobs = JSON.parse(event?.quotation?.storefront_job || '[]');
  const residentialJobs = JSON.parse(event?.quotation?.residential_job || '[]');
  const commercialJobs = JSON.parse(event?.quotation?.commercial_job || '[]');

  const imageZero = JSON.parse(event?.quotation?.image || '[]')[0];
  const [isModalToastVisible, setModalToastVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(event?.date);
  const [selectedStartTime, setSelectedStartTime] = useState(event?.start_time);
  const [selectedEndTime, setSelectedEndTime] = useState(event?.end_time);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timeType, setTimeType] = useState('start');
  const [changeAddressToggled, setChangeAddressToggled] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState(
    job?.customer_address
      ? job?.customer_address
      : job?.quotation?.category_address || '',
  );
  const {LoginData} = useSelector(state => state.Login);

  const dispatch = useDispatch();

  useEffect(() => {
    if (modalVisible) {
      setUpdatedAddress(
        job?.customer_address
          ? job?.customer_address
          : job?.quotation?.category_address || '',
      );
      setChangeAddressToggled(false);
      setSelectedDate(job?.date);
    }
  }, [modalVisible, job]);

  const handleChangeBooking = () => {
    setModalVisible(true);
  };

  const handleSendBooking = () => {
    const id = job?.id;
    const name = job?.customer_name;
    const type = job?.type;
    const token = LoginData.token;
    const franchiseid = {
      franchise_id: LoginData?.user?.id,
    };
    const postData = {
      id: id,
      customer_name: name,
      type: type,
      ...(selectedDate && {date: moment(selectedDate).format('YYYY-MM-DD')}),
      ...(selectedStartTime && {start_time: selectedStartTime}),
      ...(selectedEndTime && {end_time: selectedEndTime}),
      ...(changeAddressToggled && {customer_address: updatedAddress}),
    };

    if (
      !postData.date &&
      !postData.start_time &&
      !postData.end_time &&
      !postData.address
    ) {
      setModalVisible(false);
      return;
    }
    dispatch(UpdateScheduleApi(postData))
      .then(res => {
        if (res.payload?.status === true) {
          setMessage(res.payload.message);
          dispatch(GetScheduleApi({token, franchiseid}));
          setModalVisible(false);
          setModalToastVisible(true);
          setSelectedDate('');
          setUpdatedAddress(job?.quotation?.category_address || '');
          setChangeAddressToggled(false);
        }
      })
      .catch(error => {
        console.error('Error updating booking:', error);
      });
  };

  const handleOpenTimePicker = type => {
    setTimeType(type);
    setShowTimePicker(true);
  };

  const handleDateSelect = date => {
    const selectedDate = new Date(date.dateString);
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    setDatePickerOpen(false);
  };

  const renderJobItem = ({item}) => (
    <TouchableOpacity style={StartStoreFlatlist.checkbox}>
      <Text style={StartStoreFlatlist.labelUp}>{item.job}</Text>
    </TouchableOpacity>
  );
  const onPressOk = () => {
    setModalToastVisible(false);
    navigation.navigate('Schedule');
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.black_bg_Theme}}>
      <Header backButton={true} notificationIcon={true} route="Schedule" />
      <ScrollView contentContainerStyle={{padding: 16}}>
        <View style={StartStoreFlatlist.card}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={StartStoreFlatlist.title}>Booking Detail</Text>
            <TouchableOpacity
              style={StartStoreFlatlist.viewButton}
              onPress={handleChangeBooking}>
              <Text style={StartStoreFlatlist.buttonText}>Change Booking</Text>
            </TouchableOpacity>
          </View>

          <View style={StartStoreFlatlist.row}>
            <View style={StartStoreFlatlist.input}>
              <Text style={StartStoreFlatlist.value}>
                {job?.quotation?.category_type?.charAt(0).toUpperCase() +
                  job?.quotation?.category_type?.slice(1)}
              </Text>
            </View>
          </View>

          <View style={StartStoreFlatlist.checkboxContainer}>
            <View style={{flex: 1}}>
              {job.quotation?.category_type === 'storefront' && (
                <FlatList
                  data={storefrontJobs}
                  renderItem={renderJobItem}
                  scrollEnabled={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}

              {job.quotation?.category_type === 'residential' && (
                <FlatList
                  data={residentialJobs}
                  renderItem={renderJobItem}
                  scrollEnabled={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}

              {job.quotation?.category_type === 'commercial' && (
                <FlatList
                  data={commercialJobs}
                  renderItem={renderJobItem}
                  scrollEnabled={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
            </View>

            {imageZero?.path && (
              <View style={StartStoreFlatlist.imgContainer}>
                <Image
                  source={{uri: quote_image_path + imageZero?.path}}
                  resizeMode="contain"
                  style={StartStoreFlatlist.image}
                />
              </View>
            )}
          </View>

          {[
            {label: 'Customer Name', value: job?.customer_name},
            {label: 'Email', value: job?.quotation?.customer_email},
            {label: 'Phone', value: job?.quotation?.customer_phone},
            {
              label: 'Address',
              value: job?.customer_address
                ? job?.customer_address
                : job?.quotation?.category_address || '',
            },
            {label: 'Date', value: job?.date},
          ].map((field, index) => (
            <View style={StartStoreFlatlist.valueLabel} key={index}>
              <Text style={StartStoreFlatlist.label}>{field.label}</Text>
              <View style={StartStoreFlatlist.input}>
                <Text style={StartStoreFlatlist.value}>{field.value}</Text>
              </View>
            </View>
          ))}

          <View style={StartStoreFlatlist.row}>
            <View style={{flex: 1}}>
              <Text style={StartStoreFlatlist.label}>Start</Text>
              <View style={StartStoreFlatlist.input}>
                <Text style={StartStoreFlatlist.value}>{job?.start_time}</Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <Text style={StartStoreFlatlist.label}>End</Text>
              <View style={StartStoreFlatlist.input}>
                <Text style={StartStoreFlatlist.value}>{job?.end_time}</Text>
              </View>
            </View>
          </View>

          <Text style={StartStoreFlatlist.label}>Job Notes</Text>
          <View style={StartStoreFlatlist.inputForNotes}>
            <Text style={StartStoreFlatlist.value}>
              {job?.quotation?.notes || 'No notes provided'}
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal transparent animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalTitle}>
              UPDATE ➡️ DATE | TIME | ADDRESS
            </Text>

            <Text
              style={{
                color: Colors.white_text_color,
                marginBottom: 4,
                marginTop: 10,
              }}>
              Select Date
            </Text>
            <TouchableOpacity
              style={StartStoreFlatlist.viewButton}
              onPress={() => setDatePickerOpen(true)}>
              <Text style={StartStoreFlatlist.buttonText}>
                📅{' '}
                {selectedDate
                  ? moment(selectedDate).format('DD-MM-YYYY')
                  : 'Select Date'}
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                color: Colors.white_text_color,
                marginBottom: 4,
                marginTop: 10,
              }}>
              Select Time
            </Text>
            <View style={styles.timeRow}>
              <View style={{flex: 1, marginRight: 5}}>
                <TouchableOpacity
                  style={StartStoreFlatlist.viewButton}
                  onPress={() => handleOpenTimePicker('start')}>
                  <Text style={StartStoreFlatlist.buttonText}>
                    🕓 {selectedStartTime || 'Select Start Time'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, marginLeft: 5}}>
                <TouchableOpacity
                  style={StartStoreFlatlist.viewButton}
                  onPress={() => handleOpenTimePicker('end')}>
                  <Text style={StartStoreFlatlist.buttonText}>
                    🕓 {selectedEndTime || 'Select End Time'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Change Address ? ➡️</Text>

              <View style={styles.switchWithLabels}>
                <Text
                  style={[
                    styles.toggleStateLabel,
                    !changeAddressToggled && styles.activeToggleLabel,
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
                  style={styles.switch}
                />
                <Text
                  style={[
                    styles.toggleStateLabel,
                    changeAddressToggled && styles.activeToggleLabel,
                  ]}>
                  YES
                </Text>
              </View>
            </View>

            {changeAddressToggled && (
              <>
                <View style={StartStoreFlatlist.AddressInput}>
                  <TextInput
                    placeholder="Enter new address"
                    placeholderTextColor={Colors.white_text_color}
                    value={updatedAddress}
                    onChangeText={setUpdatedAddress}
                    style={{color: Colors.white_Icon_Color, paddingVertical: 8}}
                    multiline
                  />
                </View>
              </>
            )}

            <TouchableOpacity
              style={[StartStoreFlatlist.viewButton1, {marginTop: 20}]}
              onPress={handleSendBooking}>
              <Text style={StartStoreFlatlist.buttonText1}>
                ✅ Update Booking
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[StartStoreFlatlist.viewButton2, {marginTop: 20}]}
              onPress={() => setModalVisible(false)}>
              <Text style={StartStoreFlatlist.buttonText2}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CustomTimePicker
        visible={showTimePicker}
        selectedTime={new Date()}
        onClose={() => setShowTimePicker(false)}
        onConfirm={time => {
          if (timeType === 'start') {
            setSelectedStartTime(time);
          } else {
            setSelectedEndTime(time);
          }
          setShowTimePicker(false);
        }}
      />

      <Modal transparent animationType="slide" visible={datePickerOpen}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={
                selectedDate
                  ? {
                      [selectedDate]: {
                        selected: true,
                        selectedColor: Colors.blue,
                      },
                    }
                  : {}
              }
            />
            <TouchableOpacity
              style={[StartStoreFlatlist.viewButton2, {marginTop: 20}]}
              onPress={() => setDatePickerOpen(false)}>
              <Text style={StartStoreFlatlist.buttonText2}>Close Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ConfirmationAlert
        isVisible={isModalToastVisible}
        onOK={onPressOk}
        successAnimation={successAnimation}
        message={message}
        showCancelButton={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalInner: {
    backgroundColor: Colors.black_bg_Theme,
    margin: 20,
    padding: 20,
    borderRadius: 10,
    borderColor: Colors.white_Icon_Color,
    borderWidth: 1,
  },
  modalTitle: {
    color: Colors.white_text_color,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeLabel: {
    color: Colors.white_text_color,
    marginBottom: 5,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  toggleLabel: {
    color: Colors.white_text_color,
    fontSize: 16,
    // No marginRight here, as it's space-between
  },
  switchWithLabels: {
    // New style for the container of switch and labels
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleStateLabel: {
    // Style for YES/NO text
    fontSize: 14,
    color: Colors.grey, // Default color for inactive label
    fontWeight: 'bold', // Make them bold
  },
  activeToggleLabel: {
    // Style for the active label
    color: Colors.white_text_color, // Highlight color
  },
  switch: {
    // Style for the switch itself to add spacing
    marginHorizontal: 5, // Space between switch and labels
    borderWidth: 1,
    borderColor: Colors.white_text_color,
  },
});

export default BookingDetail;
