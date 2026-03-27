import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Assets/Style/Color';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import BottomSheetModal from '../ReusableComponent/BottomSheetModal';
import VectorIcon from '../ReusableComponent/VectorIcon';
import StartStoreFlatlist from '../utils/Stylesheet/StartStoreFlatlistStyle';
import { quote_image_path } from '../Redux/NWConfig';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateScheduleApi } from '../Redux/API/UpdateScheduleApi';
import OtherScheduleStyle from '../utils/Stylesheet/OtherScheduleStyle';
import { GetScheduleApi } from '../Redux/API/GetScheduleApi';
// 1. Import the hook
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const JobCard = ({
  job,
  activeJobId,
  finishedJobIds,
  setActiveJobId,
  onStart,
  onFinish,
  exitButton,
  setExitButton,
  show,
  index,
  length,
  setReviewimages,
  onDone,
}) => {
  const [imageUri, setImageUri] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [finishedData , setFinishedData] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const {timeTrackerData}= useSelector(state => state.GetTimeTracking);
  const {allTimeTrackerData}= useSelector(state => state.GetTimeTracking);


useEffect(() => {
  const FinishedJobs = async () => {
    // Ensure that allTimeTrackerData and TimeTrack are valid
    if (allTimeTrackerData?.status === true && allTimeTrackerData?.TimeTrack_finished) {
      setFinishedData(allTimeTrackerData?.TimeTrack_finished); // Set the finished data

    }
  };
  FinishedJobs();
}, [allTimeTrackerData]);


  useEffect(() => {
    const ActiveJobId = async () => {
      if (timeTrackerData.status === true && timeTrackerData?.TimeTrack?.status !== 'finish') {
        const parsedScheduleId = parseInt(timeTrackerData?.TimeTrack?.schedule_id, 10);
        setActiveJobId(parsedScheduleId);
      }
    };
    ActiveJobId();
  }, [timeTrackerData]);
  
  const handleStartJob = work => {
    if (activeJobId === 0 && !finishedJobIds.includes(work.id)) {
      setActiveJobId(work.id);
      // setExitButton(work.id);
      onStart(work);
    }
  };

  const showModal = () => setModalVisible(true);

  const handleImageRemove = index => {
    setSelectedImage(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleTakePhoto = () => {
    setModalVisible(false);
    launchCamera(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          const newPhoto = response.assets[0];
          setSelectedImage(prevImages => [...prevImages, newPhoto.uri]); 
          setReviewimages(prevImages => [...prevImages, newPhoto]); 
        }
      },
    );
  };
  
  const handleSelectFromGallery = () => {
    setModalVisible(false);
    launchImageLibrary(
      {
        selectionLimit: 0,
        mediaType: 'photo',
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          const selectedImages = response.assets;
          setSelectedImage(prevImages => [...prevImages, ...selectedImages.map(image => image.uri)]); 
          setReviewimages(prevImages => [...prevImages, ...selectedImages]); 
        }
      },
    );
  };
  

  const finish = job => {
    setConfirmModalVisible(false);
    setActiveJobId(0);
    onFinish(job);
  };


  const handleDone = (job) => {
    Alert.alert(
      'Confirm Completion',
      'Are you sure you want to mark this Meeting/Task as done?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => onDone(job),
        },
      ],
      { cancelable: true }
    );
  }

  const handleFinishJob = () => {
    setConfirmModalVisible(true);
  };


  const getButtonStyle = buttonType => {
    if (finishedData.some(jobItem => parseInt(jobItem.schedule_id) === job.id)) {
      return {
        backgroundColor: Colors.sidebar_Active_grey,
      };
    }

    if (buttonType === 'start') {
      return {
        backgroundColor:
          activeJobId === job.id
            ? Colors.blue_theme_Color
            : Colors.theme_background_dark,
      };
    }

    return {
      backgroundColor:
        activeJobId === job.id
          ? Colors.pink_theme_color
          : Colors.theme_background_dark,
    };
  };

  const convertToDate = (timeString, date) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  };

  const calculateEstimatedTime = (startTime, endTime, date) => {
    const startDate = convertToDate(startTime, date);
    const endDate = convertToDate(endTime, date);

    const diffInMilliseconds = endDate - startDate;
    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours} Hour ${minutes} Min`;
  };

  const today = new Date();
  const todayDate = today.toISOString().split('T')[0];

  const estimatedTime = calculateEstimatedTime(job?.start_time, job?.end_time, todayDate);
  const residentialJobs = job?.quotation?.residential_job ? JSON.parse(job?.quotation.residential_job) : [];
  const commercialJobs = job?.quotation?.commercial_job ? JSON.parse(job?.quotation.commercial_job) : [];
  const storefrontJobs = job?.quotation?.storefront_job ? JSON.parse(job?.quotation.storefront_job) : [];

  const images = job?.quotation?.image ? JSON.parse(job?.quotation.image) : [];
  const imageZero = images[0]

  const capitalizeFirstLetter = str => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // if (!job?.customer_id) {
  //   return null;
  // }
  if (job?.type === 'Quote') {
    return null;
  }
  if (job?.type === 'Job' && !job?.customer_id) {
    return null;
  }

  return (
    <View  style={ job?.customer_id ? StartStoreFlatlist.card :  StartStoreFlatlist.card1} >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
      <Text
  style={[
    StartStoreFlatlist.title,
    finishedData.some(jobItem => parseInt(jobItem.schedule_id) === job.id) && StartStoreFlatlist.finishedTitle,
    ]}
  >
    Job {index + 1}/{length} {finishedData.some(jobItem => parseInt(jobItem.schedule_id) === job.id) ? 'Done' : ''}
  </Text>


        {activeJobId === job.id && (
          <TouchableOpacity
            style={StartStoreFlatlist.viewButton}
            onPress={show}>
            <Text style={StartStoreFlatlist.buttonText}>View Timer</Text>
          </TouchableOpacity>
        )}
      </View>

    {
      job?.customer_id && <>
        <View style={StartStoreFlatlist.row}>
        <View style={StartStoreFlatlist.input}>
          <Text style={StartStoreFlatlist.value}>{capitalizeFirstLetter(job?.quotation?.category_type)}</Text>
        </View>
      </View>

      <View style={StartStoreFlatlist.checkboxContainer}>
        <View style={{flexDirection: 'column'}}>
        {
              job?.quotation?.category_type === "residential" && 
              residentialJobs?.map((category, index) => (
                <TouchableOpacity key={index} style={StartStoreFlatlist.checkbox}>
                  <Text style={StartStoreFlatlist.labelUp}>{category.job}</Text>
                </TouchableOpacity>
              ))
            }
              {
              job?.quotation?.category_type === "commercial" && 
              commercialJobs?.map((category, index) => (
                <TouchableOpacity key={index} style={StartStoreFlatlist.checkbox}>
                  <Text style={StartStoreFlatlist.labelUp}>{category.job}</Text>
                </TouchableOpacity>
              ))
            }
              {
              job?.quotation?.category_type === "storefront" && 
              storefrontJobs?.map((category, index) => (
                <TouchableOpacity key={index} style={StartStoreFlatlist.checkbox}>
                  <Text style={StartStoreFlatlist.labelUp}>{category.job}</Text>
                </TouchableOpacity>
              ))
            }
        </View>

        <View style={StartStoreFlatlist.imgContainer}>
            <Image
              source={{ uri : quote_image_path + imageZero?.path}}
              resizeMode="contain"
              style={StartStoreFlatlist.image}
            />
          </View>
      </View>
      </>
    }

      <View style={StartStoreFlatlist.valueLabel}>
        <Text style={StartStoreFlatlist.label}>{ job?.customer_id ?'Customer Name' : 'Meeting/Task'}</Text>
        <View style={StartStoreFlatlist.row}>
          <View style={StartStoreFlatlist.input}>
            <Text style={StartStoreFlatlist.value}>{job?.customer_name}</Text>
          </View>
        </View>
      </View>

     {
        job?.customer_id && <>
           <View style={StartStoreFlatlist.valueLabel}>
        <Text style={StartStoreFlatlist.label}>Phone Number</Text>
        <View style={StartStoreFlatlist.input}>
          <Text style={StartStoreFlatlist.value}>{job?.quotation?.customer_phone}</Text>
        </View>
      </View>

      <View style={StartStoreFlatlist.valueLabel}>
        <Text style={StartStoreFlatlist.label}>Address</Text>
        <View style={StartStoreFlatlist.input}>
          <Text style={StartStoreFlatlist.value}>{job?.customer_address ? job?.customer_address :job?.quotation?.category_address}</Text>
        </View>
      </View>
        </>
     }

      <View style={StartStoreFlatlist.row}>
        <View style={{flex: 1}}>
          <Text style={StartStoreFlatlist.label}>Start</Text>
          <View style={StartStoreFlatlist.input}>
            <Text style={StartStoreFlatlist.value}>{job?.start_time}</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={StartStoreFlatlist.label}>Est Finish</Text>
          <View style={StartStoreFlatlist.input}>
            <Text style={StartStoreFlatlist.value}>{job?.end_time}</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={StartStoreFlatlist.label}>Time</Text>
          <View style={StartStoreFlatlist.input}>
            <Text style={StartStoreFlatlist.value}>{estimatedTime}</Text>
          </View>
        </View>
      </View>

     {
        job?.customer_id && 
        <>
         <Text style={StartStoreFlatlist.label}>Job Notes</Text>
      <View style={StartStoreFlatlist.inputForNotes}>
        <Text style={job?.quotation?.notes ? StartStoreFlatlist.value : StartStoreFlatlist.notvalue}>
          {job?.quotation?.notes ? job?.quotation?.notes : 'No Notes Available'}
          </Text>
      </View>
        </>
     }

        {
          job?.customer_id ? (
          <View style={StartStoreFlatlist.buttonContainer}>
          <TouchableOpacity
            style={[StartStoreFlatlist.button, getButtonStyle('start')]}
            disabled={activeJobId > 0 || finishedData.some(jobItem => parseInt(jobItem.schedule_id) === job.id)}
            onPress={() => handleStartJob(job)}>
            <Text style={StartStoreFlatlist.buttonText}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={StartStoreFlatlist.cameraButton}
            onPress={showModal}>
            <Icon name="camera" size={22} color="#fff"/>
          </TouchableOpacity>

          <TouchableOpacity
            style={[StartStoreFlatlist.button, getButtonStyle('finish')]}
            disabled={activeJobId != job.id}
            onPress={() => handleFinishJob(job)}>
            <Text style={StartStoreFlatlist.buttonText}>Finish</Text>
          </TouchableOpacity>
        </View>
        ) : (
          <View style={StartStoreFlatlist.buttonContainer}>
          <TouchableOpacity
            style={StartStoreFlatlist.DoneButton}
            onPress={() =>handleDone(job)}>
            <Text style={StartStoreFlatlist.DoneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
        )
        }


       

      {selectedImage.length > 0 && (
        <View style={StartStoreFlatlist.imageRowContainer}>
          {selectedImage.map((imageUri, index) => (
            <View key={index} style={StartStoreFlatlist.imageContainer}>
              <Image
                source={{uri: imageUri}}
                resizeMode="contain"
                style={StartStoreFlatlist.imageBottom}
              />
              <TouchableOpacity
                style={StartStoreFlatlist.iconHoverOnImage}
                onPress={() => handleImageRemove(index)}>
                <VectorIcon
                  icon="Entypo"
                  name="cross"
                  size={15}
                  color={'#FFFFFFFF'}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <BottomSheetModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onTakePhoto={handleTakePhoto}
        onSelectFromGallery={handleSelectFromGallery}
      />
      <Modal
        transparent={true}
        visible={confirmModalVisible}
        animationType="slide"
        onRequestClose={() => setConfirmModalVisible(false)}>
        <View style={StartStoreFlatlist.modalOverlay}>
          <View style={StartStoreFlatlist.modalContent}>
            <Text style={StartStoreFlatlist.modalText}>
              Are you sure you want to finish the job?
            </Text>
            <View style={StartStoreFlatlist.modalActions}>
              <TouchableOpacity
                style={[
                  StartStoreFlatlist.modalButton,
                  StartStoreFlatlist.cancelButton,
                ]}
                onPress={() => setConfirmModalVisible(false)}>
                <Text style={StartStoreFlatlist.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  StartStoreFlatlist.modalButton,
                  StartStoreFlatlist.confirmButton,
                ]}
                onPress={() => finish(job)}>
                <Text style={StartStoreFlatlist.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const JobList = ({jobs, onStart, onFinish, show, setReviewimages}) => {
  // 2. Get safe area insets
  const insets = useSafeAreaInsets();
  
  const [activeJobId, setActiveJobId] = useState(0);
  const [exitButton, setExitButton] = useState(0);
  const [finishedJobIds, setFinishedJobIds] = useState([]);
  const {UpdateScheduleLoading} = useSelector(state => state.UpdateSchedule);
  const {LoginData} = useSelector(state => state.Login);
  const dispatch = useDispatch();

  const validJobs = jobs.filter(job => job.customer_id !== 'Quote');
  const length = validJobs.length;

  const handleFinish = job => {
    setFinishedJobIds(prevIds => [...prevIds, job.id]);
    onFinish(job);
    setActiveJobId(0);
    setExitButton(0);
  };
  const handleDoneMeeting = job => {
    const token = LoginData.token;
    const franchiseid ={franchise_id: LoginData?.user?.id}
    const id = job?.id;
    const name = job?.customer_name;
    const type = job?.type;
    const postData = {
      id: id,
      customer_name: name,
      date: '',
      type: type,
      start_time : job?.start_time,
      end_time : job?.end_time,
      customer_address: job?.customer_address,
    };
    dispatch(UpdateScheduleApi(postData))
    .then(res => {
      if (res.payload?.status === true) {
        dispatch(GetScheduleApi({token, franchiseid}));
      }
    })
    .catch(error => {
      console.error('Error updating booking:', error);
    });
  }

  const filteredJobs = () => {
    if (activeJobId > 0 && exitButton !=0) {
      return jobs.filter(job => job?.id === activeJobId);
    } else {
      return jobs;
    }
  };

  return (
    <>
      <FlatList
        data={filteredJobs()}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        // 3. Add bottom padding based on safe area
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        renderItem={({item, index}) => (
          <JobCard
            job={item}
            index={index}
            activeJobId={activeJobId}
            finishedJobIds={finishedJobIds}
            setActiveJobId={setActiveJobId}
            exitButton={exitButton}
            setExitButton={setExitButton}
            onStart={onStart}
            onFinish={handleFinish}
            onDone={handleDoneMeeting}
            show={show}
            length={length}
            setReviewimages={setReviewimages}
          />
        )}
      />
      {UpdateScheduleLoading && (
        <View style={OtherScheduleStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
          <Text style={OtherScheduleStyle.loaderText}>Updating...</Text>
        </View>
      )}
    </>
  );
};

export default JobList;