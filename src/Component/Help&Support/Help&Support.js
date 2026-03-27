import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import Header from '../../ReusableComponent/Header';
import Colors from '../../Assets/Style/Color';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HelpSupport = () => {
  const { HelpSupportData } = useSelector(state => state.HelpSupport);
  const insets = useSafeAreaInsets();

  const handleEmailPress = email => Linking.openURL(`mailto:${email}`);
  const handlePhonePress = phone => Linking.openURL(`tel:${phone}`);
  const handleWebsitePress = url => Linking.openURL(url);

  const handleAddressPress = address => {
    const encodedAddress = encodeURIComponent(address);
    const mapUrl = Platform.select({
      ios: `maps:0,0?q=${encodedAddress}`,
      android: `geo:0,0?q=${encodedAddress}`,
    });

    Linking.openURL(mapUrl).catch(err =>
      console.error('An error occurred opening the map', err)
    );
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header backButton={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >

        {/* Header Section */}
        <View style={styles.headerSection}>
        <Icon name="support-agent" size={50} color={Colors.white_text_color} />
          <Text style={styles.mainHeading}>How can we help?</Text>
          <Text style={styles.subtitle}>
            Connect with our support team for questions or issues.
          </Text>
        </View>

        {/* Branch Cards */}
        <View style={styles.section}>
          {HelpSupportData?.Data?.length > 0 ? (
            HelpSupportData.Data.map(branch => (
              <View key={branch.id} style={styles.branchCard}>

                {/* Company Name */}
                <Text style={styles.branchTitle}>
                  Company Name: {branch.name}
                </Text>

                {/* Email */}
                <TouchableOpacity
                  onPress={() => handleEmailPress(branch.email)}
                  style={styles.labelRow}
                >
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.value}>{branch.email}</Text>
                </TouchableOpacity>

                {/* Phone */}
                <TouchableOpacity
                  onPress={() => handlePhonePress(branch.contact)}
                  style={styles.labelRow}
                >
                  <Text style={styles.label}>Phone:</Text>
                  <Text style={styles.value}>{branch.contact}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.labelRow}
                >
                  <Text style={styles.label}>ABN:</Text>
                  <Text style={styles.value}>{branch.abn}</Text>
                </TouchableOpacity>

                {/* Office Address */}
                <TouchableOpacity
                  onPress={() => handleAddressPress(branch.office_address)}
                  style={styles.labelRow}
                >
                  <Text style={styles.label}>Office Address:</Text>
                  <Text style={styles.value}>{branch.office_address}</Text>
                </TouchableOpacity>

                {/* Registered Address */}
                <TouchableOpacity
                  onPress={() => handleAddressPress(branch.registered_address)}
                  style={styles.labelRow}
                >
                  <Text style={styles.label}>Registered Address:</Text>
                  <Text style={styles.value}>{branch.registered_address}</Text>
                </TouchableOpacity>

                {/* Website */}
                <TouchableOpacity
                  onPress={() => handleWebsitePress(branch.website)}
                  style={styles.labelRow}
                >
                  <Text style={styles.label}>Website:</Text>
                  <Text style={styles.value}>{branch.website}</Text>
                </TouchableOpacity>

              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No branch information available at the moment.
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0B10',
  },
  scrollViewContent: {
    paddingBottom: 40,
  },

  /* Header */
  headerSection: {
    margin: 20,
    padding: 25,
    borderRadius: 18,
    backgroundColor: Colors.grey_bg_Color,
    alignItems: 'center',
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: '#A5A5B4',
    textAlign: 'center',
    lineHeight: 22,
  },

  /* Section */
  section: {
    paddingHorizontal: 20,
  },

  /* Branch Card */
  branchCard: {
    backgroundColor: Colors.grey_bg_Color,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2D3A',
  },
  branchTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EAEAEA',
    marginBottom: 15,
  },

  /* Label-Value Rows */
  labelRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#CFCFD8',
  },
  value: {
    fontSize: 16,
    color: '#5E97F6',
    marginTop: 3,
    lineHeight: 22,
  },

  /* Empty */
  emptyContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#A1A1A8',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default HelpSupport;
