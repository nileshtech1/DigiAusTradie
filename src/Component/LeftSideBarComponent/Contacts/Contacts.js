import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Header from '../../../ReusableComponent/Header';
import { PieChart } from 'react-native-gifted-charts';
import SearchBar from '../../../ReusableComponent/SearchBar';
import Colors from '../../../Assets/Style/Color';
import {useSelector, useDispatch} from 'react-redux';
import {GetCustomerListApi} from '../../../Redux/API/GetCustomerListApi';
import ContactStyle from '../../../utils/Stylesheet/LeftSideBarComponentStyle/ContactsStyle';
import {useNavigation} from '@react-navigation/native';

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const {CustomerList} = useSelector(state => state.CustomerList);
  const {LoginData} = useSelector(state => state.Login);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRefreshing(true);
    const id = LoginData?.user?.id;
    const franchiseid = {
      franchise_id: id,
    };
    try {
      const token = LoginData.token;
      await dispatch(GetCustomerListApi({token, franchiseid}));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    fetchData();
  }, [LoginData, dispatch]);

  const handleSearch = query => {
    setSearchQuery(query);
  };
  const handleClear = () => {
    setSearchQuery('');
  };

const filteredContacts = useMemo(() => {
  if (!CustomerList || !CustomerList.franchise_customer) {
    return [];
  }

  const filtered = CustomerList.franchise_customer.filter(contact => {
    if (!contact) return false;

    const firstName = contact?.first_name || '';
    const lastName = contact?.last_name || '';
    const businessName = contact?.business_name || '';
    const categoriesString = (contact?.contact_category || [])
      .join(' ')
      .toLowerCase();
    const phone = contact?.phone?.toString() || '';
    const email = contact?.email || '';
    const searchTerm = searchQuery.toLowerCase();

    return (
      firstName.toLowerCase().includes(searchTerm) ||
      lastName.toLowerCase().includes(searchTerm) ||
      businessName.toLowerCase().includes(searchTerm) ||
      categoriesString.includes(searchTerm) ||
      phone.includes(searchTerm) ||
      email.includes(searchTerm)
    );
  });

  // 🧠 Sort alphabetically by full name (first + last)
  filtered.sort((a, b) => {
    const nameA = `${a.first_name || ''} ${a.last_name || ''}`.toLowerCase();
    const nameB = `${b.first_name || ''} ${b.last_name || ''}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return filtered;
}, [searchQuery, CustomerList]);


  const categoryColors = {
    residential: Colors.green_color,
    storefront: Colors.blue_theme_Color,
    commercial: Colors.Neon_Pink_Theme_Color,
    supplier: Colors.theme_background,
  };

  const calculatePieData = contacts => {
    if (!contacts || contacts.length === 0) {
      return [
        {
          value: 100,
          label: 'No Data',
          color: '#ccc',
          text: 'No Data',
        },
      ];
    }

    const categoryCounts = {
      residential: 0,
      commercial: 0,
      storefront: 0,
      supplier: 0,
    };

    contacts.forEach(contact => {
      contact.contact_category?.forEach(cat => {
        if (categoryCounts.hasOwnProperty(cat)) {
          categoryCounts[cat]++;
        }
      });
    });

    const totalContacts = contacts?.length;

    return Object.keys(categoryCounts).map(category => {
      const count = categoryCounts[category];
      const percentage = (count / totalContacts) * 100;
      const formattedPercentage = percentage.toFixed(1);
      return {
        value: parseFloat(formattedPercentage) || 0,
        label: `${formattedPercentage}%`,
        color: categoryColors[category] || '#ccc',
        text: `${formattedPercentage}%`,
      };
    });
  };

  const pieData = calculatePieData(filteredContacts);

  const handleContact = contactData => {
    if (contactData) {
      navigation.navigate('Contact Card', {contactData});
    }
    
  };

  const capitalizeFirstLetter = str => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <View style={ContactStyle.container}>
      <Header notificationIcon={true} />
      <View style={ContactStyle.contentContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={ContactStyle.pieChartContainer}>
            <PieChart
              data={pieData}
              radius={70}
              showText
              textSize={11}
              textColor="#000"
              backgroundColor="#080808FF"
              focusOnPress
              innerRadius={35}
              centerLabelComponent={() => (
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: Colors.white_text_color,
                  }}>
                  Contact
                </Text>
              )}
            />
          </View>

          <View style={ContactStyle.colorCodesContainer}>
            {Object.keys(categoryColors).map(category => (
              <View key={category} style={ContactStyle.colorItem}>
                <View
                  style={[
                    ContactStyle.colorBox,
                    {backgroundColor: categoryColors[category]},
                  ]}
                />
                <Text style={ContactStyle.colorLabel}>
                  {capitalizeFirstLetter(category)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          handleClear={handleClear}
          placeholder="Search for contacts..."
        />

        {filteredContacts?.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={ContactStyle.noCategoryText}>No Contact found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredContacts}
            keyExtractor={item => item?.id?.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.white_text_color}
              /> // Add RefreshControl
            }
            renderItem={({item}) =>
              item && (
                <TouchableOpacity
                  style={ContactStyle.contactItem}
                  onPress={() => handleContact(item)}>
                  <Text style={ContactStyle.contactName}>
                    {capitalizeFirstLetter(item?.first_name)}{' '}
                    {capitalizeFirstLetter(item?.last_name)}
                  </Text>

                  <View style={ContactStyle.gradientContainer}>
                    {item?.contact_category?.length > 0 &&
                      item.contact_category?.map((category, index) => {
                        const lowerCaseCategory = category.toLowerCase();
                        return (
                          <View
                            key={index}
                            style={[
                              ContactStyle.gradientBarSegment,
                              {
                                backgroundColor:
                                  categoryColors[lowerCaseCategory],
                              },
                            ]}
                          />
                        );
                      })}
                  </View>
                </TouchableOpacity>
              )
            }
          />
        )}
      </View>
    </View>
  );
};

export default Contacts;
