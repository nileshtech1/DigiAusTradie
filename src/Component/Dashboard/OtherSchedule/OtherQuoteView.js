import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button
} from 'react-native';
import Colors from '../../../Assets/Style/Color';
import { placeHolderImage } from '../../../Assets/Images';
import { quote_image_path, swms_image_path } from '../../../Redux/NWConfig';
import OtherQuoteQuoteViewStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/OtherQuoteQuoteViewStyle';

const OtherQuoteModal = ({ visible, onClose, selectedQuote }) => {
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    if (selectedQuote?.id) {
      const img = selectedQuote?.image[0]?.path;
      const imgUrl = quote_image_path + img;
      setLargeImage(imgUrl);
    }
  }, [selectedQuote]);

  const handleImageTap = (imageUrl) => {
    setLargeImage(imageUrl);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const renderJobPrice = (jobList) => {
    return jobList.map((job, index) => (
      <View key={index} style={OtherQuoteQuoteViewStyle.cardRow}>
        <View style={OtherQuoteQuoteViewStyle.cardItem}>
          {index === 0 && <Text style={OtherQuoteQuoteViewStyle.cardLabel}>Job</Text>}
          <Text style={OtherQuoteQuoteViewStyle.cardValue1}>{job.job}</Text>
        </View>
        <View style={OtherQuoteQuoteViewStyle.cardItem}>
          {index === 0 && <Text style={OtherQuoteQuoteViewStyle.cardLabel}>Price</Text>}
          <Text style={OtherQuoteQuoteViewStyle.cardValue1}>{`${job.price} $`}</Text>
        </View>
      </View>
    ));
  };

  const renderSWMS = (swmsList) => {
    return swmsList.map((swms, index) => (
      <View key={index} style={OtherQuoteQuoteViewStyle.cardBox}>
        <View style={OtherQuoteQuoteViewStyle.cardRow}>
          <View style={OtherQuoteQuoteViewStyle.cardItem1}>
            <Text style={OtherQuoteQuoteViewStyle.cardLabel}>Hazard</Text>
            <Text style={OtherQuoteQuoteViewStyle.cardValue1}>{swms.hazard}</Text>
          </View>
          <View style={OtherQuoteQuoteViewStyle.cardItem1}>
            <Text style={OtherQuoteQuoteViewStyle.cardLabel}>Risk Level</Text>
            <Text style={OtherQuoteQuoteViewStyle.cardValue1}>{swms.risk_level}</Text>
          </View>
          <View style={OtherQuoteQuoteViewStyle.cardItem1}>
            <Text style={OtherQuoteQuoteViewStyle.cardLabel}>Image</Text>
            <Image source={{ uri: swms_image_path + swms.image }} style={OtherQuoteQuoteViewStyle.swmsImage} />
          </View>
        </View>
      </View>
    ));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={OtherQuoteQuoteViewStyle.modalContainer}>
        <View style={OtherQuoteQuoteViewStyle.modalContent}>
   

          <ScrollView style={OtherQuoteQuoteViewStyle.content} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
            <Text style={OtherQuoteQuoteViewStyle.title}>Quote Details</Text>

            {/* Large Image */}
            {largeImage ? (
              <View style={OtherQuoteQuoteViewStyle.imgContainer}>
                <Image source={{ uri: largeImage }} style={OtherQuoteQuoteViewStyle.img} />
              </View>
            ) : (
              <View style={OtherQuoteQuoteViewStyle.imgContainer}>
                <Image source={placeHolderImage} style={OtherQuoteQuoteViewStyle.img} />
              </View>
            )}

            {/* Small Images */}
            <FlatList
              data={selectedQuote.image}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleImageTap(quote_image_path + item.path)}>
                  <Image source={{ uri: quote_image_path + item.path }} style={OtherQuoteQuoteViewStyle.smallImage} />
                </TouchableOpacity>
              )}
              contentContainerStyle={OtherQuoteQuoteViewStyle.smallImageContainer}
            />

            {/* Quotation Details */}
            <View style={OtherQuoteQuoteViewStyle.quoteItem}>
              <Text style={OtherQuoteQuoteViewStyle.quoteLabel}>Quotation No</Text>
              <Text style={OtherQuoteQuoteViewStyle.quotevalue}>{selectedQuote?.quotation_serial_no || 'N/A'}</Text>
            </View>

            {/* Customer Details */}
            <View style={OtherQuoteQuoteViewStyle.cardRow}>
              <View style={OtherQuoteQuoteViewStyle.cardItem}>
                <Text style={OtherQuoteQuoteViewStyle.cardLabel}>Customer</Text>
                <Text style={OtherQuoteQuoteViewStyle.cardValue1}>{selectedQuote?.customer_name}</Text>
              </View>
              <View style={OtherQuoteQuoteViewStyle.cardItem}>
                <Text style={OtherQuoteQuoteViewStyle.cardLabel}>Phone</Text>
                <Text style={OtherQuoteQuoteViewStyle.cardValue1}>{selectedQuote?.customer_phone}</Text>
              </View>
            </View>

            {/* Job & Pricing Details */}
            {selectedQuote?.category_type === 'commercial' && selectedQuote?.commercial_job && (
              <View>{renderJobPrice(selectedQuote.commercial_job)}</View>
            )}
            {selectedQuote?.category_type === 'residential' && selectedQuote?.residential_job && (
              <View>{renderJobPrice(selectedQuote.residential_job)}</View>
            )}
            {selectedQuote?.category_type === 'storefront' && selectedQuote?.storefront_job && (
              <View>{renderJobPrice(selectedQuote.storefront_job)}</View>
            )}

            {/* SWMS (Safety Work Method Statements) */}
            {selectedQuote?.category_type === 'commercial' && selectedQuote?.swms && (
              <View>
                <Text style={OtherQuoteQuoteViewStyle.title1}>SWMS (Safety Work Method Statements)</Text>
                {renderSWMS(selectedQuote.swms)}
              </View>
            )}

            {/* Other Details */}
            <View style={OtherQuoteQuoteViewStyle.cardRow}>
              <View style={OtherQuoteQuoteViewStyle.cardItem}>
                <Text style={OtherQuoteQuoteViewStyle.cardLabel}>Category</Text>
                <Text style={OtherQuoteQuoteViewStyle.cardValue1}>{selectedQuote?.category_type}</Text>
              </View>
              <View style={OtherQuoteQuoteViewStyle.cardItem}>
                <Text style={OtherQuoteQuoteViewStyle.cardLabel}>Email</Text>
                <Text style={OtherQuoteQuoteViewStyle.cardValue1}>{selectedQuote?.customer_email}</Text>
              </View>
            </View>

            {/* Date Details */}
            <View style={OtherQuoteQuoteViewStyle.cardRow}>
              <View style={OtherQuoteQuoteViewStyle.cardItem}>
                <Text style={OtherQuoteQuoteViewStyle.cardLabel}>Date Created</Text>
                <Text style={OtherQuoteQuoteViewStyle.cardValue1}>
                  {selectedQuote?.created_at ? formatDate(selectedQuote.created_at) : 'N/A'}
                </Text>
              </View>
              <View style={OtherQuoteQuoteViewStyle.cardItem}>
                <Text style={OtherQuoteQuoteViewStyle.cardLabel}>Date Updated</Text>
                <Text style={OtherQuoteQuoteViewStyle.cardValue1}>
                  {selectedQuote?.updated_at ? formatDate(selectedQuote.updated_at) : 'N/A'}
                </Text>
              </View>
            </View>

            {/* Notes Section */}
            <View style={[OtherQuoteQuoteViewStyle.cardItem, { marginBottom: 40 }]}>
              <Text style={OtherQuoteQuoteViewStyle.cardLabel}>Notes</Text>
              <Text style={OtherQuoteQuoteViewStyle.cardValue1}>{selectedQuote?.notes}</Text>
            </View>

          </ScrollView>
                 {/* Close Button */}
                 <Button title="Close" onPress={onClose} color={Colors.pink_theme_color} />
        </View>
      </View>
    </Modal>
  );
};

export default OtherQuoteModal;
