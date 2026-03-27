import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Colors from '../Assets/Style/Color';
import { logout } from '../Redux/Slice/LoginSlice';
import Profile from '../Component/Profile/Profile';
import VectorIcon from '../ReusableComponent/VectorIcon';
import EditProfile from '../Component/Profile/EditProfile';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../Component/Dashboard/Dashboard';
import Schedule from '../Component/LeftSideBarComponent/Schedule/Schedule';
import NewContact from '../Component/RightSideBarComponent/New Contact/NewContact';
import NewStoreFront from '../Component/RightSideBarComponent/New Store Front/NewStoreFront';
import Quotes from '../Component/LeftSideBarComponent/Quotes/Quotes';
import PL from '../Component/LeftSideBarComponent/ProfitLoss/PL';
import Contacts from '../Component/LeftSideBarComponent/Contacts/Contacts';
import Tutorials from '../Component/LeftSideBarComponent/Tutorials/Tutorials';
import Documents from '../Component/LeftSideBarComponent/Documents/Documents';
import StockOrder from '../Component/LeftSideBarComponent/StockOrder/StockOrder';
import Canvassing from '../Component/LeftSideBarComponent/Canvassing/Canvassing';
import NewCommercial from '../Component/RightSideBarComponent/New Commercial/NewCommercial';
import NewResidential from '../Component/RightSideBarComponent/New Residential/NewResidential';
import NewExpenses from '../Component/RightSideBarComponent/New Expenses/NewExpenses';
import StartStore from '../Component/Dashboard/StartStore/StartStore';
import Review from '../Component/Dashboard/Review/Review';
import TodayScheduled from '../Component/Dashboard/TodayScheduled/TodaySheduled';
import TommorowScheduled from '../Component/Dashboard/TommorowScheduled/TommorowScheduled';
import ChangePassowrd from '../Component/ChangePassword/ChangePassowrd';
import Revenue from '../Component/Dashboard/Revenue/Revenue';
import QuotesDetails from '../Component/Dashboard/Revenue/QuotesDetails';
import Expenses from '../Component/Dashboard/Expenses/Expenses';
import CreateQuote from '../Component/RightSideBarComponent/Create Quote/CreateQuote';
import OtherSchedule from '../Component/Dashboard/OtherSchedule/OtherSchedule';
import ContactCard from '../Component/LeftSideBarComponent/Contacts/ContactCard';
import Notification from '../Component/Notification/Notification';
import EditQuote from '../Component/RightSideBarComponent/Create Quote/EditQuote';
import YoutubeVideo from '../Component/LeftSideBarComponent/Tutorials/YoutubeVideo';
import DocumentList from '../Component/LeftSideBarComponent/Documents/DocumentList';
import ProductStock from '../Component/LeftSideBarComponent/StockOrder/ProductStock';
import PdfView from '../Component/LeftSideBarComponent/Documents/PdfView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuoteView from '../Component/LeftSideBarComponent/Quotes/QuoteView';
import EditNewContact from '../Component/RightSideBarComponent/New Contact/EditNewContact';
import ViewInvoice from '../Component/Dashboard/Revenue/ViewInvoice';
import FranchiseDocumentList from '../Component/LeftSideBarComponent/Documents/FranchiseDocumentList';
import RiskAssessmentList from '../Component/LeftSideBarComponent/Documents/RiskAssessmentList';
import PdfViewRisk from '../Component/LeftSideBarComponent/Documents/PdfViewRisk';
import MainDrawerRouteStyle from '../utils/Stylesheet/MainDrawerRouteStyle';
import PdfViewDoc from '../Component/LeftSideBarComponent/Documents/PdfViewDoc';
import PdfViewRiskDoc from '../Component/LeftSideBarComponent/Documents/PdfViewRiskDoc';
import BookingDetail from '../Component/Dashboard/OtherSchedule/BookingDetail';
import XeroQuoteDetails from '../Component/Dashboard/Revenue/XeroQuoteDetails';
import FreeDirectory from '../Component/RightSideBarComponent/Free Directory/FreeDirectory';
import { logo, logo3, MainLogo } from '../Assets/Images';
import ExpenseList from '../Component/LeftSideBarComponent/ExpenseList/ExpenseList';
import ViewExpenseInvoice from '../Component/LeftSideBarComponent/ExpenseList/ViewExpenseInvoice';
import EditExpense from '../Component/RightSideBarComponent/New Expenses/EditExpense';
import JobListingPage from '../Component/Login&registration/JobListingPage';
import JobDescription from '../Component/Login&registration/JobDescription';
import useUnifiedBack from '../ReusableComponent/useUnifiedBack';
import HelpSupport from '../Component/Help&Support/Help&Support';
import ScheduleList from '../Component/LeftSideBarComponent/Schedule/ScheduleList';
import PdfViewer from '../ReusableComponent/PdfViewer';
import PaymentMethod from '../Component/Settings/Setting';
const listIcon = require('../Assets/Images/list.png');
const addIcon = require('../Assets/Images/more.png');
const logoutIcon = require('../Assets/Images/switch.png');

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({navigation, activeScreen, setActiveScreen}) => {
  useUnifiedBack(navigation, 'Dashboard');
  const activeRouteName =
    navigation.getState().routes[navigation.getState().index].name;
    const dispatch = useDispatch()

    const handleLogout = async () => {
      Alert.alert(
        "Logout..",
        "Do you really want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              await AsyncStorage.removeItem('userLoginData');
              await AsyncStorage.removeItem('Token');
              await AsyncStorage.removeItem('User');
              dispatch(logout());
            },
          },
        ],
        { cancelable: true }
      );
    };
    
    
  return (
    <View style={MainDrawerRouteStyle.drawerContent}>
      <Image
        source={MainLogo}
        resizeMode="contain"
        style={MainDrawerRouteStyle.logo}
      />
      <View style={MainDrawerRouteStyle.switchButtons}>
        <Button
          mode="contained"
          style={[
            MainDrawerRouteStyle.switchButton,
            activeScreen === 'List' && MainDrawerRouteStyle.activeSwitchButton,
          ]}
          onPress={() => setActiveScreen('List')}
          icon={listIcon}>
          List
        </Button>
        <Button
          mode="contained"
          style={[
            MainDrawerRouteStyle.switchButton,
            activeScreen === 'Add' && MainDrawerRouteStyle.activeSwitchButton,
          ]}
          onPress={() => setActiveScreen('Add')}
          icon={addIcon}>
          Add
        </Button>
      </View>

      {activeScreen === 'List' ? (
        <ScrollView>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'Dashboard' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('Dashboard')}>
            <VectorIcon
              icon="MaterialCommunityIcons"
              name="view-dashboard"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'Dashboard'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Dashboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'Schedule' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('Schedule')}>
            <VectorIcon
              icon="FontAwesome"
              name="calendar"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'Schedule'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              My Calendar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'Quotes' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('Quotes')}>
            <VectorIcon
              icon="Octicons"
              name="quote"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'Quotes'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Quotes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'P/L' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('P/L')}>
            <VectorIcon
              icon="MaterialCommunityIcons"
              name="chart-line"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'P/L'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              P/L
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'JobListingPage' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('JobListingPage')}>
            <VectorIcon
              icon="Octicons"
              name="file-directory"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'JobListingPage'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Directory
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'Contacts' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('Contacts')}>
            <VectorIcon
              icon="MaterialIcons"
              name="call"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'Contacts'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Contacts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'ScheduleList' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('ScheduleList')}>
            <VectorIcon
              icon="MaterialIcons"
              name="list"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'ScheduleList'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Schedule List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'ExpenseList' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('ExpenseList')}>
            <VectorIcon
              icon="FontAwesome"
              name="money"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'ExpenseList'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Expense
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'Tutorials' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('Tutorials')}>
            <VectorIcon
              icon="FontAwesome"
              name="youtube-play"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'Tutorials'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Tutorials
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'Documents' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('Documents')}>
            <VectorIcon
              icon="MaterialCommunityIcons"
              name="file-document"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'Documents'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Documents
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'Stock Order' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('Stock Order')}>
            <VectorIcon
              icon="MaterialCommunityIcons"
              name="cart"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'Stock Order'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Stock Order
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'Canvassing' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            // onPress={() => navigation.navigate('Canvassing')}
            >
            <VectorIcon
              icon="MaterialCommunityIcons"
              name="map"
              color={Colors.white_text_color}
              size={20}
            />
            <Text style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'Canvassing' ? MainDrawerRouteStyle.activeDrawerButtonText : MainDrawerRouteStyle.drawerButtonText,
              ]}>Canvassing</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'Profile' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('Profile')}>
            <VectorIcon
              icon="Fontisto"
              name="person"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'Profile'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'Change Password' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('Change Password')}>
            <VectorIcon
              icon="MaterialIcons"
              name="password"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'Change Password'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Change Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'HelpSupport' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('HelpSupport')}>
            <VectorIcon
              icon="MaterialIcons"
              name="help-outline"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'HelpSupport'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Help & Support
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'Settings' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('Settings')}>
            <VectorIcon
              icon="AntDesign"
              name="setting"
              color={Colors.white_text_color}
              size={20}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'Settings'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              Settings
            </Text>
          </TouchableOpacity>
          <Button
            mode="contained"
            style={MainDrawerRouteStyle.logoutButtonContainer}
            buttonColor={Colors.blue_theme_Color}
            onPress={handleLogout}
            icon={logoutIcon}>
            Logout
          </Button>
        </ScrollView>
      ) : (
        <>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'New Contact' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('New Contact')}>
            <VectorIcon
             icon="MaterialIcons"
             name="call"
              color={Colors.white_text_color}
              size={20}
              style={{marginLeft: 3}}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'New Contact'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              New Contact
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'Create Quote' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('Create Quote')}>
            <VectorIcon
             icon="Octicons"
             name="quote"
              color={Colors.white_text_color}
              size={20}
              style={{marginLeft: 5}}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'Create Quote'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              New Quote
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              MainDrawerRouteStyle.drawerButton,
              activeRouteName === 'New Expenses' && MainDrawerRouteStyle.activeDrawerButton,
            ]}
            onPress={() => navigation.navigate('New Expenses')}>
            <VectorIcon
               icon="FontAwesome"
               name="money"
              color={Colors.white_text_color}
              size={20}
              style={{marginLeft: 6}}
            />
            <Text
              style={[
                MainDrawerRouteStyle.drawerButtonText,
                activeRouteName === 'New Expenses'
                  ? MainDrawerRouteStyle.activeDrawerButtonText
                  : MainDrawerRouteStyle.drawerButtonText,
              ]}>
              New Expense
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const MainDrawerScreen = () => {
  const [activeScreen, setActiveScreen] = useState('List');

  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerContent
          {...props}
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
      )}
      screenOptions={{
        drawerStyle: {
          width: 270,
        },
        headerShown: false,
      }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Schedule" component={Schedule} />
      <Drawer.Screen name="Quotes" component={Quotes} />
      <Drawer.Screen name="P/L" component={PL} />
      <Drawer.Screen name="Contacts" component={Contacts} />
      <Drawer.Screen name="Tutorials" component={Tutorials} />
      <Drawer.Screen name="Documents" component={Documents} />
      <Drawer.Screen name="Stock Order" component={StockOrder} />
      <Drawer.Screen name="Canvassing" component={Canvassing} />
      <Drawer.Screen name="Profile" component={Profile}/>
      <Drawer.Screen name="EditProfile" component={EditProfile}/>
      <Drawer.Screen name="New Contact" component={NewContact} />
      <Drawer.Screen name="Create Quote" component={CreateQuote} />
      <Drawer.Screen name="New Store Front" component={NewStoreFront} />
      <Drawer.Screen name="New Commercial" component={NewCommercial} />
      <Drawer.Screen name="New Residential" component={NewResidential} />
      <Drawer.Screen name="New Expenses" component={NewExpenses} />
      <Drawer.Screen name="Start Store" component={StartStore} />
      <Drawer.Screen name="Review" component={Review} />
      <Drawer.Screen name="Todays Schedule" component={TodayScheduled} />
      <Drawer.Screen name="Tommorow Schedule" component={TommorowScheduled} />
      <Drawer.Screen name="Job Schedule" component={OtherSchedule} />
      <Drawer.Screen name="Change Password" component={ChangePassowrd} />
      <Drawer.Screen name="Revenue" component={Revenue} />
      <Drawer.Screen name="Details" component={QuotesDetails} />
      <Drawer.Screen name="XeroQuoteDetails" component={XeroQuoteDetails} />
      <Drawer.Screen name="Expenses" component={Expenses} />
      <Drawer.Screen name="EditExpense" component={EditExpense} />
      <Drawer.Screen name="ExpenseList" component={ExpenseList} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="EditQuote" component={EditQuote} />
      <Drawer.Screen name="YoutubeVideo" component={YoutubeVideo} />
      <Drawer.Screen name="DocumentList" component={DocumentList} />
      <Drawer.Screen name="FranchiseDocumentList" component={FranchiseDocumentList} />
      <Drawer.Screen name="RiskAssessmentList" component={RiskAssessmentList} />
      <Drawer.Screen name="PdfView" component={PdfView} />
      <Drawer.Screen name="PdfViewRisk" component={PdfViewRisk} />
      <Drawer.Screen name="PdfViewDoc" component={PdfViewDoc} />
      <Drawer.Screen name="PdfViewRiskDoc" component={PdfViewRiskDoc} />
      <Drawer.Screen name="ProductStock" component={ProductStock} />
      <Drawer.Screen name="QuoteView" component={QuoteView} />
      <Drawer.Screen name="EditContact" component={EditNewContact} />
      <Drawer.Screen name="BookingDetail" component={BookingDetail} />
      <Drawer.Screen name="Contact Card" component={ContactCard} />
      <Drawer.Screen name="ViewInvoice" component={ViewInvoice} />
      <Drawer.Screen name="FreeDirectory" component={FreeDirectory} />
      <Drawer.Screen name="ViewExpenseInvoice" component={ViewExpenseInvoice} />
      <Drawer.Screen name="JobListingPage" component={JobListingPage} />
      <Drawer.Screen name="JobDescription" component={JobDescription} />
      <Drawer.Screen name="Home" component={MainDrawerScreen} />
      <Drawer.Screen name="HelpSupport" component={HelpSupport} />
      <Drawer.Screen name="ScheduleList" component={ScheduleList} />
      <Drawer.Screen name="PdfViewer" component={PdfViewer} />
      <Drawer.Screen name="Settings" component={PaymentMethod} />
    </Drawer.Navigator>
  );
};


export default MainDrawerScreen;
