import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'; // 1. Import Hook
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUserApi } from '../../Redux/API/GetAllUserApi';
import Colors from '../../Assets/Style/Color';
import { toggleFavorite } from '../../Redux/Slice/favoritesSlice';
import { IMAGE_BASE_URL } from '../../Redux/NWConfig';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

const JobListingPage = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets(); // 2. Get Insets
    const { LoginData } = useSelector(state => state.Login);
    const { AllUserList } = useSelector(state => state.AllUser);
    const { favorites } = useSelector(state => state.favorites);

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedTrade, setSelectedTrade] = useState('');
    const [minRating, setMinRating] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await dispatch(GetAllUserApi());
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, [dispatch]);

    useEffect(() => {
        if (AllUserList?.data) {
            setFilteredData(AllUserList.data);
        }
    }, [AllUserList]);


    const handleToggleFavorite = (item) => {
      dispatch(toggleFavorite(item));
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const lowercasedText = text.toLowerCase();

        const filtered = AllUserList?.data?.filter(
            (item) =>
                (item.first_name?.toLowerCase().includes(lowercasedText) ||
                    item.last_name?.toLowerCase().includes(lowercasedText)) ||
                item.trade?.toLowerCase().includes(lowercasedText) ||
                item.suburb?.toLowerCase().includes(lowercasedText) ||
                item.business_name?.toLowerCase().includes(lowercasedText) ||
                item.email?.toLowerCase().includes(lowercasedText)
        );
        setFilteredData(filtered);
    };

    const applyFilter = () => {
        let filtered = AllUserList?.data || [];

        if (selectedTrade) {
            filtered = filtered.filter(
                (item) => item.trade?.toLowerCase() === selectedTrade.toLowerCase()
            );
        }

        if (minRating > 0) {
            filtered = filtered.filter((item) => Number(item.rating) >= minRating);
        }

        setFilteredData(filtered);
        setFilterModalVisible(false);
    };

    const clearFilter = () => {
        setSelectedTrade('');
        setMinRating(0);
        setFilteredData(AllUserList?.data || []);
        setFilterModalVisible(false);
    };

    const handleJobClick = (item) => {
        navigation.navigate('JobDescription', { tradie: item });
    };

    const getFullImageUrl = (url) => {
      if (!url) return null;
    
      const parts = url.split('storage/');
      if (parts.length > 1) {
        return IMAGE_BASE_URL + parts[1];
      } else {
        return IMAGE_BASE_URL + url; 
      }
    };
    

    const renderTradieCard = ({ item }) => {
      const isFavorite = favorites?.some(fav => fav?.id === item?.id);
      
        return (
            <TouchableOpacity style={styles.card} onPress={() => handleJobClick(item)}>
                <Image
                    source={{ uri: getFullImageUrl(item.logo) }}
                    style={styles.tradiePhoto}
                />
                <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.tradieName}>
                            {item.business_name}
                        </Text>
                        <TouchableOpacity onPress={() => handleToggleFavorite(item)} style={styles.favoriteIcon}>
                            <Icon name={isFavorite ? "favorite" : "favorite-border"} size={24} color={isFavorite ? "red" : "#A9A9A9"} />
                        </TouchableOpacity>
                        <View style={styles.ratingContainer}>
                            <Icon name="star" size={16} color="#f39c12" />
                            <Text style={styles.ratingText}>{Number(item.rating).toFixed(1)}</Text>
                        </View>
                    </View>
                    <View style={styles.cardBody}>
                        <View style={styles.infoRow}>
                            <Icon name="person" size={16} color="#A9A9A9" />
                            <Text style={styles.infoText}> {item.first_name} {item.last_name}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Icon name="work" size={16} color="#A9A9A9" />
                            <Text style={styles.infoText}>{item.trade || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Icon name="location-on" size={16} color="#A9A9A9" />
                            <Text style={styles.infoText}>{item.suburb || 'N/A'}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" backgroundColor={'#000000'} />
            <View style={styles.header}>
                <Text style={styles.logo}>DigiAus Tradie</Text>
                {
                    LoginData?.status === true ? (
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Icon name="dashboard" size={30} color="#EAEAEA" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Icon name="person" size={30} color="#EAEAEA" />
                        </TouchableOpacity>
                    )
                }

            </View>

            <View style={styles.searchContainer}>
                <Icon name="search" size={22} color="#A9A9A9" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by trade, suburb, etc."
                    placeholderTextColor="#A9A9A9"
                    value={searchText}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity
                    onPress={() => setFilterModalVisible(true)}
                    style={styles.filterButton}
                >
                    <Icon name="filter-list" size={24} color="#EAEAEA" />
                </TouchableOpacity>
            </View>
            {
                filteredData.length > 0 ? (
                    <KeyboardAwareFlatList
                        data={filteredData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderTradieCard}
                        // 3. Use insets.bottom here
                        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} 
                        showsVerticalScrollIndicator={false}
                        enableOnAndroid={true}
                        extraHeight={100}
                        keyboardShouldPersistTaps="handled"
                    />
                ) : (
                    <View style={styles.noResultsContainer}>
                        <Text style={styles.noResultsText}>No results found</Text>
                    </View>
                )
            }


            <Modal
                visible={filterModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContainer, { paddingBottom: insets.bottom + 20 }]}>
                        <View style={styles.grabber} />
                        <Text style={styles.modalTitle}>Filter Options</Text>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.filterSection}>
                                <Text style={styles.filterTitle}>Minimum Rating</Text>
                                <View style={styles.sliderContainer}>
                                    <Slider
                                        style={{ width: '100%', height: 40 }}
                                        minimumValue={0}
                                        maximumValue={5}
                                        step={0.5}
                                        value={minRating}
                                        onValueChange={setMinRating}
                                        minimumTrackTintColor={Colors.blue_theme_Color}
                                        maximumTrackTintColor="#555"
                                        thumbTintColor={Colors.blue_theme_Color}
                                    />
                                    <Text style={styles.ratingValueText}>
                                        {minRating.toFixed(1)} ★
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.filterSection}>
                                <Text style={styles.filterTitle}>Trade</Text>
                                {[...new Set(AllUserList?.data?.map((t) => t.trade).filter(Boolean))].map((trade) => (
                                    <TouchableOpacity
                                        key={trade}
                                        style={[
                                            styles.tradeOption,
                                            selectedTrade === trade && styles.selectedTradeOption,
                                        ]}
                                        onPress={() => setSelectedTrade(trade)}
                                    >
                                        <Text
                                            style={[
                                                styles.tradeOptionText,
                                                selectedTrade === trade && styles.selectedTradeOptionText,
                                            ]}
                                        >
                                            {trade}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.clearButton]}
                                onPress={clearFilter}
                            >
                                <Text style={styles.clearButtonText}>Clear</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.applyButton]}
                                onPress={applyFilter}
                            >
                                <Text style={styles.applyButtonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default JobListingPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 10, // Adjusted since SafeAreaView handles top
  },
  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#EAEAEA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 12,
  },
  searchIcon: {
    paddingLeft: 15,
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#EAEAEA',
  },
  filterButton: {
    backgroundColor: Colors.blue_theme_Color,
    padding: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
   borderWidth: 1,
    borderColor: '#333',
  },
  tradiePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  tradieName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EAEAEA',
    flex: 1,
    marginRight: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 156, 18, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f39c12',
  },
  cardBody: {},
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#A9A9A9',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    maxHeight: '80%',
  },
  grabber: {
    width: 50,
    height: 5,
    backgroundColor: '#555',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#EAEAEA',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EAEAEA',
    marginBottom: 10,
  },
  sliderContainer: {
    alignItems: 'center',
  },
  ratingValueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.blue_theme_Color,
  },
  tradeOption: {
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedTradeOption: {
    backgroundColor: Colors.blue_theme_Color,
    borderColor: Colors.blue_theme_Color,
  },
  tradeOptionText: {
    fontSize: 16,
    color: '#EAEAEA',
  },
  selectedTradeOptionText: {
    color: '#121212',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: '#333',
  },
  clearButtonText: {
    color: '#EAEAEA',
    fontWeight: 'bold',
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: Colors.blue_theme_Color,
  },
  applyButtonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noResultsContainer :{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  noResultsText :{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EAEAEA',
  },
  favoriteIcon: {
    padding: 5,
  }
});