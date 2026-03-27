import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../ReusableComponent/Header';
import Colors from '../../../Assets/Style/Color';
import CustomTextInput from '../../../ReusableComponent/CustomTextInput';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import ReviewStyle from '../../../utils/Stylesheet/ReviewStyle';
import {CleaningServiceOptions} from '../../../Assets/Data/Data';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import {JobFinishedApi} from '../../../Redux/API/JobFinishedApi';
import {GetAllTimetrackingApi} from '../../../Redux/API/GetTimeTrackedApi';
import {GetScheduleApi} from '../../../Redux/API/GetScheduleApi';
import {GetInvoiceUrl} from '../../../Redux/API/GetInvoiceApi';
import {CreateInvoiceSentandEmailAPi} from '../../../Redux/API/InvoiceSent&EmailApi';
import TimePickerModal from '../../../ReusableComponent/TimePickerModal';
import CustomDropdown from '../../../ReusableComponent/CustomDropdown';

const successAnimation = require('../../../Assets/Images/LottieAnimation/loginsuccessful.json');

const Review = ({navigation, route}) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false); 
  const [emjScale, setEmjScale] = useState(5);
  const [isModalToastVisible, setModalToastVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [AdditionWork, setAdditionalWork] = useState('');
  const [selectDropdownVisbile, setSelectDropdownVisbile] = useState(false);
  const [scheduledDurationFormatted, setScheduledDurationFormatted] =
    useState('');
  const [actualDurationFormatted, setActualDurationFormatted] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [job, setJob] = useState([]);
  const [payDropdownVisbile, setPayDropdownVisbile] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] =
    useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);
  const [timePickerModalVisible, setTimePickerModalVisible] = useState(false);
  const {reviewData} = route.params;
  const dispatch = useDispatch();
  const {JobFinishedData} = useSelector(state => state.JobFinished);
  const {JobFinishedLoading} = useSelector(state => state.JobFinished);
  const paymentTypeOptions = ['PayID', 'Cash', 'Invoice', 'EFTPOS'];
  const {LoginData} = useSelector(state => state.Login);
  const [customLoading, setCustomLoading] = useState(false);
  const {ScheduleList} = useSelector(state => state.ScheduleList);

  const convertToHoursMinutes = durationInMs => {
    const hours = Math.floor(durationInMs / 3600000);
    const minutes = Math.floor((durationInMs % 3600000) / 60000);
    return `${hours} hour${hours !== 1 ? 's' : ''} : ${minutes} min`;
  };

  const data = ScheduleList?.Schedule?.filter(
    data => data.id === job?.schedule_id,
  );

  // Set the converted duration when the reviewData is updated
  useEffect(() => {
    if (reviewData && reviewData.id != undefined) {
      const scheduledDurationFormatted = convertToHoursMinutes(
        reviewData.scheduledDuration,
      );
      const actualDurationFormatted = convertToHoursMinutes(
        reviewData.actualDuration,
      );
      setJob([reviewData]);
      setScheduledDurationFormatted(scheduledDurationFormatted);
      setActualDurationFormatted(actualDurationFormatted);
    }
  }, [reviewData]);

  const handleModal = () => {
    setConfirmModalVisible(false);
    setModalToastVisible(true);
  };

  const closeModal = () => {
    setModalToastVisible(false);
  };

  const onPressOk = () => {
    navigation.navigate('Dashboard');
    setModalToastVisible(false);
  };

  const toggleSource = () => {
    setSelectDropdownVisbile(selectDropdownVisbile === true ? false : true);
    setPayDropdownVisbile(false);
  };
  const togglePaymentTypeDropdown = () => {
    setPayDropdownVisbile(payDropdownVisbile === true ? false : true);
    setSelectDropdownVisbile(false);
  };
  const handleWorkSelect = v => {
    setAdditionalWork(v);
    setSelectDropdownVisbile(false);
  };
  const handlePaymentTypeSelect = paymentType => {
    setPaymentType(paymentType);
    setPayDropdownVisbile(false);
  };
  const handleCloseDropdown = () => {
    setSelectDropdownVisbile(false);
    setPayDropdownVisbile(false);
  };

  const onSelectDate = date => {
    setSelectedDate(date.dateString);
  };

  const generateInvoiceSentMessage = (
    customerFirstName,
    franchiseeName,
    googleReviewLink,
  ) => {
    return `Hi ${customerFirstName},
  
  Thank you for your time today. It was a pleasure working for you.
  
  Your invoice has now been sent to your email. If you have any questions, please feel free to contact me at any time. You can pay either by direct bank transfer or using the pay now feature, although this does surcharge.
  
  If you’re happy with our service, a Google or social media review would mean a lot to me and help me grow my business if it's not too much trouble. The link to my Google here: ${googleReviewLink}
  
  Cheers,  
  ${franchiseeName}  
  JH Group Cleaning Services`;
  };

  const sendSMS = (phone, message) => {
    const url = `sms:${phone}?body=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(err =>
      console.error('Error launching SMS', err),
    );
  };

  const handleResetFields = () => {
    setAdditionalWork('');
    setSelectedDate('');
    setAmount('');
  };

  const handleSelectTime = () => {
    if (!selectedDate) {
      Alert.alert('Please select a date!');
      return;
    } else {
      setTimePickerModalVisible(true);
      setConfirmModalVisible(false);
    }
  };

  const formatTime = time => {
    if (time) {
      const hour = parseInt(time.hour);
      const minute = time.minute.padStart(2, '0');
      const daySection = time.daySection.toUpperCase();
      return `${hour % 12 || 12}:${minute} ${daySection}`;
    }
  };

  const handleBookAppointment = () => {
    setTimePickerModalVisible(false);
    setConfirmModalVisible(false);
    if (selectedDate) {
      if (
        JobFinishedData?.FinishJob?.id &&
        JobFinishedData?.FinishJob?.id !== undefined
      ) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todaysDate = `${year}-${month}-${day}`;

        const commercial = job[0]?.quotation?.commercial_job
          ? JSON.parse(job[0]?.quotation?.commercial_job)
          : null;
        const residential = job[0]?.quotation?.residential_job
          ? JSON.parse(job[0]?.quotation?.residential_job)
          : null;
        const storefront = job[0]?.quotation?.storefront_job
          ? JSON.parse(job[0]?.quotation?.storefront_job)
          : null;

        let categoryTypeCode = null;
        if (job[0]?.quotation?.category_type === 'commercial') {
          categoryTypeCode = 201;
        } else if (job[0]?.quotation?.category_type === 'residential') {
          categoryTypeCode = 200;
        } else if (job[0]?.quotation?.category_type === 'storefront') {
          categoryTypeCode = 202;
        }

        let selectedJob = commercial || residential || storefront;

        const updatedJob = selectedJob.map(jobItem => ({
          ...jobItem,
          category_type_code: categoryTypeCode,
        }));

        updatedJob.push({
          job: AdditionWork,
          price: amount,
          timeEst: '',
          category_type_code: categoryTypeCode,
        });

        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);
        const id = LoginData?.user?.id;

        const postData = {
          franchise_id: id,
          finish_job_id: JobFinishedData?.FinishJob?.id,
          schedule_id: JobFinishedData?.FinishJob?.schedule_id,
          date: todaysDate,
          customer_id: job[0]?.customer_id,
          customer_name: job[0]?.customer_name,
          reference: job[0]?.quotation?.quotation_serial_no,
          category : job[0]?.quotation?.category_type,
          job: updatedJob,
          payment_type: paymentType,
          additional_work: AdditionWork,
          next_schedule_date: selectedDate,
          amount: amount,
          start_time: formattedStartTime,
          end_time: formattedEndTime,
        };
        const token = LoginData.token;
        // setCustomLoading(true);
        

        dispatch(JobFinishedApi(postData)).then(res => {
          
          if (res.payload.status === true) {
            navigation.navigate('Dashboard');
            const id = LoginData?.user?.id;
            const franchiseid = {franchise_id: id};
            dispatch(GetAllTimetrackingApi({token, franchiseid}));
            dispatch(GetScheduleApi({token, franchiseid}));
            dispatch(GetInvoiceUrl({token, franchiseid}));
            setCustomLoading(false);
            navigation.navigate('Dashboard');
            handleResetFields();
            Alert.alert(
                      'Booking Confirmed',
                      selectedDate
                        ? `Your next booking is on ${selectedDate}`
                        : 'Booking successful',
                    );

            // // Wait for GetInvoiceUrl to complete
            // dispatch(GetInvoiceUrl({token, franchiseid})).then(invoiceRes => {
            //   const invoices = invoiceRes.payload?.Invoices || [];

            //   if (invoices.length > 0) {
            //     const latestInvoice = invoices[invoices.length - 1];
            //     const id = LoginData?.user?.id;
            //     const postData = {
            //       franchise_id: id,
            //       id: latestInvoice.InvoiceID,
            //     };

            //     dispatch(CreateInvoiceSentandEmailAPi(postData)).then(() => {

            //       setConfirmModalVisible(false);
            //       setCustomLoading(false);

            //       Alert.alert(
            //         'Booking Confirmed',
            //         selectedDate
            //           ? `Your next booking is on ${selectedDate}`
            //           : 'Booking successful',
            //       );

            //       const message = generateInvoiceSentMessage(
            //         job[0]?.customer_name,
            //         LoginData?.user?.first_name,
            //         'https://example.com/',
            //       );
            //       sendSMS(job[0]?.quotation?.customer_phone, message);

            //       navigation.navigate('Dashboard');
            //       handleResetFields();
            //     });
            //   } else {
            //     console.warn('No invoices found after posting');
            //     setCustomLoading(false);
            //   }
            // });
          } else {
            setCustomLoading(false);
          }
        });
      }
    } else {
      Alert.alert('Please select a date!');
    }
  };

  // useEffect(() => {
  //   setCustomLoading(false);
  // })

  const handleSkip = () => {
    setConfirmModalVisible(false);
    if (
      JobFinishedData?.FinishJob?.id &&
      JobFinishedData?.FinishJob?.id !== undefined
    ) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const todaysDate = `${year}-${month}-${day}`;

      const commercial = job[0]?.quotation?.commercial_job
        ? JSON.parse(job[0]?.quotation?.commercial_job)
        : null;
      const residential = job[0]?.quotation?.residential_job
        ? JSON.parse(job[0]?.quotation?.residential_job)
        : null;
      const storefront = job[0]?.quotation?.storefront_job
        ? JSON.parse(job[0]?.quotation?.storefront_job)
        : null;

      let categoryTypeCode = null;
      if (job[0]?.quotation?.category_type === 'commercial') {
        categoryTypeCode = 201;
      } else if (job[0]?.quotation?.category_type === 'residential') {
        categoryTypeCode = 200;
      } else if (job[0]?.quotation?.category_type === 'storefront') {
        categoryTypeCode = 202;
      }

      let selectedJob = commercial || residential || storefront;

      const updatedJob = selectedJob.map(jobItem => ({
        ...jobItem,
        category_type_code: categoryTypeCode,
      }));

      updatedJob.push({
        job: AdditionWork,
        price: amount,
        timeEst: '',
        category_type_code: categoryTypeCode,
      });
      const id = LoginData?.user?.id;
      const postData = {
        franchise_id: id,
        finish_job_id: JobFinishedData?.FinishJob?.id,
        schedule_id: JobFinishedData?.FinishJob?.schedule_id,
        date: todaysDate,
        customer_id: job[0]?.customer_id,
        customer_name: job[0]?.customer_name,
        reference: job[0]?.quotation?.quotation_serial_no,
        job: updatedJob,
        payment_type: paymentType,
        additional_work: AdditionWork,
        next_schedule_date: '',
        amount: amount,
      };
      const token = LoginData.token;

      setCustomLoading(true);
      console.log('postData', postData);
      

      dispatch(JobFinishedApi(postData)).then(res => {
        console.log(res.payload, 'res');
        
        if (res.payload.status === true) {
          const id = LoginData?.user?.id;
          const franchiseid = {franchise_id: id};
          dispatch(GetAllTimetrackingApi({token, franchiseid}));
          dispatch(GetScheduleApi({token, franchiseid}));
          dispatch(GetInvoiceUrl({token, franchiseid}));
          setCustomLoading(false);
          navigation.navigate('Dashboard');
          handleResetFields();

          Alert.alert(
            'Booking Confirmed',
            selectedDate
              ? `Your next booking is on ${selectedDate}`
              : 'Booking successful',
          );

          // dispatch(GetInvoiceUrl({token, franchiseid})).then(invoiceRes => {
          //   const invoices = invoiceRes.payload?.Invoices || [];

          //   if (invoices.length > 0) {
          //     const latestInvoice = invoices[invoices.length - 1];
          //     const id = LoginData?.user?.id;
          //     const postData = {
          //       franchise_id: id,
          //       id: latestInvoice.InvoiceID,
          //     };

          //     dispatch(CreateInvoiceSentandEmailAPi(postData)).then(() => {
          //       dispatch(GetScheduleApi({token, franchiseid}));

          //       setConfirmModalVisible(false);
          //       setCustomLoading(false);

          //       const message = generateInvoiceSentMessage(
          //         job[0]?.customer_name,
          //         LoginData?.user?.first_name,
          //         'https://example.com/',
          //       );
          //       sendSMS(job[0]?.quotation?.customer_phone, message);

          //       navigation.navigate('Dashboard');
          //       handleResetFields();
          //     });
          //   } else {
          //     console.warn('No invoices found after posting');
          //     setCustomLoading(false);
          //   }
          // });
        } else {
          setCustomLoading(false);
        }
      });
    }
  };

  const handleSendInvoice = async () => {
    setConfirmModalVisible(true);
  };

  return (
    <View style={ReviewStyle.container}>
      <Header notificationIcon={true} backButton={false} />
      {(JobFinishedLoading || customLoading) && (
        <View style={ReviewStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
      <KeyboardAvoidingView // Wrap your scrollable content
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'padding' for iOS, 'height' for Android might work better
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust this offset as needed
      >
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          // You might want to remove onPress from ScrollView if it conflicts with dropdowns
        >
          <Pressable style={ReviewStyle.card} onPress={handleCloseDropdown}>
            <View>
              <Text style={ReviewStyle.title}>Review</Text>
            </View>
  
            {/* Customer Details */}
            <View style={ReviewStyle.valueLabel}>
              <Text style={ReviewStyle.label}>Customer Name</Text>
              <View style={ReviewStyle.row}>
                <View style={ReviewStyle.input}>
                  <Text style={ReviewStyle.value}>
                    {job[0]?.quotation?.customer_name}
                  </Text>
                </View>
              </View>
            </View>
  
            <View style={ReviewStyle.valueLabel}>
              <Text style={ReviewStyle.label}>Email</Text>
              <View style={ReviewStyle.input}>
                <Text style={ReviewStyle.value}>
                  {job[0]?.quotation?.customer_email}
                </Text>
              </View>
            </View>
  
            <View style={ReviewStyle.valueLabel}>
              <Text style={ReviewStyle.label}>Phone Number</Text>
              <View style={ReviewStyle.input}>
                <Text style={ReviewStyle.value}>
                  {job[0]?.quotation?.customer_phone}
                </Text>
              </View>
            </View>
  
            <View style={ReviewStyle.valueLabel}>
              <Text style={ReviewStyle.label}>Address</Text>
              <View style={ReviewStyle.input}>
                <Text style={ReviewStyle.value}>
                  {job[0]?.quotation?.category_address}
                </Text>
              </View>
            </View>
  
            {/* Time Details */}
            <View style={ReviewStyle.row}>
              <View style={{flex: 1}}>
                <Text style={ReviewStyle.label}>Est Finish</Text>
                <View style={ReviewStyle.input}>
                  <Text style={ReviewStyle.timeText}>
                    {scheduledDurationFormatted}
                  </Text>
                </View>
              </View>
              <View style={{flex: 1}}>
                <Text style={ReviewStyle.label}>Actual</Text>
                <View style={ReviewStyle.input}>
                  <Text style={ReviewStyle.timeText}>
                    {actualDurationFormatted}
                  </Text>
                </View>
              </View>
              <View style={{flex: 1}}>
                <Text style={ReviewStyle.label}>Efficiency</Text>
                <View style={ReviewStyle.input}>
                  <Text style={ReviewStyle.timeText}>
                    {job[0]?.efficiency?.toFixed(2)}%
                  </Text>
                </View>
              </View>
            </View>
  
            {/* Job Notes */}
            <Text style={ReviewStyle.label}>Job Notes</Text>
            <View style={ReviewStyle.inputForNotes}>
              <Text style={ReviewStyle.value}>{job[0]?.quotation.notes}</Text>
            </View>
  
            {/* Additional Work and Amount */}
            <View style={{flex: 1, marginLeft: 5}}>
              <Text style={ReviewStyle.label}>Additional Work</Text>
              <CustomTextInput
                placeholder="Addition Work"
                icon="pen"
                value={AdditionWork}
                onChangeText={setAdditionalWork}
                onFocus={() => handleCloseDropdown()}
              />
            </View>
  
            <View style={{flex: 1, marginHorizontal: 5}}>
              <Text style={ReviewStyle.label}>Amount</Text>
              <CustomTextInput
                placeholder="Amount"
                keyboardType="numeric"
                icon="currency-usd"
                value={amount}
                onChangeText={setAmount}
                onFocus={() => handleCloseDropdown()}
              />
            </View>
  
            {/* Buttons */}
            <View style={ReviewStyle.buttonContainer}>
              <TouchableOpacity
                style={ReviewStyle.button}
                onPress={handleSendInvoice}>
                <Text style={ReviewStyle.buttonText}>Send Invoice</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
  
      {/* Modals should typically be outside KeyboardAvoidingView */}
      <Modal
        transparent={true}
        visible={timePickerModalVisible}
        animationType="slide"
        onRequestClose={() => setTimePickerModalVisible(false)}>
        <View style={ReviewStyle.modalOverlay}>
          <View style={ReviewStyle.modalContent}>
            <Text style={ReviewStyle.modalText}>Select Time Booking Date</Text>
            <View style={ReviewStyle.timeSelectionContainer}>
              <View>
                <Text style={ReviewStyle.label1}>Start Time</Text>
                <TouchableOpacity
                  style={ReviewStyle.openButton}
                  onPress={() => setIsStartTimePickerVisible(true)}>
                  <Text style={ReviewStyle.buttonText}>
                    {startTime
                      ? `${startTime.hour}:${startTime.minute} ${startTime.daySection}`
                      : 'Select Time'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={ReviewStyle.label1}>End Time</Text>
                <TouchableOpacity
                  style={ReviewStyle.openButton}
                  onPress={() => setIsEndTimePickerVisible(true)}>
                  <Text style={ReviewStyle.buttonText}>
                    {endTime
                      ? `${endTime.hour}:${endTime.minute} ${endTime.daySection}`
                      : 'Select Time'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TimePickerModal
              visible={isStartTimePickerVisible}
              onClose={() => setIsStartTimePickerVisible(false)}
              onSave={time => {
                setStartTime(time);
              }}
              initialTime={startTime}
            />
            <TimePickerModal
              visible={isEndTimePickerVisible}
              onClose={() => setIsEndTimePickerVisible(false)}
              onSave={time => {
                setEndTime(time);
              }}
              initialTime={endTime}
            />
            <View style={ReviewStyle.modalActions}>
              <TouchableOpacity
                style={[ReviewStyle.modalButton, ReviewStyle.confirmButton]}
                onPress={handleBookAppointment}>
                <Text style={ReviewStyle.buttonText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  
      <Modal
        transparent={true}
        visible={confirmModalVisible}
        animationType="slide"
        onRequestClose={() => setConfirmModalVisible(false)}>
        <View style={ReviewStyle.modalOverlay}>
          <View style={ReviewStyle.modalContent}>
            <Text style={ReviewStyle.modalText}>Select Next Booking Date</Text>
            <Calendar
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: 'blue',
                },
              }}
              onDayPress={onSelectDate}
            />
            <View style={ReviewStyle.modalActions}>
              <TouchableOpacity
                style={[ReviewStyle.modalButton, ReviewStyle.skipButton]}
                onPress={handleSkip}>
                <Text style={ReviewStyle.buttonText}>Skip</Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={[ReviewStyle.modalButton, ReviewStyle.confirmButton]}
                onPress={handleSelectTime}>
                <Text style={ReviewStyle.buttonText}>Select Time</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Review;
