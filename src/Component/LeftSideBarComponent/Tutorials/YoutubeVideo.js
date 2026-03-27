import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Header from '../../../ReusableComponent/Header';
import Colors from '../../../Assets/Style/Color';
import SearchBar from '../../../ReusableComponent/SearchBar';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useDispatch, useSelector} from 'react-redux';
import {GetTutorialApi} from '../../../Redux/API/GetTutorialApi';
import {thumbnailImg} from '../../../Assets/Images';
import YoutubeVideoStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/YoutubeVideoStyle';

const YoutubeVideo = ({route}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [youtubeVideo, setYoutubeVideo] = useState([]);
  const {category} = route.params;
  const {TutorialData, GetTutorialsLoader} = useSelector(
    state => state.TutorialList,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const categoryDispatch = async () => {
      if (category) {
        dispatch(GetTutorialApi(category.id));
      }
    };
    categoryDispatch();
  }, [category]);

  useEffect(() => {
    if (TutorialData?.Tutorial && TutorialData.Tutorial.length > 0) {
      const selectedTutorial = TutorialData.Tutorial[0];
      if (selectedTutorial?.tutorial_sub_category) {
        setYoutubeVideo(selectedTutorial?.tutorial_sub_category);
      }
    }
  }, [TutorialData]);

  const handleSearch = query => {
    setSearchQuery(query);
  };
  const handleClear = () => {
    setSearchQuery('');
  };

  const filteredCategories = useMemo(() => {
    return youtubeVideo?.filter(item =>
      item.sub_category?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, TutorialData]);

  const getVideoIdFromUrl = url => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Open Modal and Set Video ID
  const handleVideoClick = link => {
    const videoId = getVideoIdFromUrl(link);
    setSelectedVideoId(videoId);
    setModalVisible(true); // Show modal
  };

  // Close Modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedVideoId(null); // Reset video ID
  };

  const renderVideoItem = ({item}) => {
    const videoId = getVideoIdFromUrl(item.url);

    return (
      <View key={item.index} style={YoutubeVideoStyle.videoItem}>
        <Text style={YoutubeVideoStyle.videoTitle}>{item.sub_category}</Text>
        {videoId ? (
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => handleVideoClick(item.url)} // Open video in modal
          >
            <Image
              source={{
                uri: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
              }}
              style={YoutubeVideoStyle.videoImage}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => handleVideoClick(item.url)} // Open video in modal when clicked on placeholder
          >
            <Image
              source={thumbnailImg} // Placeholder image
              style={YoutubeVideoStyle.videoImage}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={YoutubeVideoStyle.container}>
      <Header notificationIcon={true} backButton={true} route="Tutorials" />
      <View style={{marginVertical: 10, marginHorizontal: 10}}>
        <Text style={YoutubeVideoStyle.categoryName}>
          {category.tutorials_categories}
        </Text>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          handleClear={handleClear}
          placeholder="Search for Tutorials"
        />
      </View>

      <View style={YoutubeVideoStyle.contentContainer}>
        {filteredCategories.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={YoutubeVideoStyle.noCategoryText}>No Video found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredCategories}
            renderItem={renderVideoItem}
            keyExtractor={(item, index) => index.toString()} // Use index as the key
            showsVerticalScrollIndicator={false}
            contentContainerStyle={YoutubeVideoStyle.flatListContainer}
          />
        )}
      </View>

      {/* Modal to show YouTube Player */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}>
        <View style={YoutubeVideoStyle.modalContainer}>
          <View style={YoutubeVideoStyle.modalContent}>
            <YoutubePlayer
              height={199}
              width="100%"
              videoId={selectedVideoId}
              play={true}
              onChangeState={event => console.log(event)}
            />
          </View>
          <TouchableOpacity
            style={YoutubeVideoStyle.closeButtonContainer}
            onPress={() => setModalVisible(false)}>
            <Text style={YoutubeVideoStyle.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {GetTutorialsLoader && (
        <View style={YoutubeVideoStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
    </View>
  );
};

export default YoutubeVideo;
