import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Header from '../../../ReusableComponent/Header';
import CustomTextInput from '../../../ReusableComponent/CustomTextInput';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Colors from '../../../Assets/Style/Color';
import BottomSheetModal from '../../../ReusableComponent/BottomSheetModal';
import ConfirmationAlert from '../../../ReusableComponent/ConfirmationAlert';
import { placeHolderImage } from '../../../Assets/Images';
const successAnimation = require('../../../Assets/Images/LottieAnimation/loginsuccessful.json');


const NewResidential = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [source, setSource] = useState('');

  const [isModalToastVisible, setModalToastVisible] = useState(false);
  const [isModalCustomerVisible, setModalCustomerVisible] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [rows, setRows] = useState([{job: '', timeEst: '', price: ''}]);
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState(null); 
  const jobOptions = ['Plumbing', 'Electrician', 'Carpentry', 'Painting']; 

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


  const handleAddRow = () => {
    setRows([...rows, {job: '', timeEst: '', price: ''}]);
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
    setDropdownVisibleIndex(null);
  };

  const handleDeleteRow = index => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  const toggleDropdown = index => {
    setDropdownVisibleIndex(dropdownVisibleIndex === index ? null : index);
  };

  const closeModal = () => {
    setModalCustomerVisible(false)
    setModalToastVisible(false);
  };

  const handleCreateCustomer = () =>{
    setModalCustomerVisible(true)
  }
  
  const handleSubmit = () => {
    setModalToastVisible(true)
   
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setDropdownVisibleIndex(null); 
        Keyboard.dismiss();
      }}>
      <>
        <Header
          notificationIcon={true}
        />
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Add New Residential Customer</Text>

            <View style={{flexDirection: 'row'}}>
              <CustomTextInput
                label="Customer Name"
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
            <CustomTextInput
              label="How did you hear about us"
              placeholder="Specify source (e.g., ad, friend)"
              icon="information"
              value={source}
              required={true}
              onChangeText={setSource}
            />
            <TouchableOpacity style={styles.CreateCustomerButton} onPress={()=> handleCreateCustomer()}>
              <Text style={styles.createCustomerText}>Create Customer</Text>
            </TouchableOpacity>

            {rows.map((row, index) => (
              <View style={styles.rowContainer} key={index}>
                <View style={styles.dropdownWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Set up"
            placeholderTextColor="#424242FF"
                    value={row.job}
                    onChangeText={text => handleInputChange(index, 'job', text)}
                    onFocus={() => toggleDropdown(index)}
                  />
                  {dropdownVisibleIndex === index && (
                    <View style={styles.dropdown}>
                      {jobOptions.filter(option =>
                          option
                            .toLowerCase()
                            .includes(row.job.toLowerCase()),
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

                <TextInput
                  style={styles.input}
                  placeholder="Time Est"
            placeholderTextColor="#424242FF"
                  value={row.timeEst}
                  keyboardType="numeric"
                  onChangeText={text =>
                    handleInputChange(index, 'timeEst', text)
                  }
                  onFocus={() => setDropdownVisibleIndex(null)}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Price in $"
            placeholderTextColor="#424242FF"
                  value={row.price}
                  keyboardType="numeric"
                  onChangeText={text => handleInputChange(index, 'price', text)}
                  onFocus={() => setDropdownVisibleIndex(null)}
                />

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

           <View style={styles.submitButtonContainer}>
           <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.createCustomerText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.createCustomerText}>Send</Text>
            </TouchableOpacity>
           </View>
          </ScrollView>

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
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
    backgroundColor: Colors.theme_background_dark,
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
  imageBottom: {
    width: '100%',
    height: 38,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  image: {width: 50, height: 50, borderRadius: 8, marginHorizontal: 5},
  button: {marginTop: 16},
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
    color : '#fff'
  },
  deleteButton: {
    padding: 8,
  },
  button: {
    marginTop: 16,
  },

  swmsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {alignSelf: 'center', marginVertical: 5},
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
  submitButtonContainer : {
    flexDirection : 'row',
    width : '99%',
    justifyContent : 'space-around',
    alignItems : 'center'}
});

export default NewResidential;
