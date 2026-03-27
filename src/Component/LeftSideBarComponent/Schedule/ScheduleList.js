import React, { useState, useMemo, useEffect } from 'react'; // Added useEffect
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../../ReusableComponent/Header';
import Colors from '../../../Assets/Style/Color';

// --- Sub-components (SectionHeader, Tag, ScheduleItem, DetailModal) remain the same ---
// [NOTE: For brevity, their code is omitted here but is included in the final block below]
const SectionHeader = ({ title }) => {
  const isUnscheduled = title === 'Unscheduled';
  const formattedDate = isUnscheduled
    ? 'Unscheduled'
    : moment(title).format('dddd, MMMM D');

  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderTitle}>{formattedDate}</Text>
    </View>
  );
};

const Tag = ({ type, style }) => {
  const isJob = type?.toLowerCase() === 'job';
  const tagStyle = isJob ? styles.jobTag : styles.quoteTag;
  const textStyle = isJob ? styles.jobTagText : styles.quoteTagText;

  return (
    <View style={[styles.tag, tagStyle, style]}>
      <Text style={[styles.tagText, textStyle]}>{type || 'N/A'}</Text>
    </View>
  );
};

const ScheduleItem = ({ item, onItemPress }) => {
  const timelineColor = item.type?.toLowerCase() === 'job'
    ? Colors.ocean_Green_color
    : Colors.amber_color;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onItemPress(item)}>
      <View style={[styles.timeline, { backgroundColor: timelineColor }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.customerName} numberOfLines={1}>
            {item.customer_name}
          </Text>
          <Tag type={item.type} />
        </View>
        <View style={styles.detailRow}>
          <Icon name="clock-time-four-outline" size={16} color={Colors.gray_text_color} />
          <Text style={styles.detailText}>
            {item.start_time} - {item.end_time}
          </Text>
        </View>
        {item.customer_address && (
          <View style={styles.detailRow}>
            <Icon name="map-marker-outline" size={16} color={Colors.gray_text_color} />
            <Text style={styles.detailText} numberOfLines={1}>
              {item.customer_address}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const DetailModal = ({ isVisible, onClose, item }) => {
  if (!item) return null;

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.detailModalOverlay}>
        <SafeAreaView style={styles.detailModalContent}>
          <View style={styles.detailModalHeader}>
            <Text style={styles.detailModalTitle}>Schedule Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close-circle" size={28} color={Colors.charcol_color} />
            </TouchableOpacity>
          </View>

          <View style={styles.detailSection}>
            <View style={styles.detailCard}>
              <View style={styles.detailCardHeader}>
                <Icon name="account-circle-outline" size={24} color={Colors.blue_theme_Color} />
                <Text style={styles.detailCardTitle}>Client Information</Text>
              </View>
              <Text style={styles.detailMainText}>{item.customer_name}</Text>
              <Text style={styles.detailSubText}>Quotation ID: {item.quotation_id}</Text>
            </View>

            <View style={styles.detailCard}>
              <View style={styles.detailCardHeader}>
                <Icon name="calendar-clock" size={24} color={Colors.blue_theme_Color} />
                <Text style={styles.detailCardTitle}>Date & Time</Text>
              </View>
              <Text style={styles.detailMainText}>
                {item.date ? moment(item.date).format('dddd, MMM D, YYYY') : 'Unscheduled'}
              </Text>
              <Text style={styles.detailSubText}>{item.start_time} - {item.end_time}</Text>
            </View>

            <View style={styles.detailCard}>
              <View style={styles.detailCardHeader}>
                <Icon name="map-marker-radius-outline" size={24} color={Colors.blue_theme_Color} />
                <Text style={styles.detailCardTitle}>Location</Text>
              </View>
              <Text style={styles.detailMainText} numberOfLines={4}>
                {item.customer_address || 'No address provided'}
              </Text>
            </View>
            <Tag type={item.type} style={styles.detailTag} />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};


const ScheduleList = () => {
  const { AllScheduleList, loading } = useSelector(state => state.AllScheduleList);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [tempFilter, setTempFilter] = useState('all');
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // --- NEW: State and logic for animated placeholder ---
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = useMemo(() => [
    "Search by client name",
    "Search by quotation ID",
    "Search by address",
  ], []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex(prevIndex => (prevIndex + 1) % placeholders.length);
    }, 1500); // Change placeholder every 2.5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [placeholders.length]);
  // --- END NEW ---

  const filterOptions = [
    { key: 'all', label: 'All Scheduled' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'current', label: 'Today' },
    { key: 'previous', label: 'Previous' },
    { key: 'unscheduled', label: 'Unscheduled' },
  ];

  const processedData = useMemo(() => {
    if (!AllScheduleList?.Data) return [];
    const today = moment().startOf('day');
    const lowercasedQuery = searchQuery.toLowerCase();

    const searchedData = AllScheduleList.Data.filter(item =>
      item.customer_name.toLowerCase().includes(lowercasedQuery) ||
      item.quotation_id.toString().toLowerCase().includes(lowercasedQuery) ||
      (item.customer_address && item.customer_address.toLowerCase().includes(lowercasedQuery))
    );

    const filteredData = searchedData.filter(item => {
      if (activeFilter === 'unscheduled') return item.date === null;
      if (item.date === null) return false;
      if (activeFilter === 'all') return true;

      const itemDate = moment(item.date);
      switch (activeFilter) {
        case 'upcoming': return itemDate.isAfter(today);
        case 'previous': return itemDate.isBefore(today);
        case 'current': return itemDate.isSame(today, 'day');
        default: return true;
      }
    });

    const groupedData = filteredData.reduce((acc, item) => {
      const key = item.date ? moment(item.date).format('YYYY-MM-DD') : 'Unscheduled';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    const sections = Object.keys(groupedData).map(date => ({
      title: date,
      data: groupedData[date].sort((a, b) =>
        moment(a.start_time, 'h:mm A').diff(moment(b.start_time, 'h:mm A'))
      ),
    }));

    sections.sort((a, b) => {
      if (a.title === 'Unscheduled') return 1;
      if (b.title === 'Unscheduled') return -1;
      const order = activeFilter === 'previous' ? 'desc' : 'asc';
      return order === 'asc'
        ? moment(a.title).diff(moment(b.title))
        : moment(b.title).diff(moment(a.title));
    });

    return sections;
  }, [AllScheduleList, activeFilter, searchQuery]);

  const handleApplyFilter = () => {
    setActiveFilter(tempFilter);
    setFilterModalVisible(false);
  };

  const openFilterModal = () => {
    setTempFilter(activeFilter);
    setFilterModalVisible(true);
  };

  const handleItemPress = item => {
    setSelectedItem(item);
    setDetailModalVisible(true);
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Icon name="calendar-search" size={60} color={Colors.charcol_color} />
      <Text style={styles.emptyText}>No Schedules Found</Text>
      <Text style={styles.emptySubText}>
        Try adjusting your search or filter settings.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Schedule List</Text>
      </View>

      {/* --- UPDATED: Search Bar with animated placeholder --- */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={22} color={Colors.gray_text_color} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholders[placeholderIndex]}
          placeholderTextColor={Colors.gray_text_color}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color={Colors.gray_text_color} />
          </TouchableOpacity>
        )}
      </View>
      {/* --- END UPDATE --- */}

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.blue_theme_Color} />
        </View>
      ) : (
        <SectionList
          sections={processedData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <ScheduleItem item={item} onItemPress={handleItemPress} />}
          renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      )}

      <TouchableOpacity onPress={openFilterModal} style={styles.floatingFilterButton}>
        <Icon name="filter-variant" size={28} color={Colors.white_text_color} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Schedule</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Icon name="close" size={24} color={Colors.gray_text_color} />
              </TouchableOpacity>
            </View>
            <View style={styles.filterOptionsContainer}>
              {filterOptions.map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[styles.filterButton, tempFilter === option.key && styles.activeFilterButton]}
                  onPress={() => setTempFilter(option.key)}
                >
                  <Text style={[styles.filterButtonText, tempFilter === option.key && styles.activeFilterButtonText]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilter}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>

      <DetailModal
        isVisible={isDetailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        item={selectedItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    // ---------------- Container ----------------
    container: { flex: 1, backgroundColor: Colors.black_bg_Theme }, // premium dark background
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
    // ---------------- Search Bar ----------------
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 16,
      paddingHorizontal: 18,
      marginHorizontal: 20,
      marginTop: 15,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 5,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 12,
      marginLeft: 12,
      fontSize: 16,
      fontWeight: '500',
      color: '#F5F5F5',
    },
    titleContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
      },
      titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.gray_html_color,
        letterSpacing: 0.5,
      },
  
    // ---------------- Section Header ----------------
    sectionHeaderContainer: {
      paddingVertical: 12,
      paddingHorizontal: 15,
      backgroundColor: Colors.black_bg_Theme,
    },
    sectionHeaderTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: '#A1A1A8',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
  
    // ---------------- Schedule Card ----------------
    card: {
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 18,
      marginHorizontal: 10,
      flexDirection: 'row',
      marginBottom: 8,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 8,
    },
    timeline: { width: 6, borderTopLeftRadius: 18, borderBottomLeftRadius: 18 },
    content: { flex: 1, padding: 20 },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    customerName: {
      fontSize: 18,
      fontWeight: '700',
      color: '#F5F5F5',
      flex: 1,
      marginRight: 12,
    },
  
    // ---------------- Detail Rows ----------------
    detailRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    detailText: {
      fontSize: 15,
      color: '#C1C1C8',
      marginLeft: 10,
      flex: 1,
      fontWeight: '500',
    },
  
    // ---------------- Tags ----------------
    tag: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
    tagText: { fontSize: 13, fontWeight: '700' },
    jobTag: { backgroundColor: 'rgba(80, 200, 120, 0.2)' },
    jobTagText: { color: '#50C878' },
    quoteTag: { backgroundColor: 'rgba(255, 192, 0, 0.2)' },
    quoteTagText: { color: '#FFC000' },
  
    // ---------------- Empty State ----------------
    emptyContainer: {
      flex: 1,
      marginTop: 120,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 25,
    },
    emptyText: {
      fontSize: 20,
      fontWeight: '700',
      color: Colors.gray_html_color,
      marginTop: 18,
    },
    emptySubText: {
      fontSize: 15,
      color: Colors.gray_html_color,
      marginTop: 10,
      textAlign: 'center',
    },
  
    // ---------------- Floating Button ----------------
    floatingFilterButton: {
      position: 'absolute',
      bottom: 50,
      right: 25,
      backgroundColor: '#3B82F6',
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#3B82F6',
      shadowOpacity: 0.5,
      shadowRadius: 15,
      shadowOffset: { width: 0, height: 8 },
      elevation: 12,
    },
  
    // ---------------- Modal ----------------
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.85)',
    },
    modalContent: {
      backgroundColor: '#1C1F2A',
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 22,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#2E313E',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#F5F5F5',
    },
  
    // ---------------- Filter Buttons ----------------
    filterButton: {
      paddingVertical: 16,
      borderRadius: 14,
      backgroundColor: '#0F111A',
      marginBottom: 14,
      borderWidth: 1.5,
      borderColor: '#2E313E',
    },
    activeFilterButton: {
      backgroundColor: '#3B82F6',
      borderColor: '#3B82F6',
    },
    filterButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#F5F5F5',
      textAlign: 'center',
    },
    activeFilterButtonText: { color: '#F5F5F5' },
    applyButton: {
      backgroundColor: '#3B82F6',
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: 'center',
    },
    applyButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#F5F5F5',
    },
  
    // ---------------- Detail Modal ----------------
    detailModalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    detailModalContent: {
      backgroundColor: '#0F111A',
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 18,
      paddingTop: 22,
    },
    detailModalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 18,
    },
    detailModalTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: '#F5F5F5',
    },
    detailSection: { paddingHorizontal: 12, paddingBottom: 22 },
    detailCard: {
      backgroundColor: '#1C1F2A',
      borderRadius: 18,
      padding: 18,
      marginBottom: 18,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 7,
    },
    detailCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
    },
    detailCardTitle: {
      fontSize: 14,
      color: '#A1A1A8',
      marginLeft: 12,
      textTransform: 'uppercase',
      fontWeight: '600',
      letterSpacing: 0.5,
    },
    detailMainText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#F5F5F5',
      lineHeight: 26,
    },
    detailSubText: {
      fontSize: 14,
      color: Colors.banana_Yellow_color,
      marginTop: 6,
    },
    detailTag: { alignSelf: 'flex-start', marginTop: 8 },
  });
  

export default ScheduleList;