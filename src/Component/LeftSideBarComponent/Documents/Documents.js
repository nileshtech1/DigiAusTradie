import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { pick, types } from '@react-native-documents/picker';
import Header from '../../../ReusableComponent/Header';
import SearchBar from '../../../ReusableComponent/SearchBar';
import Colors from '../../../Assets/Style/Color';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import DropdownWithIconInput from '../../../ReusableComponent/DropdownWithIconInput';
import {CreateDocumentApi} from '../../../Redux/API/CreateDocumentApi';
import DocumentStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/DocumentStyle';
import {GetDocumentListApi} from '../../../Redux/API/GetDocumentListApi';
import DocumentListStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/DocumentListStyle';
import WebView from 'react-native-webview';

const Documents = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [source, setSource] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectDropdownVisible, setSelectDropdownVisible] = useState(false);
  const {LoginData} = useSelector(state => state.Login);
  const {DocumentList} = useSelector(state => state.DocumentList);
  const {FranchiseDoc, RiskAssessmentDoc} = useSelector(
    state => state.JHGroupDoc,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfLink, setPdfLink] = useState('');
  const [downloading, setDownloading] = useState(false);
  const dispatch = useDispatch();

  const documentCategories = useMemo(() => {
    const dynamicCategories = [
      ...new Set(DocumentList?.data?.map(doc => doc.category)),
    ];
    const staticCategories = [
      'Risk Assessment',
      'Franchise Documents',
      'Other',
    ];
    return [...new Set([...staticCategories, ...dynamicCategories])];
  }, [DocumentList]);

  const handleSearch = query => setSearchQuery(query);
  const handleClear = () => setSearchQuery('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = LoginData.token;
        const id = LoginData?.user?.id;

        const franchiseid = {
          franchise_id: id,
        };

        await dispatch(GetDocumentListApi({token, franchiseid}));
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        // console.log('done');
      }
    };

    fetchData();
  }, []);

  const filteredItems = useMemo(() => {
    const categoryMatches = documentCategories
      .filter(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(cat => ({type: 'category', title: cat}));

    const documentMatches =
      searchQuery.trim() === ''
        ? []
        : (FranchiseDoc?.data || [])
            .filter(doc =>
              doc['File Name']
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
            )
            .map(doc => ({
              type: 'document',
              title: doc['File Name'],
              data: doc,
            }));

    const RiskdocumentMatches =
      searchQuery.trim() === ''
        ? []
        : (RiskAssessmentDoc?.data || [])
            .filter(doc =>
              doc['File Name']
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
            )
            .map(doc => ({
              type: 'riskdocument',
              title: doc['File Name'],
              data: doc,
            }));

    const businessDocMatches =
      searchQuery.trim() === ''
        ? []
        : (DocumentList?.data || [])
            .filter(
              doc =>
                doc.category === 'Business Docs' &&
                doc.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            )
            .map(doc => ({
              type: 'businessdoc',
              title: doc.description,
              data: doc,
            }));

    const solarDocMatches =
      searchQuery.trim() === ''
        ? []
        : (DocumentList?.data || [])
            .filter(
              doc =>
                doc.category === 'Solar Reports' &&
                doc.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            )
            .map(doc => ({
              type: 'solardoc',
              title: doc.description,
              data: doc,
            }));

    return [
      ...categoryMatches,
      ...documentMatches,
      ...RiskdocumentMatches,
      ...businessDocMatches,
      ...solarDocMatches,
    ];
  }, [
    searchQuery,
    documentCategories,
    FranchiseDoc,
    RiskAssessmentDoc,
    DocumentList,
  ]);

  const handleCategoryPress = category => {
    if (category === 'Risk Assessment') {
      navigation.navigate('RiskAssessmentList', {category});
    } else if (category === 'Franchise Documents') {
      navigation.navigate('FranchiseDocumentList', {category});
    } else {
      navigation.navigate('DocumentList', {category});
    }
  };

  const openDocumentLink = link => {
    navigation.navigate('PdfViewDoc', {pdfLink: link});
  };
  const openDocumentLink1 = link => {
    navigation.navigate('PdfViewRiskDoc', {pdfLink: link});
  };
  const getThumbnailUrl = () => {
    return 'https://cdn-icons-png.flaticon.com/128/337/337946.png';
  };

  const openDocumentLink2 = link => {
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

  const renderItem = ({item}) => {
    if (item.type === 'category') {
      return (
        <TouchableOpacity
          style={DocumentStyle.card}
          onPress={() => handleCategoryPress(item.title)}>
          <VectorIcon
            icon="Entypo"
            name="folder"
            size={20}
            color={Colors.Neon_Blue_Theme_Color}
          />
          <Text style={DocumentStyle.cardText}>{item.title}</Text>
        </TouchableOpacity>
      );
    } else if (item.type === 'document') {
      return (
        <View style={DocumentListStyle.documentItem}>
          <Text style={DocumentListStyle.documentTitle}>{item.title}</Text>
          <TouchableOpacity
            style={{flex: 0.2}}
            onPress={() => openDocumentLink(item.data['View Link'])}>
            <Image
              source={{uri: getThumbnailUrl()}}
              style={DocumentListStyle.documentImage}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (item.type === 'riskdocument') {
      return (
        <View style={DocumentListStyle.documentItem}>
          <Text style={DocumentListStyle.documentTitle}>{item.title}</Text>
          <TouchableOpacity
            style={{flex: 0.2}}
            onPress={() => openDocumentLink1(item.data['View Link'])}>
            <Image
              source={{uri: getThumbnailUrl()}}
              style={DocumentListStyle.documentImage}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (item.type === 'businessdoc') {
      return (
        <View style={DocumentListStyle.documentItem}>
          <Text style={DocumentListStyle.documentTitle}>{item.title}</Text>
          <TouchableOpacity
            style={{flex: 0.2}}
            onPress={() => openDocumentLink2(item.data.file)}>
            <Image
              source={{uri: getThumbnailUrl()}}
              style={DocumentListStyle.documentImage}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (item.type === 'solardoc') {
      return (
        <View style={DocumentListStyle.documentItem}>
          <Text style={DocumentListStyle.documentTitle}>{item.title}</Text>
          <TouchableOpacity
            style={{flex: 0.2}}
            onPress={() => openDocumentLink2(item.data.file)}>
            <Image
              source={{uri: getThumbnailUrl()}}
              style={DocumentListStyle.documentImage}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const handleUploadNew = async () => {
    try {
      const res = await pick({
        types: [types.allFiles], // ya types.pdf, types.images, etc
      });
  
      // Note: res is a single file object, not an array
      setSelectedDocument(res);
  
      console.log('Selected file:', res);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('User cancelled the picker');
      } else {
        console.error('Error picking document', err);
      }
    }
  };

  const handleAddDocument = async () => {
    setIsUploading(true);
    const id = LoginData?.user?.id;
    const token = LoginData.token;
    const franchiseid = {
      franchise_id: id,
    };

    const formData = new FormData();
    formData.append('franchise_id', id);
    formData.append('category', source);
    formData.append('description', documentName);
    if (selectedDocument) {
      formData.append('file', selectedDocument);
    }
    dispatch(CreateDocumentApi(formData)).then(res => {
      if (res?.payload?.status === true) {
        setIsUploading(false);
        alert('Document uploaded successfully!');
        setIsModalVisible(false);
        dispatch(GetDocumentListApi({token, franchiseid}));
      }
    });
  };

  return (
    <View style={DocumentStyle.container}>
      <Header notificationIcon={true} />
      <View style={{marginTop: 10, paddingHorizontal: 20}}>
        <Text style={DocumentStyle.title}>Document Categories</Text>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          handleClear={handleClear}
          placeholder="Search for Document"
        />
      </View>
      <View style={{paddingHorizontal: 20}}>
        <View style={DocumentStyle.categoriesContainer}>
          {filteredItems.length === 0 ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={DocumentStyle.noCategoryText}>No results found</Text>
            </View>
          ) : (
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
        <TouchableOpacity
          style={DocumentStyle.button}
          onPress={() => setIsModalVisible(true)}>
          <Text style={DocumentStyle.buttonText}>Upload New</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={DocumentStyle.modalOverlay}>
          <Pressable style={DocumentStyle.modalContent}>
            <Text style={DocumentStyle.modalTitle}>Upload New Document</Text>
            <DropdownWithIconInput
              label="Document Category"
              placeholder="Select Document Category"
              value={source}
              placeholderTextColor={Colors.gray_html_color}
              selectDropdownVisible={selectDropdownVisible}
              setSelectDropdownVisible={setSelectDropdownVisible}
              onChangeText={setSource}
              toggleDropdown={() =>
                setSelectDropdownVisible(!selectDropdownVisible)
              }
              iconName="file"
              dropdownList={documentCategories}
              onSelect={setSource}
            />
            <TextInput
              style={DocumentStyle.documentNameInput}
              placeholder="Description"
              placeholderTextColor={Colors.gray_html_color}
              value={documentName}
              onChangeText={setDocumentName}
            />
            <TouchableOpacity
              style={DocumentStyle.selectFileButton}
              onPress={handleUploadNew}>
              <VectorIcon
                icon="Entypo"
                name="folder"
                size={20}
                color={'#fff'}
              />
              <Text style={DocumentStyle.buttonText}>Select Document</Text>
            </TouchableOpacity>
            {selectedDocument ? (
              <Text style={DocumentStyle.selectedFile}>
                Selected: {selectedDocument.name}
              </Text>
            ) : (
              <Text style={DocumentStyle.selectedFile}>
                No document selected
              </Text>
            )}
            <View style={{flexDirection: 'row'}}>
              {isUploading ? (
                <Text style={DocumentStyle.waitText}>Please wait...</Text>
              ) : (
                <>
                  <TouchableOpacity
                    style={DocumentStyle.cancelButton}
                    onPress={() => setIsModalVisible(false)}>
                    <Text style={DocumentStyle.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={DocumentStyle.uploadButton}
                    onPress={handleAddDocument}>
                    <Text style={DocumentStyle.buttonText}>Add Document</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </Pressable>
        </View>
      </Modal>
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

export default Documents;
