import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Linking } from 'react-native';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import Colors from '../../../Assets/Style/Color'; // Your colors file
import { IMAGE_BASE_URL } from '../../../Redux/NWConfig';

const ProfileInfoSection = ({ userData, onEditProfile, onLinkPress }) => {
  const workImageArray = userData?.workImages
    ? userData.workImages.split(',').map(img => img.trim())
    : [];

  const handleLinkPress = (url) => {
    if (url) {
      const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
      onLinkPress(fullUrl); // Use the passed onLinkPress handler
    }
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
  

  const InfoRow = ({ icon, label, content, isLink = false }) => {
    if (!content) return null;

    return (
      <TouchableOpacity onPress={() => isLink && handleLinkPress(content)} disabled={!isLink}>
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <VectorIcon name={icon} icon="FontAwesome" size={18} color={Colors.blue_theme_Color} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={[styles.infoContent, isLink && styles.linkText]}>{content}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      {/* --- Main Edit Header for this Section --- */}
      <View style={styles.sectionHeader}>
        <Text style={styles.mainTitle}>Profile Details</Text>
        <TouchableOpacity style={styles.iconContainer} onPress={onEditProfile}>
          <VectorIcon name="edit" icon="FontAwesome" size={22} color={Colors.blue_theme_Color} />
        </TouchableOpacity>
      </View>

      {/* --- About Section --- */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>{userData?.about || 'No details provided.'}</Text>
      </View>

      {/* --- Business Details Section --- */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Business Details</Text>
        <InfoRow icon="building" label="Business Name" content={userData?.business_name} />
        <InfoRow icon="wrench" label="Trade Type" content={userData?.trade} />
        <InfoRow icon="id-card" label="ABN" content={userData?.ABN} />
        <InfoRow icon="check-circle" label="GST" content={userData?.GST} />
        <InfoRow icon="money" label="Hourly Rate" content={userData?.rate ? `$${userData.rate}` : 'N/A'} />
        <InfoRow icon="file-text-o" label="Experience" content={userData?.work_experience ? `${userData.work_experience} years` : 'N/A'} />
        <InfoRow icon="star" label="Rating" content={userData?.rating?.toString()} />
      </View>

      {/* --- Contact Info Section --- */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <InfoRow icon="envelope" label="Email" content={userData?.email_primary} />
        <InfoRow icon="phone" label="Phone" content={userData?.phone_primary} />
        <InfoRow icon="map-marker" label="Location" content={userData?.suburb} />
        <InfoRow
            icon="link"
            label="Google My Website"
            content={userData?.business_site}
            isLink={true}
        />
      </View>

      {workImageArray.length > 0 && (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>Work Portfolio</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {workImageArray.map((url, index) => (
        <Image
          key={index}
          source={{ uri: getFullImageUrl(url) }}
          style={styles.workImage}
        />
      ))}
    </ScrollView>
  </View>
)}

    </View>
  );
};

// Styles for ProfileInfoSection
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white_text_color,
  },
  sectionContainer: {
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray_html_color,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E7F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.gray_html_color,
  },
  infoContent: {
    fontSize: 16,
    color: Colors.white_text_color,
    fontWeight: '500',
  },
  linkText: {
    color: Colors.blue_theme_Color,
    textDecorationLine: 'underline',
  },
  aboutText: {
    fontSize: 16,
    color: Colors.white_text_color,
    lineHeight: 24,
  },
  workImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  editButton: {
    padding: 10,
    backgroundColor: Colors.white_text_color,
    borderRadius: 20,
  },
});

export default ProfileInfoSection;