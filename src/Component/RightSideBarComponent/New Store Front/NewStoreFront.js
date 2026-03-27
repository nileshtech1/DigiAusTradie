import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Checkbox, Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Geolocation from '@react-native-community/geolocation';
import {launchImageLibrary} from 'react-native-image-picker';
import Header from '../../../ReusableComponent/Header';
import CustomTextInput from '../../../ReusableComponent/CustomTextInput';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Colors from '../../../Assets/Style/Color';
import BottomSheetModal from '../../../ReusableComponent/BottomSheetModal';
import ConfirmationAlert from '../../../ReusableComponent/ConfirmationAlert';
import {placeHolderImage} from '../../../Assets/Images';
const successAnimation = require('../../../Assets/Images/LottieAnimation/loginsuccessful.json'); // Adjust the path as needed

const NewStoreFront = ({navigation}) => {
  // States for inputs
  // States for inputs
  const [storeName, setStorename] = useState('');
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [notes, setNotes] = useState('');
  const [ABN, setABN] = useState('');
  const [source, setSource] = useState('');
  const [followUpDate, setFollowUpDate] = useState(new Date());
  const [followUpTime, setFollowUpTime] = useState(new Date());
  const [timePick1, setTimePick1] = useState(new Date());
  const [timePick2, setTimePick2] = useState(new Date());
  const [beforeTime, setBeforeTime] = useState(new Date());
  const [afterTime, setAfterTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [isModalToastVisible, setModalToastVisible] = useState(false);
  const [isModalCustomerVisible, setModalCustomerVisible] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Date Picker states
  const [isTimePickerOpen1, setTimePickerOpen1] = useState(false);
  const [isTimePickerOpen2, setTimePickerOpen2] = useState(false);

  const [beforePickerOpen, setBeforePickerOpen] = useState(false);
  const [afterPickerOpen, setAfterPickerOpen] = useState(false);

  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);
  const [rows, setRows] = useState([{job: '', rotation: '', price: ''}]);
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState(null); // Controls dropdown visibility
  const jobOptions = ['Plumbing', 'Electrician', 'Carpentry', 'Painting']; // Options for the dropdown

  const handleTakePhoto = () => {
    setModalVisible(false);
    launchCamera({}, response => {
      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        setSelectedImage(image.uri);
      }
    });
  };

  const handleSelectFromGallery = () => {
    setModalVisible(false);
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        setSelectedImage(image.uri);
      }
    });
  };

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
      },
      error => {
        Alert.alert('Error', 'Unable to fetch location. Please try again.');
      },
    );
  };

  const handleAddRow = () => {
    setRows([...rows, {job: '', rotation: '', price: ''}]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleSelectJob = (index, selectedJob) => {
    const updatedRows = [...rows];
    updatedRows[index].job = selectedJob;
    setRows(updatedRows);
    setDropdownVisibleIndex(null); // Close the dropdown after selection
  };

  const handleDeleteRow = index => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  const toggleDropdown = index => {
    setDropdownVisibleIndex(dropdownVisibleIndex === index ? null : index);
  };

  const closeModal = () => {
    setModalCustomerVisible(false);
    setModalToastVisible(false);
  };

  const handleCreateCustomer = () => {
    setModalCustomerVisible(true);
  };

  const handleSubmit = () => {
    setModalToastVisible(true);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setDropdownVisibleIndex(null); // Close dropdown if clicking outside
        Keyboard.dismiss(); // Dismiss keyboard
      }}>
      <>
        <Header notificationIcon={true} />
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Add New StoreFront Customer</Text>

            {/* Store Name Input */}
            <CustomTextInput
              label="Store Name (Trading As)"
              placeholder="Store name     "
              icon="store"
              value={storeName}
              required={true}
              onChangeText={setStorename}
              style={{marginRight: 5, height: 50}}
            />
            <View style={{flexDirection: 'row'}}>
              <CustomTextInput
                label="Contact Name"
                placeholder="First name     "
                icon="account"
                value={firstName}
                required={true}
                onChangeText={setFirstName}
                style={{marginRight: 5, height: 50}}
              />
              <CustomTextInput
                label="       "
                placeholder="Last name       "
                icon="account"
                value={LastName}
                onChangeText={setLastName}
              />
            </View>
            <CustomTextInput
              label="Email"
              placeholder="Enter email address"
              icon="email"
              value={email}
              required={true}
              onChangeText={setEmail}
            />
            <CustomTextInput
              label="Phone"
              placeholder="Enter phone number"
              icon="phone"
              keyboardType="numeric"
              value={phone}
              required={true}
              onChangeText={setPhone}
            />
            <CustomTextInput
              label="Address"
              placeholder="Enter address"
              icon="map-marker"
              value={address}
              onChangeText={setAddress}
            />

            <Text style={styles.label}>Trading Hours</Text>
            <View style={{flexDirection: 'row', width: 190}}>
              <TouchableOpacity
                style={styles.inputWithIcon}
                onPress={() => setTimePickerOpen1(true)}>
                <VectorIcon
                  icon="MaterialIcons"
                  name="access-time"
                  size={20}
                  color={Colors.theme_background_dark}
                />
                <Text style={{marginLeft: 5}}>
                  {followUpTime.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="time"
                open={isTimePickerOpen1}
                date={timePick1}
                onConfirm={time => {
                  setTimePickerOpen1(false);
                  setTimePick1(time);
                }}
                onCancel={() => setTimePickerOpen1(false)}
              />

              <TouchableOpacity
                style={styles.inputWithIcon}
                onPress={() => setTimePickerOpen2(true)}>
                <VectorIcon
                  icon="MaterialIcons"
                  name="access-time"
                  size={20}
                  color={Colors.theme_background_dark}
                />
                <Text style={{marginLeft: 5}}>
                  {followUpTime.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="time"
                open={isTimePickerOpen2}
                date={timePick2}
                onConfirm={time => {
                  setTimePickerOpen2(false);
                  setTimePick2(time);
                }}
                onCancel={() => setTimePickerOpen2(false)}
              />
            </View>

            <Text style={styles.label}>Not Before/Not After</Text>
            <View style={{flexDirection: 'row', width: 190}}>
              <TouchableOpacity
                style={styles.inputWithIcon}
                onPress={() => setBeforePickerOpen(true)}>
                <VectorIcon
                  icon="MaterialIcons"
                  name="access-time"
                  size={20}
                  color={Colors.theme_background_dark}
                />
                <Text style={{marginLeft: 5}}>
                  {followUpTime.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="time"
                open={beforePickerOpen}
                date={beforeTime}
                onConfirm={time => {
                  setBeforePickerOpen(false);
                  setBeforeTime(time);
                }}
                onCancel={() => setBeforePickerOpen(false)}
              />

              <TouchableOpacity
                style={styles.inputWithIcon}
                onPress={() => setAfterPickerOpen(true)}>
                <VectorIcon
                  icon="MaterialIcons"
                  name="access-time"
                  size={20}
                  color={Colors.theme_background_dark}
                />
                <Text style={{marginLeft: 5}}>
                  {followUpTime.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="time"
                open={afterPickerOpen}
                date={afterTime}
                onConfirm={time => {
                  setAfterPickerOpen(false);
                  setAfterTime(time);
                }}
                onCancel={() => setAfterPickerOpen(false)}
              />
            </View>

            <CustomTextInput
              label="Business Name"
              placeholder="Enter business name"
              icon="briefcase"
              value={businessName}
              onChangeText={setBusinessName}
            />
            <CustomTextInput
              label="ABN"
              placeholder="ABN"
              icon="note"
              value={ABN}
              onChangeText={setABN}
            />
            <CustomTextInput
              label="How did you hear about us"
              placeholder="Specify source (e.g., ad, friend)"
              icon="information"
              value={source}
              required={true}
              onChangeText={setSource}
            />
            <TouchableOpacity
              style={styles.CreateCustomerButton}
              onPress={() => handleCreateCustomer()}>
              <Text style={styles.createCustomerText}>Create Customer</Text>
            </TouchableOpacity>
            <CustomTextInput
              label="Store Name (Trading As)"
              placeholder="Store name     "
              icon="store"
              value={storeName}
              required={true}
              onChangeText={setStorename}
              style={{marginRight: 5, height: 50}}
            />
            {/* Dynamic Rows */}
            {rows.map((row, index) => (
              <View style={styles.rowContainer} key={index}>
                {/* Job Input and Dropdown */}
                <View style={styles.dropdownWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Job"
                    placeholderTextColor="#424242FF"
                    value={row.job}
                    onChangeText={text => handleInputChange(index, 'job', text)}
                    onFocus={() => toggleDropdown(index)}
                  />
                  {dropdownVisibleIndex === index && (
                    <View style={styles.dropdown}>
                      {jobOptions
                        .filter(option =>
                          option.toLowerCase().includes(row.job.toLowerCase()),
                        )
                        .map((option, optionIndex) => (
                          <TouchableOpacity
                            key={optionIndex}
                            onPress={() => handleSelectJob(index, option)}
                            style={styles.dropdownItem}>
                            <Text style={styles.dropdownText}>{option}</Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  )}
                </View>

                {/* Rotation Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Rotation"
                  placeholderTextColor="#424242FF"
                  value={row.rotation}
                  onChangeText={text =>
                    handleInputChange(index, 'rotation', text)
                  }
                  onFocus={() => setDropdownVisibleIndex(null)}
                />

                {/* Price Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Price in $"
                  placeholderTextColor="#424242FF"
                  value={row.price}
                  keyboardType="numeric"
                  onChangeText={text => handleInputChange(index, 'price', text)}
                  onFocus={() => setDropdownVisibleIndex(null)}
                />

                {/* Delete Button */}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteRow(index)}>
                  <VectorIcon
                    icon="MaterialIcons"
                    name="delete"
                    size={24}
                    color={Colors.theme_background_dark}
                  />
                </TouchableOpacity>
              </View>
            ))}
            {/* Add Row Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddRow}>
              <VectorIcon
                icon="MaterialIcons"
                name="add-circle"
                size={30}
                color={Colors.theme_background_dark}
                style={{textAlign: 'center'}}
              />
            </TouchableOpacity>

            <CustomTextInput
              label="Notes"
              placeholder="Add any additional notes"
              icon="note"
              value={notes}
              onChangeText={setNotes}
            />
            {/* Follow-Up Date */}
            <Text style={styles.label}>Follow Up</Text>
            <View style={{flexDirection: 'row', width: 190}}>
              <TouchableOpacity
                style={styles.inputWithIcon}
                onPress={() => setDatePickerOpen(true)}>
                <VectorIcon
                  icon="MaterialIcons"
                  name="event"
                  size={20}
                  color={Colors.theme_background_dark}
                />
                <Text style={{marginLeft: 5}}>
                  {followUpDate.toDateString()}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="date"
                open={isDatePickerOpen}
                date={followUpDate}
                onConfirm={date => {
                  setDatePickerOpen(false);
                  setFollowUpDate(date);
                }}
                onCancel={() => setDatePickerOpen(false)}
              />

              <TouchableOpacity
                style={styles.inputWithIcon}
                onPress={() => setTimePickerOpen(true)}>
                <VectorIcon
                  icon="MaterialIcons"
                  name="access-time"
                  size={20}
                  color={Colors.theme_background_dark}
                />
                <Text style={{marginLeft: 5}}>
                  {followUpTime.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="time"
                open={isTimePickerOpen}
                date={followUpTime}
                onConfirm={time => {
                  setTimePickerOpen(false);
                  setFollowUpTime(time);
                }}
                onCancel={() => setTimePickerOpen(false)}
              />
            </View>
            <Text style={styles.label}>Location</Text>
            <View style={styles.row}>
              <TextInput
                placeholder="Location"
                placeholderTextColor="#424242FF"
                value={location}
                onChangeText={setLocation}
                style={styles.inputLocation}
              />
              <TouchableOpacity
                onPress={fetchLocation}
                style={styles.fetchLocation}>
                <VectorIcon
                  icon="MaterialIcons"
                  name="my-location"
                  size={20}
                  color="#FFFFFFFF"
                />
                <Text style={{color: '#ffffff'}}>Location</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Pick an Image</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.selectimageCont}
                onPress={() => setModalVisible(true)}>
                <VectorIcon
                  icon="FontAwesome"
                  name="camera"
                  size={20}
                  color={Colors.theme_background_dark}
                />
                <Text style={{marginLeft: 5}}> Pick an Image</Text>
              </TouchableOpacity>
              <View style={styles.showImg}>
                {selectedImage ? (
                  <Image
                    source={{uri: selectedImage}}
                    resizeMode="contain"
                    style={styles.imageBottom}
                  />
                ) : (
                  <Image
                    source={placeHolderImage}
                    resizeMode="contain"
                    style={styles.imageBottom}
                  />
                )}
              </View>
            </View>

            {/* Submit */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.createCustomerText}>Send Text/Email</Text>
            </TouchableOpacity>
          </ScrollView>
          {/* Bottom Sheet Modal */}
          <BottomSheetModal
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
            onTakePhoto={handleTakePhoto}
            onSelectFromGallery={handleSelectFromGallery}
          />
        </View>
        <ConfirmationAlert
          isVisible={isModalToastVisible}
          onClose={closeModal}
          successAnimation={successAnimation}
          message="Qutoes sent Successfully!"
        />
        <ConfirmationAlert
          isVisible={isModalCustomerVisible}
          onClose={closeModal}
          successAnimation={successAnimation}
          message="Customer Created Successfully!"
        />
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
    color: Colors.theme_background_dark,
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    // backgroundColor: '#ffffff',
    // elevation: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
    backgroundColor: Colors.theme_background_dark,
    // elevation: 2,
    padding: 10,
    width: '45%',
    borderRadius: 10,
  },
  CheckBoxLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLocation: {
    borderWidth: 0.7,
    borderRadius: 5,
    width: '65%',
    height: 50,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#ffffff',
  },
  fetchLocation: {
    borderWidth: 0.7,
    borderRadius: 5,
    width: '33%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.theme_background_dark,
    marginBottom: 5,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.7,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    width: '91%',
    marginRight: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
  },
  CreateCustomerButton: {
    borderWidth: 0.7,
    padding: 8,
    borderRadius: 5,
    backgroundColor: Colors.theme_background_dark,
    marginBottom: 8,
  },
  submitButton: {
    borderWidth: 0.7,
    padding: 8,
    borderRadius: 5,
    backgroundColor: Colors.theme_background_dark,
    marginVertical: 10,
  },
  createCustomerText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 0.7,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
    marginRight: 8,
    backgroundColor: '#ffffff',
  },
  dropdownWrapper: {
    flex: 1,
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#8460C7FF',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 1,
    elevation: 1,
    height: 'auto',
    maxHeight: 200,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
    color: '#fff',
  },
  deleteButton: {
    padding: 8,
  },
  button: {
    marginTop: 16,
  },
  selectimageCont: {
    flexDirection: 'row',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  showImg: {
    borderWidth: 0.5,
    width: 50,
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#ffffff',
  },
  imageBottom: {
    width: '100%',
    height: 38,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});

export default NewStoreFront;
