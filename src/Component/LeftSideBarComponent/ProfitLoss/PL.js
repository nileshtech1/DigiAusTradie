import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import {Calendar} from 'react-native-calendars';
import Header from '../../../ReusableComponent/Header';
import IncomePLComponent from './IncomePLComponent';
// import CostOfSaleComponent from './CostOfSaleComponent';
import OperatingExpenses from './OperatingExpenses';
import TimePeriodModal from '../../../ReusableComponent/TimePeriodModal';
import SettingsModal from '../../../ReusableComponent/SettingsModal';
import Colors from '../../../Assets/Style/Color';
import PLStyle from '../../../utils/Stylesheet/PlStyle';
import {ProfitLossApi} from '../../../Redux/API/Profit&LossApi';
import {
  checkIcon,
  filterIcon,
  resetIcon,
  settingIcon,
} from '../../../Assets/Images';

const PL = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comparessionRange, setComparessionRange] = useState('');
  const [isStartDateModalVisible, setIsStartDateModalVisible] = useState(false);
  const [isEndDateModalVisible, setIsEndDateModalVisible] = useState(false);
  const [comparisonModal, setComparisonModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);
  const [option, setOption] = useState('');
  const {LoginData} = useSelector(state => state.Login);
  const dispatch = useDispatch();

  const {ProfitLossData, ProfitLossLoading} = useSelector(
    state => state.ProfitLoss,
  );
  const reportData = ProfitLossData?.final_data || {};
  
  const incomeData = [
    { id: "commercial", title: "Commercial", month: reportData.commercial_amount || 0 },
    { id: "residential", title: "Residential", month: reportData.residential_amount || 0 },
    { id: "storefront", title: "Storefront", month: reportData.front_store_amount || 0 },
  ];
  
  
  const totalMonth = incomeData.reduce((acc, row) => acc + parseFloat(row.month || 0), 0);
  
  // ✅ Gross & Net Profit (same here)
  const grossProfit = parseFloat(reportData.total_amount || 0);
  const netProfit = parseFloat(reportData.total_amount || 0);
  
  // ✅ Dummy Operating Expenses (since API didn’t return it yet)
  const opExpenseData = []; 
  const opExpensesTotal = 0;
  const opExpensesYearPercentage = 0;
  
  const handleDayPress = (day, type) => {
    if (type === 'start') {
      setStartDate(day.dateString);
      setIsStartDateModalVisible(false);
    } else {
      setEndDate(day.dateString);
      setIsEndDateModalVisible(false);
    }
  };

  const handleSelectTimePeriod = async period => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const getStartOfQuarter = (year, month) => {
      const quarterStartMonth = Math.floor(month / 3) * 3;
      return new Date(year, quarterStartMonth, 1);
    };

    const getEndOfQuarter = (year, month) => {
      const start = getStartOfQuarter(year, month);
      return new Date(start.getFullYear(), start.getMonth() + 3, 0);
    };

    const formatAPIDate = date => {
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, '0');
      const day = `${date.getDate()}`.padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    let fromDate, toDate;

    switch (period.label) {
      case 'This month':
        fromDate = new Date(currentYear, currentMonth, 1);
        toDate = new Date(currentYear, currentMonth + 1, 0);
        break;

      case 'Last month': {
        const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
        const lastYear = lastMonthDate.getFullYear();
        const lastMonth = lastMonthDate.getMonth();
        fromDate = new Date(lastYear, lastMonth, 1);
        toDate = new Date(lastYear, lastMonth + 1, 0);
        break;
      }

      case 'This quarter':
        fromDate = getStartOfQuarter(currentYear, currentMonth);
        toDate = getEndOfQuarter(currentYear, currentMonth);
        break;

      case 'Last quarter': {
        const lastQuarterDate = new Date(currentYear, currentMonth - 3, 1);
        const year = lastQuarterDate.getFullYear();
        const month = lastQuarterDate.getMonth();
        fromDate = getStartOfQuarter(year, month);
        toDate = getEndOfQuarter(year, month);
        break;
      }

      case 'This financial year':
        fromDate = new Date(
          currentMonth < 6 ? currentYear - 1 : currentYear,
          6,
          1,
        );
        toDate = new Date(
          currentMonth < 6 ? currentYear : currentYear + 1,
          5,
          30,
        );
        break;

      case 'Last financial year': {
        const fyStart = new Date(
          currentMonth < 6 ? currentYear - 2 : currentYear - 1,
          6,
          1,
        );
        const fyEnd = new Date(
          currentMonth < 6 ? currentYear - 1 : currentYear,
          5,
          30,
        );
        fromDate = fyStart;
        toDate = fyEnd;
        break;
      }

      case 'Month to date':
        fromDate = new Date(currentYear, currentMonth, 1);
        toDate = today;
        break;

      case 'Quarter to date':
        fromDate = getStartOfQuarter(currentYear, currentMonth);
        toDate = today;
        break;

      case 'Year to date':
        fromDate = new Date(
          currentMonth < 6 ? currentYear - 1 : currentYear,
          6,
          1,
        );
        toDate = today;
        break;

      default:
        console.warn('Unknown period label:', period.label);
        return;
    }

    const formattedFromDate = formatAPIDate(fromDate);
    const formattedToDate = formatAPIDate(toDate);

    setStartDate(formattedFromDate);
    setEndDate(formattedToDate);
    setComparessionRange(period.range);
    setComparisonModal(false);
  };

  const handleSelectOption = option => {
    setOption(option);
    const id = LoginData?.user?.id;
    if (startDate && endDate) {
      const postData = {
        franchise_id: id,
        fromDate: startDate,
        toDate: endDate,
        paymentsOnly: option === 'Cash' ? true : false,
      };
      dispatch(ProfitLossApi(postData)).then(res => {
        setSettingModal(false);
      });
    } else {
      Alert.alert(
        'Start date and end date must be selected before applying the filter.',
      );
      setSettingModal(false);
    }
  };

  const handleFilterProfitLoss = async () => {
    const id = LoginData?.user?.id;
    const postData = {
      franchise_id: id,
      fromDate: startDate,
      toDate: endDate,
      paymentsOnly: option === 'Cash' ? true : false,
    };

    await dispatch(ProfitLossApi(postData)).then(res => {
      // console.log(res, 'Profit Loss API response');
    });
  };

  return (
    <View style={PLStyle.container}>
      <Header notificationIcon={true} />
      {ProfitLossLoading && (
        <View style={PLStyle.loaderContainer}>
          <ActivityIndicator color={Colors.Neon_Blue_Theme_Color} size={100} />
        </View>
      )}
      <Text style={PLStyle.title}>Profit & Loss (PL)</Text>

      <View style={PLStyle.dateFilterContainer}>
        <View style={PLStyle.dateRangeContainer}>
          <View style={PLStyle.dateInputRow}>
            <TouchableOpacity
              style={PLStyle.inputCont}
              onPress={() => setIsStartDateModalVisible(true)}>
              <TextInput
                style={PLStyle.dateInput}
                value={startDate}
                placeholder="Start Date"
                placeholderTextColor="#ccc"
                editable={false}
              />
            </TouchableOpacity>
            <Text style={PLStyle.toText}> - </Text>
            <TouchableOpacity
              style={PLStyle.inputCont}
              onPress={() => setIsEndDateModalVisible(true)}>
              <TextInput
                style={PLStyle.dateInput}
                value={endDate}
                placeholder="End Date"
                placeholderTextColor="#ccc"
                editable={false}
              />
            </TouchableOpacity>
          </View>
          <Button
            mode="contained"
            style={PLStyle.applyButton}
            onPress={() => {
              setStartDate(''), setEndDate('');
            }}
            icon={resetIcon}>
            Reset
          </Button>
        </View>
        <View style={PLStyle.applyButtonWrapper}>
          <Button
            mode="contained"
            style={PLStyle.applyButton}
            onPress={() => setComparisonModal(true)}
            icon={filterIcon}>
            Filter
          </Button>
          <Button
            mode="contained"
            style={PLStyle.applyButton}
            onPress={() => setSettingModal(true)}
            icon={settingIcon}>
            Settings
          </Button>
          <Button
            mode="contained"
            style={PLStyle.applyButton}
            onPress={handleFilterProfitLoss}
            icon={checkIcon}>
            Apply
          </Button>
        </View>
      </View>

      {/* 🔽 Main Scrollable Content */}
      <ScrollView
        style={PLStyle.contentContainer}
        showsVerticalScrollIndicator={false}>
        <IncomePLComponent
            data={incomeData.map(row => ({
              ...row,
              yearPercentage: grossProfit > 0
                ? ((row.month / grossProfit) * 100).toFixed(2)
                : "0.00",
            }))}
            totalMonth={totalMonth}
            comparessionRange={comparessionRange}
            totalYearPercentage={
              totalMonth > 0
                ? ((grossProfit / totalMonth) * 100).toFixed(2)
                : "0.00"
            }
          />

        {/* ❌ CostOfSaleComponent commented for now – data not extracted */}
        {/* <CostOfSaleComponent cosData={cosData} CostotalMonth={...} CostotalYearPercentage={...} /> */}

        {/* 🧮 Gross Profit */}
        <View style={{paddingHorizontal: 10}}>
          <View style={PLStyle.tableRow}>
            <View style={PLStyle.cell1}>
              <Text style={PLStyle.totalBoldText1}>Gross Profit</Text>
            </View>
            <View style={PLStyle.cell2}>
              <Text style={PLStyle.rowText}>$ {grossProfit.toFixed(2)}</Text>
            </View>
            <View style={PLStyle.cell3}>
              <Text style={PLStyle.rowText}>
                {totalMonth > 0
                  ? ((grossProfit / totalMonth) * 100).toFixed(2)
                  : '0.00'}
                %
              </Text>
            </View>
          </View>
        </View>

        {/* 🧾 Operating Expenses */}
        <OperatingExpenses
          opExpenseData={opExpenseData}
          OpExpensetotalMonth={opExpensesTotal.toFixed(2)} 
          OpExpensetotalYearPercentage={opExpensesYearPercentage.toFixed(2)} 
        />

        {/* 🧮 Net Profit */}
        <View style={{paddingHorizontal: 10, paddingBottom: 40}}>
          <View style={PLStyle.tableRow}>
            <View style={PLStyle.cell1}>
              <Text style={PLStyle.netProfit}>Net Profit</Text>
            </View>
            <View style={PLStyle.cell2}>
              <Text style={PLStyle.netProfit}>$ {netProfit.toFixed(2)}</Text>
            </View>
            <View style={PLStyle.cell3}>
              <Text style={PLStyle.netProfit}>
                {totalMonth > 0
                  ? ((netProfit / totalMonth) * 100).toFixed(2)
                  : '0.00'}
                %
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 📅 Start/End Date Calendar Modals */}
      <Modal
        visible={isStartDateModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsStartDateModalVisible(false)}>
        <View style={PLStyle.modalContainer}>
          <View style={PLStyle.modalContent}>
            <Calendar
              onDayPress={day => handleDayPress(day, 'start')}
              markedDates={{
                [startDate]: {selected: true, selectedColor: 'blue'},
              }}
            />
            <TouchableOpacity
              style={PLStyle.closeButton}
              onPress={() => setIsStartDateModalVisible(false)}>
              <Text style={PLStyle.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isEndDateModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsEndDateModalVisible(false)}>
        <View style={PLStyle.modalContainer}>
          <View style={PLStyle.modalContent}>
            <Calendar
              onDayPress={day => handleDayPress(day, 'end')}
              markedDates={{[endDate]: {selected: true, selectedColor: 'blue'}}}
            />
            <TouchableOpacity
              style={PLStyle.closeButton}
              onPress={() => setIsEndDateModalVisible(false)}>
              <Text style={PLStyle.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🔳 Time Filter and Settings */}
      <TimePeriodModal
        visible={comparisonModal}
        onClose={() => setComparisonModal(false)}
        setComparisonModal={setComparisonModal}
        onSelectTimePeriod={handleSelectTimePeriod}
      />
      <SettingsModal
        visible={settingModal}
        onClose={() => setSettingModal(false)}
        onSelectOption={handleSelectOption}
      />
    </View>
  );
};

export default PL;
