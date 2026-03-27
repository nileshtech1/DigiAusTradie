import {StyleSheet} from 'react-native';
import Colors from '../../Assets/Style/Color';

const CustomeCalender = StyleSheet.create({
  container: {
    flex: 1,
  },
  monthContainer: {
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: Colors.white_text_color,
  },
  daysOfWeekContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  dayText: {
    width: '13%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white_text_color,
    marginBottom: 5,
  },

  dateContainer: {width: '13%', alignItems: 'center'},

  selectedDateContainer: {padding: 15},
  selectedDateText: {fontSize: 16, fontWeight: 'bold'},
  dateText: {
    fontSize: 16,
  },
  overflowDateText: {
    color: '#ccc',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    width: '14.28%', 
    height: 150,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#666666FF',
    overflow: 'hidden',
  },
  dateButton: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    // backgroundColor: Colors.grey_bg_Color,
    marginBottom: 2,
    marginTop: 2,
  },
  dateText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  eventsContainer: {
    width: '100%',
  },
  eventBox: {
    // paddingVertical: 1,
    marginBottom: 1,
    // borderRadius: 5,
    // padding : 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  freeText : {
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  categoriesContainer: {
    height: 60, 
    width: '100%',
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexDirection: 'row',
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryColorBox: {
    width: 20, 
    height: 20,
    borderRadius: 15, 
    marginBottom: 5,
  },
  categoryText: {
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    top: 0,
    right: 20,
    backgroundColor: Colors.grey_bg_Color,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  todayStyle: {
    backgroundColor: Colors.banana_Yellow_color,
    borderRadius: 5,
  },
  todayTextStyle: {
    fontWeight: 'bold',
    color: 'black',
  },
  bookedStyle: {
    backgroundColor: Colors.green_color,
    borderRadius: 5,
  },
  freeBookingText: {
    color: Colors.black_text_color,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
    borderBottomWidth : 2,
    borderBottomColor : 'black'
  },
  freeBookingView: {
    backgroundColor: 'white',
  },
  overflowCell: {
    backgroundColor: Colors.grey_bg_Color, 
    opacity: 0.5,
},
});
export default CustomeCalender;
