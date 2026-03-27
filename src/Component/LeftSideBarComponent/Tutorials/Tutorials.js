import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import Header from '../../../ReusableComponent/Header';
import SearchBar from '../../../ReusableComponent/SearchBar';
import {useNavigation} from '@react-navigation/native';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Colors from '../../../Assets/Style/Color';
import {useDispatch, useSelector} from 'react-redux';
import {GetTutorialApi} from '../../../Redux/API/GetTutorialApi';
import {thumbnailImg} from '../../../Assets/Images';
import YoutubePlayer from 'react-native-youtube-iframe';
import TutorialStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/TutorialStyle';

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {TutorialCatData} = useSelector(state => state.TutorialCatList);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSearch = query => {
    setSearchQuery(query);
  };
  const handleClear = () => {
    setSearchQuery('');
  };

  const getVideoIdFromUrl = url => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery) {
      return TutorialCatData?.Tutorial || [];
    }

    return TutorialCatData?.Tutorial?.reduce((acc, item) => {
      const matchingSubCategories = item.tutorial_sub_category?.filter(
        subItem =>
          subItem.sub_category
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );

      if (matchingSubCategories && matchingSubCategories.length > 0) {
        acc.push({
          ...item,
          tutorial_sub_category: matchingSubCategories,
        });
      } else if (
        item.tutorials_categories
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) {
        acc.push(item);
      }

      return acc;
    }, []);
  }, [searchQuery, TutorialCatData]);

  // Open Modal and Set Video ID
  const handleVideoClick = url => {
    const videoId = getVideoIdFromUrl(url);
    setSelectedVideoId(videoId);
    setModalVisible(true); // Show modal
  };

  // Close Modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedVideoId(null); // Reset video ID
  };

  const renderCategoryItem = ({item}) => {
    const hasMatchingSubcategories =
      item.tutorial_sub_category && item.tutorial_sub_category.length > 0;
    const showSubcategories = searchQuery !== '' && hasMatchingSubcategories;

    return (
      <TouchableOpacity
        style={TutorialStyle.categoryItem}
        onPress={() => handleCategoryClick(item)}>
        <View style={TutorialStyle.rowContainer}>
          <VectorIcon
            icon="Entypo"
            name="folder-video"
            size={20}
            color={Colors.Neon_Blue_Theme_Color}
            style={{flex: 1}}
          />
          <Text style={TutorialStyle.categoryText}>
            {item.tutorials_categories}
          </Text>
        </View>
        {showSubcategories && (
          <FlatList
            data={item.tutorial_sub_category}
            keyExtractor={(subItem, index) => index.toString()}
            renderItem={({item: subItem}) => {
              const videoId = getVideoIdFromUrl(subItem.url);
              return (
                <TouchableOpacity onPress={() => handleVideoClick(subItem.url)}>
                  <View style={TutorialStyle.subCategoryItem}>
                    <Text style={TutorialStyle.subCategoryText}>
                      {subItem.sub_category}
                    </Text>
                    {videoId ? (
                      <Image
                        source={{
                          uri: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                        }}
                        style={TutorialStyle.videoThumbnail}
                      />
                    ) : (
                      <Image
                        source={thumbnailImg}
                        style={TutorialStyle.videoThumbnail}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  const handleCategoryClick = category => {
    dispatch(GetTutorialApi(category.id));
    navigation.navigate('YoutubeVideo', {category});
  };

  return (
    <View style={TutorialStyle.container}>
      <Header notificationIcon={true} />
      <View style={{marginTop: 10, marginHorizontal: 8}}>
        <Text style={TutorialStyle.title}>Tutorials</Text>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          placeholder="Search for Tutorials"
          handleClear={handleClear}
        />
      </View>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={TutorialStyle.contentContainer}>
        {filteredCategories?.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={TutorialStyle.noCategoryText}>No category found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredCategories}
            renderItem={renderCategoryItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            keyboardShouldPersistTaps="always"
            scrollEnabled={false}
            numColumns={1}
            ListFooterComponent={() => <View style={{height: 20}} />}
          />
        )}
      </ScrollView>
      {/* Modal to show YouTube Player */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}>
        <View style={TutorialStyle.modalContainer}>
          <View style={TutorialStyle.modalContent}>
            <YoutubePlayer
              height={199}
              width="100%"
              videoId={selectedVideoId}
              play={true}
              onChangeState={event => console.log(event)}
            />
          </View>
          <TouchableOpacity
            style={TutorialStyle.closeButtonContainer}
            onPress={() => setModalVisible(false)}>
            <Text style={TutorialStyle.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Tutorials;
