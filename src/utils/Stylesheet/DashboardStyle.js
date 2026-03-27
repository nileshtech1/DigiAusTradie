import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import Colors from '../../Assets/Style/Color';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  return PixelRatio.roundToNearestPixel((screenWidth * parseFloat(widthPercent)) / 100);
};

const heightPercentageToDP = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
  return PixelRatio.roundToNearestPixel((screenHeight * parseFloat(heightPercent)) / 100);
};

const RFValue = (fontSize, standardScreenWidth = 375) => {
  const widthPercent = (fontSize / standardScreenWidth) * 100;
  return widthPercentageToDP(`${widthPercent}%`);
};


const DashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_bg_Theme,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: heightPercentageToDP('1.5%'),
  },
  chartWrapper: {
    width: widthPercentageToDP('47%'),
    height: heightPercentageToDP('35%'), // Adjusted from fixed 280
    padding: widthPercentageToDP('2.5%'),
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelsContainer: {
    marginTop: heightPercentageToDP('1%'),
    justifyContent: 'center',
  },
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: heightPercentageToDP('0.5%'),
  },
  colorBox: {
    width: 15,
    height: 15,
    marginRight: 10,
    borderRadius: 3,
  },
  labelText: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: '#fff',
  },
  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: heightPercentageToDP('2%'),
  },
  todaysContainer: {
    backgroundColor: Colors.blue_theme_Color,
    marginBottom: heightPercentageToDP('1.5%'),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.theme_background_dark,
    paddingBottom: heightPercentageToDP('4%'),
  },
  scheduleBox: {
    width: widthPercentageToDP('47%'),
    height: heightPercentageToDP('35%'), // Adjusted from fixed 280
    padding: widthPercentageToDP('2.5%'),
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
  },
  scheduleTitle: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginBottom: heightPercentageToDP('1%'),
    textAlign: 'center',
    color: '#fff',
  },
  scheduleSubTitle: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginBottom: heightPercentageToDP('0.5%'),
    textAlign: 'center',
    color: Colors.Neon_Blue_Theme_Color,
  },
  scheduleScrollView: {
    paddingBottom: heightPercentageToDP('1%'),
  },
  actionButton: {
    borderRadius: 5,
    padding: widthPercentageToDP('1.5%'),
    marginHorizontal: widthPercentageToDP('12%'),
    // marginBottom: heightPercentageToDP('3%'),
    marginBottom : 50
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: RFValue(18),
  },
  todaysCustomer: {
    textAlign: 'center',
    marginVertical: heightPercentageToDP('0.5%'),
    color: Colors.white_Icon_Color,
    fontSize: RFValue(13)
  },
  todayTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: Colors.white_Icon_Color,
    borderWidth: 1,
    marginHorizontal: widthPercentageToDP('1%'),
    padding: widthPercentageToDP('1%'),
    borderRadius: 10,
  },
  notes: {
    borderWidth: 1,
    borderColor: Colors.white_Icon_Color,
    backgroundColor: 'transparent',
    textAlign: 'center',
    padding: widthPercentageToDP('1.5%'),
    marginHorizontal: widthPercentageToDP('1%'),
    color: Colors.white_Icon_Color,
    borderRadius: 10,
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  address: {
    borderWidth: 1,
    borderColor: Colors.white_Icon_Color,
    backgroundColor: 'transparent',
    color: Colors.white_Icon_Color,
    textAlign: 'center',
    padding: widthPercentageToDP('1.5%'),
    marginHorizontal: widthPercentageToDP('1%'),
    marginBottom: heightPercentageToDP('1%'),
    marginTop: heightPercentageToDP('0.5%'), // Replaced 'top' with 'marginTop'
    borderRadius: 10,
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  tomDetailCont: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#444444',
    borderWidth: 0.3,
    padding: widthPercentageToDP('1%'),
    marginBottom: heightPercentageToDP('1%'),
    borderRadius: 5,
  },
  tomTimeContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: widthPercentageToDP('1.5%'),
    paddingVertical: heightPercentageToDP('0.2%'),
  },
  estimateTime: {
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.white_Icon_Color,
    color: Colors.white_Icon_Color,
    fontSize: RFValue(13),
  },
  plButton: {
    position: 'absolute',
    zIndex: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    top: '47%',
    height: heightPercentageToDP('8%'), 
    width: heightPercentageToDP('8%'),
    backgroundColor: Colors.black_bg_Theme,
    paddingHorizontal: 6,
    borderRadius: heightPercentageToDP('4%'), 
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginRight: 8,
  },
  plButtonText: {
    color: Colors.white_text_color,
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    padding: 10,
  },
  bottomArrowIcon: {
    bottom: 10,
    right: 0,
    position: 'absolute',
    marginRight: -2,
  },
  noScheduleText: {
    textAlign: 'center',
    color: Colors.banana_Yellow_color,
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },
  animation: {
    width: '100%',
    height: heightPercentageToDP('15%'), // Adjusted from fixed 120
  },
  label: {
    fontSize: RFValue(14),
    color: Colors.white_text_color,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: heightPercentageToDP('0.5%'),
  },
  rowItem: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: Colors.gray_html_color,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  rowLabel: {
    fontSize: RFValue(12),
    color: '#fff',
  },
  percentageLabel: {
    fontSize: RFValue(12),
    color: Colors.white_text_color,
    fontWeight: '500',
},
loaderContainer: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 9999,
},
loader: {
  justifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: Colors.black_bg_Theme,
  padding: 20,
  borderRadius: 10,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: {width: 0, height: 4},
  // elevation: 6,
  // borderWidth: 1,
  // borderColor: '#333',
},
loaderText: {
color: Colors.white_text_color,
fontSize: 16,
marginTop: 10,
fontWeight: 'bold',
},
});

export default DashboardStyle;