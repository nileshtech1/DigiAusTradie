import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const OtherScheduleStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : Colors.black_bg_Theme
    },
    contentContainer: {
      flex: 1,
      paddingTop: 10,
    },
    header: {
      color: Colors.blue_theme_Color,
      // backgroundColor : Colors.bgwhite,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 5,
      borderRadius: 10,
      fontFamily: 'sans-serif',
    },
    timeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#333333',
      paddingVertical: 5,
      // backgroundColor: '#ffffff',
      borderRadius: 5,
    },
    timeLabel: {
      color: Colors.white_text_color,
      fontSize: 16,
      width: '20%',
      textAlign: 'center',
    },
    label: {
      color: Colors.black_text_color,
      fontSize: 14,
      textAlign: 'center',
    },
    timeSection: {
      width: '79%',
      backgroundColor: Colors.grey_bg_Color,
      padding: 10,
      borderRadius: 5,
    },
    highlightedSection: {
      backgroundColor: '#3D85C6',
    },
    eventText: {
      color: '#ffffff',
      fontSize: 14,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#ffffff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 15,
      marginBottom: 10,
      fontWeight: 'bold',
      color: Colors.blue_theme_Color,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 5,
      borderBottomWidth: 2,
      borderBottomColor: Colors.theme_background_dark,
      borderWidth: 0.5,
      borderColor: Colors.theme_background_dark,
    },
    timePickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 60,
    },
    inputWithIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.7,
      borderRadius: 5,
      height: 50,
      paddingHorizontal: 10,
      marginBottom: 8,
      backgroundColor: '#ffffff',
      marginRight: 5,
    },
    inputField: {
      width: '90%',
      backgroundColor: 'white',
      marginLeft: 10,
    },
    dropdownWrapper: {
      flex: 1,
      position: 'relative',
    },
    CustomerDropdown: {
      position: 'absolute',
      flex: 1,
      top: 50,
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      borderWidth: 0.5,
      borderColor: '#ccc',
      borderRadius: 5,
      zIndex: 1,
      elevation: 1,
      height: 'auto',
      maxHeight: 150,
      marginBottom: 20,
    },
    CustomerDropdown1: {
      position: 'absolute',
      flex: 1,
      top: 69,
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      borderWidth: 0.5,
      borderColor: '#ccc',
      borderRadius: 5,
      zIndex: 1,
      elevation: 1,
      height: 'auto',
      maxHeight: 100,
      marginBottom: 20,
    },
    dropdownItem: {
      flex: 1,
      padding: 8,
      backgroundColor: Colors.blue_theme_Color,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropdownText: {
      fontSize: 16,
      color: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 20,
    },
    button1: {
      backgroundColor: Colors.pink_theme_color,
      width: 100,
      justifyContent: 'center',
      borderRadius: 5,
      height: 40,
    },
    button2: {
      backgroundColor: Colors.green_color,
      width: 100,
      height: 40,
      justifyContent: 'center',
      borderRadius: 5,
      marginLeft: 5,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    showEventContainer: {
      backgroundColor: Colors.blue_theme_Color,
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 5,
    },
    openButton: {
      padding: 15,
      backgroundColor: '#007bff',
      borderRadius: 5,
      width: 130,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
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
    rowView : {
      justifyContent : 'center',
       flexDirection : 'row', 
       alignItems : 'center',
    },
    deletButton : {
    
    },
    eyeButton : {
      padding : 10
    },
    bookedTimeSlot: {
      backgroundColor: 'rgba(0,255,0,0.3)' // Light green
    },
    showEventContainer: {
      padding: 10,
      borderRadius: 8,
      justifyContent: 'center',
      height: '100%', // so dynamicHeight works
    }
    
  });
export default OtherScheduleStyle;