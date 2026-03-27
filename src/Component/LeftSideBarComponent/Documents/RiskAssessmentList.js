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

const RiskAssessmentList = ({route}) => {
  const navigation = useNavigation();
  const {category} = route?.params || {};
  const [pdfLink, setPdfLink] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const {RiskAssessmentDoc} = useSelector(state => state.JHGroupDoc);

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const filteredResults = useMemo(() => {
    const data = Array.isArray(RiskAssessmentDoc?.data)
      ? RiskAssessmentDoc.data
      : [];

    return data.filter(item =>
      item['File Name']?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, RiskAssessmentDoc]);

  const getThumbnailUrl = () => {
    return 'https://cdn-icons-png.flaticon.com/128/337/337946.png';
  };

  const openDocumentLink = link => {
    setPdfLink(link);
    navigation.navigate('PdfViewRisk', {pdfLink: link});
  };

  const renderDocumentItem = ({item}) => (
    <View style={DocumentListStyle.documentItem}>
      {/* Show File Name */}
      <Text style={DocumentListStyle.documentTitle}>{item['File Name']}</Text>

      {/* Button to open document */}
      <TouchableOpacity
        style={{flex: 0.2}}
        onPress={() => openDocumentLink(item['View Link'])}>
        <Image
          source={{uri: getThumbnailUrl()}}
          style={DocumentListStyle.documentImage}
        />
      </TouchableOpacity>
    </View>
  );

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
            keyExtractor={item => item['File ID']}
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
              <View style={{width: 300, height: 400}}>
                <WebView source={{uri: pdfLink}} style={{flex: 1}} />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RiskAssessmentList;
