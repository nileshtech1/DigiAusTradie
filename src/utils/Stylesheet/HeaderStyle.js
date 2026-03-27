import { Platform, StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const HeaderStyle = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
     paddingTop: Platform.OS === 'android' ? 40 : 0, 
      paddingVertical: 20,
      backgroundColor: Colors.grey_bg_Color,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderLeftWidth: 0.5,
      borderLeftColor: '#444',
      borderRightWidth: 0.5,
      borderRightColor: '#444',
      borderBottomWidth: 0.5,
      borderBottomColor: '#444',
      position: 'relative',
      zIndex: 1,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerCenter: {
      flex: 1,
      alignItems: 'flex-start',
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      height: 40,
      width: 100,
      resizeMode: 'contain',
    },
    iconButton: {
      marginHorizontal: 10,
    },
    notificationBadge: {
      position: 'absolute',
      top: -4,
      right: 5,
      backgroundColor: 'red',
      borderRadius: 10,
      minWidth: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 2,
    },
    notificationText: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
    },
    timeContainer: {
      backgroundColor: 'white',
      paddingHorizontal: 5,
      elevation: 5,
      borderWidth: 0.7,
      borderColor: '#ccc',
      borderRadius: 10,
    },
    timeText: {
      fontSize: 12,
      color: Colors.black_text_color,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      alignItems: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingTop: 60,
      paddingRight: 10,
    },
    modalContent: {
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: 200,
      borderRadius: 10,
    },
    logo1: {
      width: '100%',
      height: 90,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      width: 180,
    },
    modalText: {
      fontSize: 18,
      marginLeft: 10,
      color: '#000',
    },
    modalText1: {
      width: '100%',
      fontSize: 18,
      textAlign: 'center',
      color: '#000',
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: 10,
      padding: 10,
    },
    modalOverlayLog: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContentLog: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTextLog: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
    },
    modalActionsLog: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    modalButtonLog: {
      flex: 1,
      margin: 5,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    cancelButtonLog: {
      backgroundColor: Colors.begonia_color,
    },
    confirmButtonLog: {
      backgroundColor: Colors.theme_background_dark,
    },
    buttonTextLog: {
      color: '#fff',
      fontSize: 16,
    },
  });

export default HeaderStyle;