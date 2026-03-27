import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import {
  IMAGE_BASE_URL,
  quote_image_path,
  swms_image_path,
} from '../../../Redux/NWConfig';
import Colors from '../../../Assets/Style/Color';
import Header from '../../../ReusableComponent/Header';
import {placeHolderImage} from '../../../Assets/Images';
import QuoteViewStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/QuoteQuoteViewStyle';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const QuoteView = ({route}) => {
  const [largeImage, setLargeImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const {selectedQuote} = route.params;
  const navigation = useNavigation();
  const {InvoiceList} = useSelector(state => state.InvoiceList);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const loadLargeImage = async () => {
      if (selectedQuote?.id) {
        const img = selectedQuote?.image[0]?.path;
        const imgUrl = quote_image_path + img;
        console.log(imgUrl, 'imgUrl');
        
        setLargeImage(imgUrl);
      }
    };
    loadLargeImage();
  }, [selectedQuote]);

  const handleImageTap = imageUrl => {
    setLargeImage(imageUrl);
    setShowModal1(true);
  };

  const formatDate = date => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const capitalizeFirstLetter = str => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSchedulePress = () => {
    navigation.navigate('Schedule', {customer: selectedQuote});
  };

  const handleDownloadPress = () => {
    const rawPath = selectedQuote?.pdf_path;
    if (!rawPath) {
      return;
    }
    console.log(rawPath, 'rawPath');
    
  
    const cleanedPath = rawPath.replace("app/public/", "");
    const fileName = cleanedPath.split('/').pop();
    const finalUrl = `${IMAGE_BASE_URL}${fileName}`;
    const googleDocUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(finalUrl)}`;
  
    console.log(googleDocUrl, 'googleDocUrl');
  
    // Set PDF URL for your modal viewer
    setPdfUrl(googleDocUrl);
    setShowModal(true);
  
    // setTimeout(() => {
    //   setShowModal(false);
    // }, 2000);
  };
  

  const renderJobPrice = jobList => {
    return jobList.map((job, index) => (
      <View
        style={[QuoteViewStyle.cardRow, index !== jobList.length - 1]}
        key={index}>
        {index === 0 && (
          <>
            <View style={QuoteViewStyle.cardItem}>
              <Text style={QuoteViewStyle.cardLabel}>Job</Text>
              <Text style={QuoteViewStyle.cardValue1}>{job.job}</Text>
            </View>
            <View style={QuoteViewStyle.cardItem}>
              <Text style={QuoteViewStyle.cardLabel}>Price</Text>
              <Text style={QuoteViewStyle.cardValue1}>{`${job.price} $`}</Text>
            </View>
          </>
        )}
        {index !== 0 && (
          <View style={QuoteViewStyle.cardItem}>
            <Text style={QuoteViewStyle.cardValue1}>{job.job}</Text>
          </View>
        )}
        {index !== 0 && (
          <View style={QuoteViewStyle.cardItem}>
            <Text style={QuoteViewStyle.cardValue1}>{`${job.price} $`}</Text>
          </View>
        )}
      </View>
    ));
  };

  const renderSWMS = swmsList => {
    return swmsList.map((swms, index) => (
      <View key={index} style={QuoteViewStyle.cardBox}>
        <View style={QuoteViewStyle.cardRow}>
          <View style={QuoteViewStyle.cardItem1}>
            <Text style={QuoteViewStyle.cardLabel}>Hazard</Text>
            <Text style={QuoteViewStyle.cardValue1}>{swms.hazard}</Text>
          </View>
          <View style={QuoteViewStyle.cardItem1}>
            <Text style={QuoteViewStyle.cardLabel}>Risk Level</Text>
            <Text style={QuoteViewStyle.cardValue1}>{swms.risk_level}</Text>
          </View>
          <View style={QuoteViewStyle.cardItem1}>
            <Text style={QuoteViewStyle.cardLabel}>Image</Text>
            <Image
              source={{uri: swms_image_path + swms.image}}
              style={QuoteViewStyle.swmsImage}
            />
          </View>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={{flex: 1, paddingBottom: insets.bottom}}>
      <View style={QuoteViewStyle.container}>
      <Header notificationIcon={true} backButton={true} route="Quotes" />
      <ScrollView style={QuoteViewStyle.content}>
        <Text style={QuoteViewStyle.title}>Quote Details</Text>

        {/* Large Image Section */}
        {largeImage ? (
          <TouchableOpacity onPress={() => setShowModal1(true)}>
            <View style={QuoteViewStyle.imgContainer}>
              <Image source={{uri: largeImage}} style={QuoteViewStyle.img} />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={QuoteViewStyle.imgContainer}>
            <Image source={placeHolderImage} style={QuoteViewStyle.img} />
          </View>
        )}

        {/* Small Images */}
        <FlatList
          data={selectedQuote.image}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleImageTap(quote_image_path + item.path)}>
              <Image
                source={{uri: quote_image_path + item.path}}
                style={QuoteViewStyle.smallImage}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={QuoteViewStyle.smallImageContainer}
        />

        {/* Invoice, Customer, Status, etc. */}
        <View style={QuoteViewStyle.quoteItem}>
          <Text style={QuoteViewStyle.quoteLabel}>Quotation No</Text>
          <Text style={QuoteViewStyle.quotevalue}>
            {selectedQuote?.quotation_serial_no || 'N/A'}
          </Text>
        </View>
        <View style={QuoteViewStyle.cardRow}>
          <View style={QuoteViewStyle.cardItem}>
            <Text style={QuoteViewStyle.cardLabel}>Customer</Text>
            <Text style={QuoteViewStyle.cardValue1}>
              {selectedQuote?.customer_name}
            </Text>
          </View>
          <View style={QuoteViewStyle.cardItem}>
            <Text style={QuoteViewStyle.cardLabel}>Status</Text>
            <Text
              style={[
                QuoteViewStyle.cardValue1,
                {
                  color:
                    selectedQuote?.status?.toLowerCase() === 'accepted'
                      ? Colors.green_color
                      : selectedQuote?.status?.toLowerCase() === 'draft'
                      ? Colors.gray_text_color
                      : selectedQuote?.status?.toLowerCase() === 'sent'
                      ? Colors.banana_Yellow_color
                      : Colors.pink_theme_color,
                },
              ]}>
              {selectedQuote?.status}
            </Text>
          </View>
        </View>

        {/* Job & Price Section */}
        {selectedQuote?.category_type === 'commercial' &&
        selectedQuote?.commercial_job ? (
          <View>{renderJobPrice(selectedQuote.commercial_job)}</View>
        ) : selectedQuote?.category_type === 'residential' &&
          selectedQuote?.residential_job ? (
          <View>{renderJobPrice(selectedQuote.residential_job)}</View>
        ) : selectedQuote?.category_type === 'storefront' &&
          selectedQuote?.storefront_job ? (
          <View>{renderJobPrice(selectedQuote.storefront_job)}</View>
        ) : null}

        {selectedQuote.category_type === 'storefront' && (
          <>
            <View style={QuoteViewStyle.cardRow}>
              <View style={QuoteViewStyle.cardItem}>
                <Text style={QuoteViewStyle.cardLabel}>
                  Trading Hours Start
                </Text>
                <Text style={QuoteViewStyle.cardValue1}>
                  {selectedQuote?.trading_hours_start}
                </Text>
              </View>
              <View style={QuoteViewStyle.cardItem}>
                <Text style={QuoteViewStyle.cardLabel}>Trading Hours End</Text>
                <Text style={QuoteViewStyle.cardValue1}>
                  {selectedQuote?.trading_hours_end}
                </Text>
              </View>
            </View>
            <View style={QuoteViewStyle.cardRow}>
              <View style={QuoteViewStyle.cardItem}>
                <Text style={QuoteViewStyle.cardLabel}>Time Note Before</Text>
                <Text style={QuoteViewStyle.cardValue1}>
                  {selectedQuote?.time_note_before}
                </Text>
              </View>
              <View style={QuoteViewStyle.cardItem}>
                <Text style={QuoteViewStyle.cardLabel}>Time Note After</Text>
                <Text style={QuoteViewStyle.cardValue1}>
                  {selectedQuote?.time_note_after}
                </Text>
              </View>
            </View>
          </>
        )}

        <View style={QuoteViewStyle.cardRow}>
          <View style={QuoteViewStyle.cardItem}>
            <Text style={QuoteViewStyle.cardLabel}>Category</Text>
            <Text style={QuoteViewStyle.cardValue1}>
              {capitalizeFirstLetter(selectedQuote?.category_type)}
            </Text>
          </View>
          <View style={QuoteViewStyle.cardItem}>
            <Text style={QuoteViewStyle.cardLabel}>Phone</Text>
            <Text style={QuoteViewStyle.cardValue1}>
              {selectedQuote?.customer_phone}
            </Text>
          </View>
        </View>
        <View style={QuoteViewStyle.cardRow}>
          <View style={QuoteViewStyle.cardItem}>
            <Text style={QuoteViewStyle.cardLabel}>Address</Text>
            <Text style={QuoteViewStyle.cardValue1}>
              {selectedQuote?.category_address}
            </Text>
          </View>
          <View style={QuoteViewStyle.cardItem}>
            <Text style={QuoteViewStyle.cardLabel}>Email</Text>
            <Text style={QuoteViewStyle.cardValue1}>
              {selectedQuote?.customer_email}
            </Text>
          </View>
        </View>
        <View style={QuoteViewStyle.cardRow}>
          <View style={QuoteViewStyle.cardItem}>
            <Text style={QuoteViewStyle.cardLabel}>Date Created</Text>
            <Text style={QuoteViewStyle.cardValue1}>
              {selectedQuote?.created_at
                ? formatDate(selectedQuote.created_at)
                : 'N/A'}
            </Text>
          </View>
          <View style={QuoteViewStyle.cardItem}>
            <Text style={QuoteViewStyle.cardLabel}>Date Updated</Text>
            <Text style={QuoteViewStyle.cardValue1}>
              {selectedQuote?.updated_at
                ? formatDate(selectedQuote.updated_at)
                : 'N/A'}
            </Text>
          </View>
        </View>

        {selectedQuote?.category_type === 'commercial' &&
          selectedQuote?.swms && (
            <View>
              <Text style={QuoteViewStyle.title1}>
                SWMS (Safety Work Method Statements)
              </Text>
              {renderSWMS(selectedQuote.swms)}
            </View>
          )}

        <View style={[QuoteViewStyle.cardItem, {marginBottom: 40}]}>
          <Text style={QuoteViewStyle.cardLabel}>Notes</Text>
          <Text style={selectedQuote?.notes ? QuoteViewStyle.cardValue1 : QuoteViewStyle.notvalue}>
            {selectedQuote?.notes ? selectedQuote?.notes : 'No Notes Available'}
            </Text>
        </View>

        {selectedQuote?.pdf_path && selectedQuote?.pdf_path !== '' && (
          <TouchableOpacity
            onPress={handleDownloadPress}
            style={QuoteViewStyle.downloadButton}>
            <Text style={QuoteViewStyle.downloadButtonText}>View PDF</Text>
          </TouchableOpacity>
        )}
        {InvoiceList?.Invoices?.some(
          invoice =>
            invoice?.Reference === selectedQuote?.quotation_serial_no ||
            invoice?.Reference === selectedQuote?.quotation_no,
        ) ? (
          <Button
            style={QuoteViewStyle.invoicedButton}
            mode="text"
            icon="lock"
            textColor="#ffffff">
            <Text style={QuoteViewStyle.scheduleButtonText}>Invoiced</Text>
          </Button>
        ) : (
          !['declined', 'deleted'].includes(selectedQuote?.status?.toLowerCase()) && (
            <TouchableOpacity
              onPress={handleSchedulePress}
              style={QuoteViewStyle.scheduleButton}>
              <Text style={QuoteViewStyle.scheduleButtonText}>Schedule</Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Separate Download PDF Modal */}
      <Modal
  visible={showModal}
  transparent
  animationType="fade"
  onRequestClose={() => setShowModal(false)}
>
  <View style={QuoteViewStyle.modalBackground}>
    <View style={QuoteViewStyle.modalContentView}>
      <View 
      style={QuoteViewStyle.modalHeader}>
     
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Invoice Preview</Text>
        
        <TouchableOpacity onPress={() => setShowModal(false)}>
          <Text style={{ fontSize: 18, color: 'red' }}>Close</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 PDF WebView */}
      {pdfUrl !== '' && (
        <WebView
          source={{ uri: pdfUrl }}
          style={QuoteViewStyle.webViewFull}
          originWhitelist={['*']}
          javaScriptEnabled
          domStorageEnabled
        />
      )}
    </View>
  </View>
</Modal>



      {/* Separate Full Screen Image Modal */}
      <Modal
        visible={showModal1}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal1(false)}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.9)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setShowModal1(false)}>
          <Image
            source={{uri: largeImage}}
            style={{width: '90%', height: '70%', resizeMode: 'contain'}}
          />
          <TouchableOpacity
            onPress={() => setShowModal1(false)}
            style={QuoteViewStyle.scheduleButton}>
            <Text style={QuoteViewStyle.scheduleButtonText}>Close</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
    </SafeAreaView>
  );
};

export default QuoteView;
