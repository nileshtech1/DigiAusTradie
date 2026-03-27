import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import Header from '../../../ReusableComponent/Header';
import Colors from '../../../Assets/Style/Color';
import SearchBar from '../../../ReusableComponent/SearchBar';
import {useNavigation} from '@react-navigation/native';
import DocumentListStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/DocumentListStyle';
import {useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';

const DocumentList = ({route}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {category} = route?.params || {};
  const navigation = useNavigation();
  const {DocumentList} = useSelector(state => state.DocumentList);
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfLink, setPdfLink] = useState('');
  const [downloading, setDownloading] = useState(false);

  // Filter documents by category
  const filteredDocuments = useMemo(() => {
    return DocumentList?.data?.filter(item => item.category === category) || [];
  }, [DocumentList, category]);

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const filteredResults = useMemo(() => {
    return filteredDocuments.filter(item =>
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, filteredDocuments]);

  const getThumbnailUrl = () => {
    return 'https://cdn-icons-png.flaticon.com/128/337/337946.png';
  };

  const renderDocumentItem = ({item}) => {
    return (
      <View style={DocumentListStyle.documentItem}>
        <Text style={DocumentListStyle.documentTitle}>{item.description}</Text>
        <TouchableOpacity
          style={{flex: 0.2}}
          onPress={() => openDocumentLink(item.file)}>
          <Image
            source={{uri: getThumbnailUrl()}}
            style={DocumentListStyle.documentImage}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const openDocumentLink = link => {
    setPdfLink(link);
    setDownloading(true);
    setModalVisible(true);
    setTimeout(() => {
      setDownloading(false);
    }, 2000);
    setTimeout(() => {
      setModalVisible(false);
    }, 2500);
  };

  return (
    <View style={DocumentListStyle.container}>
      <Header notificationIcon={true} backButton={true} route="Documents" />
      <View style={{marginVertical: 10, marginHorizontal: 15}}>
        {category && (
          <Text style={DocumentListStyle.categoryName}>{category}</Text>
        )}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleClear={handleClear}
          onSearch={handleSearch}
          placeholder="Search for Documents"
        />
      </View>
      <View style={DocumentListStyle.contentContainer}>
        {filteredResults.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={DocumentListStyle.noCategoryText}>
              No Document found
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredResults}
            renderItem={renderDocumentItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={DocumentListStyle.flatListContainer}
          />
        )}
      </View>
      {/* WebView Modal */}
      <Modal visible={modalVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            {downloading ? (
              <>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={{marginTop: 10}}>Downloading...</Text>
              </>
            ) : (
              <View style={{width: 10, height: 10}}>
                <WebView
                  source={{uri: pdfLink}}
                  style={{width: 50, height: 20}}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DocumentList;
