import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Linking,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Assets/Style/Color';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../Redux/Slice/favoritesSlice';
import ImageViewer from 'react-native-image-zoom-viewer';
import { IMAGE_BASE_URL } from '../../Redux/NWConfig';

const JobDescription = ({route, navigation}) => {
  const {tradie} = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const { favorites } = useSelector(state => state.favorites);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // Status für die Sichtbarkeit des Profilbild-Viewers
  const [isProfileImageViewerVisible, setIsProfileImageViewerVisible] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (favorites && tradie?.id) {
        setIsFavorite(favorites.some(fav => fav && fav.id === tradie.id));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  }, [favorites, tradie]);


   const handleToggleFavorite = (item) => {
        dispatch(toggleFavorite(item));
      };

  const fullName = `${tradie.first_name || ''} ${
    tradie.last_name || ''
  }`.trim();
  const contactNumber = tradie.phone_primary || '';
  const email = tradie.email_primary || '';
  const workImages = tradie.workImages
    ? tradie.workImages.split(',').map(uri => `${uri}`)
    : [];

  const handleContactPress = async () => {
    await Linking.openURL(`tel:${contactNumber}`);
  };

  const handleEmailPress = async () => {
    await Linking.openURL(`mailto:${email}`);
  };

   const getFullImageUrl = (url) => {
        if (!url) return null;
      
        const parts = url.split('storage/');
        if (parts.length > 1) {
          return IMAGE_BASE_URL + parts[1];
        } else {
          return IMAGE_BASE_URL + url; // fallback
        }
      };
      

  const InfoRow = ({icon, label, value}) => (
    <View style={styles.infoRow}>
      <Icon name={icon} size={24} color={Colors.blue_theme_Color}/>
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || 'N/A'}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'#000000'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('JobListingPage')}>
          <Icon name="arrow-back" size={30} color="#EAEAEA" />
        </TouchableOpacity>
        <Text style={styles.logo}>Profile</Text>
        <TouchableOpacity onPress={() => handleToggleFavorite(tradie)}>
          <Icon name={isFavorite ? "favorite" : "favorite-border"} size={30} color={isFavorite ? "red" : "#EAEAEA"} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => setIsProfileImageViewerVisible(true)}>
            <Image
            source={{uri: getFullImageUrl(tradie.logo)}}
            style={styles.profilePhoto}
            />
        </TouchableOpacity>

        <Text style={styles.tradieName}>{fullName}</Text>

        <View style={styles.ratingContainer}>
          <Icon name="star" size={20} color="#f39c12" />
          <Text style={styles.ratingText}>
            {Number(tradie.rating || 0).toFixed(1)} Rating
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <InfoRow icon="work" label="Trade" value={tradie.trade} />
          <InfoRow icon="location-on" label="Suburb" value={tradie.suburb} />
          <InfoRow icon="phone" label="Contact" value={contactNumber} />
          <InfoRow icon="email" label="Email" value={email} />
          <InfoRow icon="business" label="ABN" value={tradie.ABN} />
          <InfoRow icon="link" label="Website" value={tradie.business_site} />
          <InfoRow icon="receipt" label="GST Status" value={tradie.GST} />
        </View>

        <View style={styles.portfolioContainer}>
          <Text style={styles.portfolioTitle}>Our Work</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {workImages.length > 0 ? (
             workImages.map((uri, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedImageIndex(index);
                  setIsImageViewerVisible(true);
                }}>
                <Image source={{ uri : getFullImageUrl(uri)}} style={styles.workImage} />
              </TouchableOpacity>
            ))

            ) : (
              <Text style={{color: '#A9A9A9', paddingHorizontal: 20}}>
                No work images uploaded
              </Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleContactPress}>
          <Icon name="phone" size={20} color="#fff" />
          <Text style={styles.contactButtonText}>
            Contact {tradie.first_name || 'Tradie'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contactButton, styles.emailButton]}
          onPress={handleEmailPress}>
          <Icon name="email" size={20} color="#fff" />
          <Text style={styles.contactButtonText}>
            Email {tradie.first_name || 'Tradie'}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isImageViewerVisible} transparent={true}>
  <ImageViewer
    imageUrls={workImages.map(uri => ({ url: getFullImageUrl(uri) }))}
    index={selectedImageIndex}
    enableSwipeDown
    onSwipeDown={() => setIsImageViewerVisible(false)}
    onCancel={() => setIsImageViewerVisible(false)}
    saveToLocalByLongPress={false}
    backgroundColor="#000"
  />
  <TouchableOpacity
    style={styles.closeButton}
    onPress={() => setIsImageViewerVisible(false)}>
    <Icon name="close" size={28} color="#fff" />
  </TouchableOpacity>
</Modal>

{/* Modal für das Profilbild */}
<Modal visible={isProfileImageViewerVisible} transparent={true}>
    <ImageViewer
        imageUrls={[{ url: getFullImageUrl(tradie.logo) }]}
        enableSwipeDown
        onSwipeDown={() => setIsProfileImageViewerVisible(false)}
        onCancel={() => setIsProfileImageViewerVisible(false)}
        saveToLocalByLongPress={false}
        backgroundColor="#000"
    />
    <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setIsProfileImageViewerVisible(false)}>
        <Icon name="close" size={28} color="#fff" />
    </TouchableOpacity>
</Modal>


    </SafeAreaView>
  );
};

export default JobDescription;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#000000'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {fontSize: 24, fontWeight: 'bold', color: '#EAEAEA'},
  scrollContainer: {paddingBottom: 20, alignItems: 'center'},
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: Colors.blue_theme_Color,
    marginTop: 20,
  },
  tradieName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#EAEAEA',
    marginTop: 15,
  },
  ratingContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#A9A9A9',
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    marginTop: 25,
  },
  infoRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 20},
  infoTextContainer: {marginLeft: 15},
  infoLabel: {fontSize: 14, color: '#A9A9A9'},
  infoValue: {fontSize: 16, color: '#EAEAEA', fontWeight: '600'},
  footer: {
    padding: 20,
    borderTopWidth: 1,
    marginBottom: 30,
    borderTopColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactButton: {
    backgroundColor: Colors.blue_theme_Color,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  emailButton: {
    backgroundColor: '#2ecc71',
    marginLeft: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  portfolioContainer: {width: '100%', marginTop: 25},
  portfolioTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EAEAEA',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  workImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginLeft: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },

});