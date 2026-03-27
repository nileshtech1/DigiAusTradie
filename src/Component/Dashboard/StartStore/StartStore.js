import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../ReusableComponent/Header';
import JobList from '../../../FlatList/CardFlatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimerModal from '../../../ReusableComponent/TimerModal';
import {useTimer} from '../../../ReusableComponent/TimerContext';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import {useDispatch, useSelector} from 'react-redux';
import StartStoreStyle from '../../../utils/Stylesheet/StartStoreStyle';
import {TimeTrackingApi} from '../../../Redux/API/TimeTrackingApi';
import LottieView from 'lottie-react-native';
import {
  GetAllTimetrackingApi,
  GetTimetrackingApi,
} from '../../../Redux/API/GetTimeTrackedApi';
import Colors from '../../../Assets/Style/Color';
import {JobFinishedApi} from '../../../Redux/API/JobFinishedApi';
import {coffeBreak} from '../../../Assets/Images';
const logout = require('../../../Assets/Images/LottieAnimation/Cancel.json');

const StartStore = ({navigation}) => {
  const {elapsedTime, startTimer, stopTimer, resetTimer, isRunning} =
    useTimer();
  const [showModal, setShowModal] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [revieImages, setReviewimages] = useState([]);
  const [job, setJob] = useState('');
  const [time, setTime] = useState('');
  const [emjScale, setEmjScale] = useState(0);
  const [jobData, setJobData] = useState([]);
  const dispatch = useDispatch();
  const {ScheduleList} = useSelector(state => state.ScheduleList);
  const {JobFinishedLoading} = useSelector(state => state.JobFinished);
  const {timeTrackerData, allTimeTrackerData} = useSelector(
    state => state.GetTimeTracking,
  );
  const {LoginData} = useSelector(state => state.Login);

const timeStringToMinutes = (timeString) => {
  if (!timeString) return 0;
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

useEffect(() => {
  if (ScheduleList?.Schedule?.length > 0) {
    const todayDate = new Date().toLocaleDateString('en-CA', {
      timeZone: 'Australia/Sydney',
    });
    let filteredData = ScheduleList.Schedule.filter(
      (item) => item.date === todayDate && item?.type !== 'Quote',
    );

    filteredData = filteredData.sort(
      (a, b) => timeStringToMinutes(a.start_time) - timeStringToMinutes(b.start_time)
    );

    setJobData(filteredData);
  }
}, [ScheduleList]);



  const emojiData = [
    {
      label: 'Very Bad',
      icon: 'frown',
      iconLibrary: 'FontAwesome5',
      scale: 1,
      color: 'red',
    },
    {
      label: 'Bad',
      icon: 'meh',
      iconLibrary: 'FontAwesome5',
      scale: 2,
      color: 'red',
    },
    {
      label: 'Okay',
      icon: 'smile',
      iconLibrary: 'FontAwesome5',
      scale: 3,
      color: '#FC8A1FFF',
    },
    {
      label: 'Good',
      icon: 'smile-beam',
      iconLibrary: 'FontAwesome5',
      scale: 4,
      color: '#E2B900FF',
    },
    {
      label: 'Great',
      icon: 'grin',
      iconLibrary: 'FontAwesome5',
      scale: 5,
      color: '#3C9E0FFF',
    },
    {
      label: 'Excellent',
      icon: 'grin-stars',
      iconLibrary: 'FontAwesome5',
      scale: 6,
      color: '#3C9E0FFF',
    },
  ];

  const formatTime = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };

  const handleStart = async job => {
    const token = LoginData.token;
    const id = LoginData?.user?.id;
    const franchiseid = {
      franchise_id: id,
    };
    if (job?.id) {
      const postData = {
        franchise_id: job?.quotation?.franchise_id,
        customer_id: job?.quotation?.customer_id,
        schedule_id: job?.id,
        start_time: formatTime(new Date()),
        end_time: null,
        status: 'active',
      };
      console.log('postData Add time tracking data', postData);
      
      const response = await dispatch(TimeTrackingApi(postData));
      if (response.payload.status === true) {
        const id2 = response.payload?.TimeTrack?.id;
        dispatch(GetTimetrackingApi({id2, token}));
        dispatch(GetAllTimetrackingApi({token, franchiseid}));
        AsyncStorage.setItem('current_job', JSON.stringify(id2));
      }
    }

    if (isRunning) {
      Alert.alert('Timer is already running for Job');
      return;
    }

    setShowModal(true);
    startTimer();
    await AsyncStorage.setItem(
      `job-${job.id}-startTime`,
      Date.now().toString(),
    );
    await AsyncStorage.setItem(`job-${job.id}-elapsedTime`, '0');
  };

  const handleFinish = async (job) => {
    
    const token = LoginData.token;
    const id = LoginData?.user?.id;
    const franchiseid = {
      franchise_id: id,
    };
    
    if (job?.id) {
      const lastTimeTrack =
        allTimeTrackerData?.TimeTrack?.[
          allTimeTrackerData.TimeTrack.length - 1
        ];
      const tracking_id = lastTimeTrack?.id;
      const start_time = lastTimeTrack?.start_time;
      console.log('start_time', start_time);

      
      const id2 = lastTimeTrack?.id;
      const postData = {
        franchise_id: job?.quotation?.franchise_id,
        customer_id: job?.quotation?.customer_id,
        schedule_id: job?.id,
        tracking_id: tracking_id,
        start_time: start_time,
        end_time: formatTime(new Date()),
        status: 'finish',
      };
      
      const response = await dispatch(TimeTrackingApi(postData));
      if (response.payload.status === true) {
        AsyncStorage.removeItem('current_job');
        dispatch(GetAllTimetrackingApi({token, franchiseid}));
        dispatch(GetTimetrackingApi({id2, token}));
      }
    }
    setJob(job);

    if (!isRunning) {
      Alert.alert('Timer is not running for job.');
      return;
    }

    stopTimer();
    setShowModal(false);
    setTime(elapsedTime);
    setConfirmModalVisible(true);
    resetTimer();

    await AsyncStorage.removeItem(`job-${job.id}-startTime`);
    await AsyncStorage.removeItem(`job-${job.id}-elapsedTime`);
  };

  const formatElapsedTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours} hrs ${minutes} mins ${seconds} secs`;
  };

    const parseTime = timeStr => {
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return new Date(1970, 0, 1, hours, minutes);
    };

  const handleReview = async job => {
  
    const lastTimeTrack = allTimeTrackerData?.TimeTrack?.[allTimeTrackerData.TimeTrack.length - 1];
    const start_time = lastTimeTrack?.start_time;
    const scheduled_Start_time = parseTime(job?.start_time);
    const scheduled_End_time = parseTime(job?.end_time);
    const job_start_time = parseTime(start_time);
    const job_end_time = parseTime(formatTime(new Date()));
    const scheduledDuration = scheduled_End_time - scheduled_Start_time;
    const actualDuration = job_end_time - job_start_time;

    const scheduledDurationInMinutes = scheduledDuration / (1000 * 60);
    const actualDurationInMinutes = actualDuration / (1000 * 60);

    const efficiency =
      (scheduledDurationInMinutes / actualDurationInMinutes) * 100;

    const reviewData = {
      ...job,
      scheduledDuration,
      actualDuration,
      efficiency,
    };
    const postData = {
      franchise_id: lastTimeTrack?.franchise_id,
      customer_id: lastTimeTrack?.customer_id,
      schedule_id: lastTimeTrack?.schedule_id,
      start_time: start_time,
      end_time: formatTime(new Date()),
      efficiency: efficiency.toFixed(2),
      enjoyment_scale: emjScale,
      status: 'finish',
    };

    const formData = new FormData();

    formData.append('franchise_id', postData.franchise_id);
    formData.append('customer_id', postData.customer_id);
    formData.append('schedule_id', postData.schedule_id);
    formData.append('enjoyment_scale', postData.enjoyment_scale);
    formData.append('status', postData.status);
    formData.append('start_time', postData.start_time);
    formData.append('end_time', postData.end_time);
    formData.append('efficiency', postData.efficiency);

    revieImages.forEach((image, index) => {
      const imageUri = image.uri;
      const fileType = image.type;
      const fileName = image.fileName;

      const imageFile = {
        uri: imageUri,
        type: fileType,
        name: fileName,
      };

      formData.append(`images[${index}]`, {
        uri: imageFile.uri,
        type: imageFile.type,
        name: imageFile.name,
      });
    });

    const token = LoginData.token;
    const id = LoginData?.user?.id;
    const franchiseid = {
      franchise_id: id,
    };

    dispatch(JobFinishedApi(formData)).then(res => {
      if (res.payload.status === true) {
        setConfirmModalVisible(false);
        navigation.navigate('Review', {reviewData});
        dispatch(GetAllTimetrackingApi({token, franchiseid}));
      }
    });
  };

  const handleStopTimer = () => {
    stopTimer();
    setShowButton(!showButton);
  };
  const handleStartTimer = () => {
    startTimer();
    setShowButton(!showButton);
  };

  return (
    <View style={StartStoreStyle.container}>
      <Header notificationIcon={true} backButton={true} />
      {jobData.length > 0 ? (
        <JobList
          jobs={jobData}
          onStart={handleStart}
          onFinish={handleFinish}
          show={() => setShowModal(true)}
          setReviewimages={setReviewimages}
        />
      ) : (
        <View style={StartStoreStyle.noTextContainer}>
          {/* <LottieView
            source={logout}
            autoPlay
            loop={true}
            style={StartStoreStyle.animation}
          /> */}
          <Image
            source={coffeBreak}
            resizeMode="contain"
            style={{width: 80, height: 80, marginVertical: 20}}
          />
          <Text style={StartStoreStyle.noText}>No schedule for today</Text>
        </View>
      )}
      {JobFinishedLoading && (
        <View style={StartStoreStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
      <TimerModal
        visible={showModal}
        elapsedTime={elapsedTime}
        onStop={() => setShowModal(false)}
        onPause={() => handleStopTimer()}
        onStart={handleStartTimer}
        showButton={showButton}
      />
      <Modal
        transparent={true}
        visible={confirmModalVisible}
        animationType="slide"
        onRequestClose={() => setConfirmModalVisible(false)}>
        <View style={StartStoreStyle.modalOverlay}>
          <View style={StartStoreStyle.modalContent}>
            <Text style={StartStoreStyle.time}>
              Total time: {formatElapsedTime(time)}
            </Text>
            <Text style={StartStoreStyle.sliderValue}>Enjoyment Scale</Text>

            {/* Render Icon Selection */}
            <View style={StartStoreStyle.emojiContainer}>
              {emojiData.map(item => (
                <TouchableOpacity
                  key={item.scale}
                  style={[
                    StartStoreStyle.emojiItem,
                    emjScale === item.scale && StartStoreStyle.selectedEmoji,
                  ]}
                  onPress={() => setEmjScale(item.scale)}>
                  <VectorIcon
                    icon={item.iconLibrary}
                    name={item.icon}
                    color={item.color}
                    size={40} // Adjust size as needed
                  />
                  <Text
                    style={[StartStoreStyle.emojiLabel, {color: item.color}]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={StartStoreStyle.modalActions}>
              <TouchableOpacity
                style={[
                  StartStoreStyle.modalButton,
                  StartStoreStyle.confirmButton,
                ]}
                onPress={() => handleReview(job)}>
                <Text style={StartStoreStyle.buttonText}>Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StartStore;
