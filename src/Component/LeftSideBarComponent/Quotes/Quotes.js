import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import Header from '../../../ReusableComponent/Header';
import Colors from '../../../Assets/Style/Color';
import {useDispatch, useSelector} from 'react-redux';
import {GetQuotationListApi} from '../../../Redux/API/GetQuotationListApi';
import QuotesStyle from '../../../utils/Stylesheet/QuotesStyle';
import {QuotationStatusApi} from '../../../Redux/API/QuotationStatusApi';
import FilterSection from './components/FilterSection';
import SummaryRow from './components/SummaryRow';
import QuoteCard from './components/QuoteCard';
import CalendarModal from './components/CalendarModal';
import StatusModal from './components/StatusModal';
import {NotificationQuoteStatusUpdateApi} from '../../../Redux/API/NotificationQuoteStatusUpdateApi';
import VectorIcon from '../../../ReusableComponent/VectorIcon';
import FooterSpacer from '../../../ReusableComponent/FooterSpacer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Quotes = ({navigation}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isStartDateModalVisible, setIsStartDateModalVisible] = useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [isEndDateModalVisible, setIsEndDateModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [acceptedChecked, setAcceptedChecked] = useState(false);
  const [rejectedChecked, setRejectedChecked] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [quotationList, setQuotationList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [sentChecked, setSentChecked] = useState(false);
  const [acceptChecked, setAcceptChecked] = useState(false);
  const [invoicedChecked, setInvoicedChecked] = useState(false);
  const insets = useSafeAreaInsets();

  const [filteredQuoteList, setFilteredQuoteList] = useState([]);
  const {QuotationList, GetQuotationLoader} = useSelector(
    state => state.QuotationList,
  );
  
  
  const {CustomerList} = useSelector(state => state.CustomerList);
  const {QuotationStatusLoading} = useSelector(state => state.QuotationStatus);
  const {InvoiceList} = useSelector(state => state.InvoiceList);
  
  const [showFilter, setShowFilter] = useState(false);
  const {LoginData, LoginLoading, isLoggedin} = useSelector(
    state => state.Login,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchQuotation = async () => {
      const token = LoginData.token;
      const id = LoginData?.user?.id;
      dispatch(GetQuotationListApi({token, id}));
    };

    fetchQuotation();
  }, [dispatch]);

  useEffect(() => {
    if (QuotationList && QuotationList.Quotation) {
      setQuotationList(QuotationList.Quotation);
      
      setFilteredQuoteList(QuotationList.Quotation);
    }
  }, [QuotationList]);

  useEffect(() => {
    const fetchCustomerList = async () => {
      setCustomerList(CustomerList?.franchise_customer);
    };
    fetchCustomerList();
  }, [CustomerList]);

  const totalSent = filteredQuoteList?.length;
  const totalAcceptedCount = filteredQuoteList.filter(
    quote => quote?.status?.toLowerCase() === 'accepted',
  ).length;
  const acceptanceRate = totalSent ? (totalAcceptedCount / totalSent) * 100 : 0;

  const fetchQuotation = async () => {
    const token = LoginData.token;
    const id = LoginData?.user?.id;
    setIsRefreshing(true);
    await dispatch(GetQuotationListApi({token, id}));
    setIsRefreshing(false);
  };

  const refreshQuotation = async () => {
    if (LoginData.status === true) {
      const token = LoginData.token;
      const id = LoginData?.user?.id;
      dispatch(GetQuotationListApi({token, id}));
    }
  };

  const handleChangeStatus = () => {
    let newStatus = null;

    if (acceptedChecked) {
      newStatus = 'ACCEPTED';
    } else if (rejectedChecked) {
      newStatus = 'DECLINED';
    }

    if (newStatus) {
      updateQuotationStatus(newStatus);
    }

    setIsStatusModalVisible(false);
  };

  const updateQuotationStatus = async status => {
    const id = LoginData?.user?.id;
    const token = LoginData.token;
    const franchiseid = {
      franchise_id: id,
    };
    

    const postdata = {
      franchise_id: id,
      quotation_no: selectedQuotation?.quotation_serial_no,
      status: status,
    };
    dispatch(QuotationStatusApi(postdata)).then(res => {
      if (res.payload.status === true) {
        dispatch(GetQuotationListApi({token, id}));
        dispatch(NotificationQuoteStatusUpdateApi({token, franchiseid}));
        setTimeout(() => {
          Alert.alert('Status Update', res.payload?.message);
        }, 1000);
      } else {
        setTimeout(() => {
          Alert.alert('Error', 'Failed to update quotation status.');
        }, 1000);
      }
    });
  };

  const handleDayPress = (day, type) => {
    let updatedStartDate = startDate;
    let updatedEndDate = endDate;

    if (type === 'start') {
      updatedStartDate = day.dateString;
      setStartDate(day.dateString);
    } else {
      updatedEndDate = day.dateString;
      setEndDate(day.dateString);
    }

    filterByDate(updatedStartDate, updatedEndDate);

    if (type === 'start') {
      setIsStartDateModalVisible(false);
    } else {
      setIsEndDateModalVisible(false);
    }
  };

  const filterByDate = (startDate, endDate) => {
    if (startDate && endDate) {
      const filtered = quotationList.filter(quote => {
        const quoteDate = new Date(quote.created_at)
          .toISOString()
          .split('T')[0];
        return quoteDate >= startDate && quoteDate <= endDate;
      });
      setFilteredQuoteList(filtered);
      setQuotationList(filtered);
    } else {
      // setFilteredQuoteList(quotationList);
    }
  };

  const handleCardClick = quote => {
    // setSelectedQuote(quote);
    navigation.navigate('QuoteView', {selectedQuote: quote});
  };

  const handleEditClick = formData => {
    navigation.navigate('EditQuote', {formData});
  };

  const filteredQuoteListNew = useMemo(() => {
    let filtered = quotationList;
  
    // ✅ Search filter
    if (searchQuery?.trim()) {
      filtered = filtered.filter(quote => {
        const q = searchQuery.toLowerCase();
        return (
          quote.customer_name?.toLowerCase().includes(q) ||
          quote.category_address?.toLowerCase().includes(q) ||
          quote.quotation_serial_no?.toLowerCase().includes(q) ||
          quote.created_at?.toLowerCase().includes(q) ||
          quote.status?.toLowerCase().includes(q) ||
          quote.ABN?.toLowerCase().includes(q) ||
          quote.site_name?.toLowerCase().includes(q) ||
          quote.category_type?.toLowerCase().includes(q) ||
          quote.commercial_job?.some(
            job =>
              job.price?.toString().includes(q) ||
              job.job?.toLowerCase().includes(q),
          ) ||
          quote.residential_job?.some(
            job =>
              job.price?.toString().includes(q) ||
              job.job?.toLowerCase().includes(q),
          ) ||
          quote.storefront_job?.some(
            job =>
              job.price?.toString().includes(q) ||
              job.job?.toLowerCase().includes(q),
          ) ||
          quote.swms?.some(swm => swm.hazard?.toLowerCase().includes(q))
        );
      });
    }
  
    // ✅ Status filter
    const selectedStatuses = [];
    if (sentChecked) selectedStatuses.push('sent');
    if (acceptChecked) selectedStatuses.push('accepted');
    if (invoicedChecked) selectedStatuses.push('invoiced');
  
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(quote => {
        const status = quote.status?.toLowerCase();
        let matchesStatus = false;
  
        if (
          (sentChecked && status === 'sent') ||
          (acceptChecked && status === 'accepted')
        ) {
          matchesStatus = true;
        }
  
        if (invoicedChecked) {
          const hasMatchingInvoice = InvoiceList?.Invoices?.some(
            invoice =>
              invoice?.reference === quote?.quotation_serial_no ||
              invoice?.reference === quote?.quotation_no,
          );
  
          // 🚫 Exclude quotations that have a matching invoice
          if (hasMatchingInvoice) {
            return false;
          }
  
          matchesStatus = true;
        }
  
        return matchesStatus;
      });
    }
  
    filtered = filtered.filter(quote => {
      const existsInInvoice = InvoiceList?.Invoices?.some(invoice => {
        if (!invoice?.reference) {
          return false;
        }
    
        return (
          invoice.reference === quote?.quotation_serial_no ||
          invoice.reference === quote?.quotation_no
        );
      });
    
      if (existsInInvoice) {
        console.log("🚫 Excluded (exists in InvoiceList):", quote?.quotation_serial_no);
      }
    
      return !existsInInvoice;
    
   } );
  
    setFilteredQuoteList(filtered);
    return filtered;
  }, [
    quotationList,
    searchQuery,
    sentChecked,
    acceptChecked,
    invoicedChecked,
    InvoiceList,
  ]);
  

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const filterByPriceRange = (min, max) => {
    if (!min && !max) {
      setFilteredQuoteList(quotationList);
      return;
    }

    let filtered = quotationList?.filter(quote => {
      let jobPrices = [];
      if (quote.category_type === 'commercial' && quote.commercial_job) {
        jobPrices = quote.commercial_job.map(job => parseFloat(job.price));
      } else if (quote.category_type === 'storefront' && quote.storefront_job) {
        jobPrices = quote.storefront_job.map(job => parseFloat(job.price));
      } else if (
        quote.category_type === 'residential' &&
        quote.residential_job
      ) {
        jobPrices = quote.residential_job.map(job => parseFloat(job.price));
      }

      if (jobPrices.length === 0) return false;

      const minPrice = min ? parseFloat(min) : 0;
      const maxPrice = max ? parseFloat(max) : Infinity;

      return jobPrices.some(price => price >= minPrice && price <= maxPrice);
    });
    setFilteredQuoteList(filtered);
  };

  const handleMinPriceChange = text => {
    setMin(text);
    filterByPriceRange(text, max);
  };

  const handleMaxPriceChange = text => {
    setMax(text);
    filterByPriceRange(min, text);
  };

  const handleImageTap = imageUrl => {
    setLargeImage(imageUrl);
  };
  const handleAddSchedule = item => {
    console.log(item, 'item');
    
    if (item?.status?.toLowerCase() === 'sent') {
      Alert.alert('Info', 'You can only schedule once the quote has been accepted.');
    }
    else{
    navigation.navigate('Schedule', {customer: item});
    }
  };
  const handleReset = async () => {
    setStartDate('');
    setEndDate('');
    setMax('');
    setMin('');
    filterByDate();
    setAcceptChecked(false);
    setInvoicedChecked(false);
    setSentChecked(false);
    setSearchQuery('');
    const token = LoginData.token;
    const id = LoginData?.user?.id;
    await dispatch(GetQuotationListApi({token, id}));
  };
  const capitalizeFirstLetter = str => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleEditStatus = quote => {
    setSelectedQuotation(quote);
    setIsStatusModalVisible(true);
  };

  const getTotalPrice = item => {
    let jobs = [];

    if (item.category_type === 'commercial') {
      jobs = item.commercial_job || [];
    } else if (item.category_type === 'residential') {
      jobs = item.residential_job || [];
    } else if (item.category_type === 'storefront') {
      jobs = item.storefront_job || [];
    }

    const prices = jobs.map(job => parseFloat(job.price || 0));
    const total = prices.reduce((sum, price) => sum + price, 0);

    return {
      total: total.toFixed(2),
      showPlus: prices.length > 1,
    };
  };
  const handleFilter = () => {
    
    setShowFilter(!showFilter);
  };

  return (
    <SafeAreaView style={{ flex: 1 ,  paddingBottom: insets.bottom}}>
      <View style={QuotesStyle.container}>
      <Header notificationIcon={true} />
      <View style={QuotesStyle.contentContainer}>
        <FilterSection
          showFilter={showFilter}
          handleFilter={handleFilter}
          startDate={startDate}
          endDate={endDate}
          setIsStartDateModalVisible={setIsStartDateModalVisible}
          setIsEndDateModalVisible={setIsEndDateModalVisible}
          min={min}
          max={max}
          handleMinPriceChange={handleMinPriceChange}
          handleMaxPriceChange={handleMaxPriceChange}
          handleReset={handleReset}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleClear={handleClear}
          handleSearch={handleSearch}
          sentChecked={sentChecked}
          setSentChecked={setSentChecked}
          acceptChecked={acceptChecked}
          setAcceptChecked={setAcceptChecked}
          invoicedChecked={invoicedChecked}
          setInvoicedChecked={setInvoicedChecked}
        />

        <SummaryRow
          totalSent={totalSent}
          totalAcceptedCount={totalAcceptedCount}
          acceptanceRate={acceptanceRate}
        />

        {filteredQuoteListNew.length === 0 ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={refreshQuotation}
              style={QuotesStyle.reloadButtonContainer}>
              <VectorIcon
                      icon="FontAwesome"
                      name="refresh"
                      size={30}
                      color={Colors.green_color}
                    />
            </TouchableOpacity>
            <Text style={QuotesStyle.noDataText}>No Quotation</Text>
          </View>
        ) : (
          <FlatList
            data={(filteredQuoteList ? filteredQuoteList : filteredQuoteListNew)
              ?.slice()
              .reverse()}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={fetchQuotation}
              />
            }
            renderItem={({item}) => (
              <QuoteCard
                item={item}
                handleCardClick={handleCardClick}
                handleEditClick={handleEditClick}
                handleAddSchedule={handleAddSchedule}
                handleEditStatus={handleEditStatus}
                capitalizeFirstLetter={capitalizeFirstLetter}
                getTotalPrice={getTotalPrice}
              />
            )}
          />
        )}

        <StatusModal
          isStatusModalVisible={isStatusModalVisible}
          setIsStatusModalVisible={setIsStatusModalVisible}
          acceptedChecked={acceptedChecked}
          setAcceptedChecked={setAcceptedChecked}
          rejectedChecked={rejectedChecked}
          setRejectedChecked={setRejectedChecked}
          handleChangeStatus={handleChangeStatus}
        />

        <CalendarModal
          isVisible={isStartDateModalVisible}
          onClose={() => setIsStartDateModalVisible(false)}
          onDayPress={day => handleDayPress(day, 'start')}
          markedDate={startDate}
        />
        <CalendarModal
          isVisible={isEndDateModalVisible}
          onClose={() => setIsEndDateModalVisible(false)}
          onDayPress={day => handleDayPress(day, 'end')}
          markedDate={endDate}
        />
      </View>

      {GetQuotationLoader && (
        <View style={QuotesStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
      {QuotationStatusLoading && (
        <View style={QuotesStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
    </View>
    </SafeAreaView>
  );
};

export default Quotes;
