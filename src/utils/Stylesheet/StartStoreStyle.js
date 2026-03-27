import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const StartStoreStyle = StyleSheet.create({
    container : {
       flex: 1,
       backgroundColor : Colors.black_bg_Theme
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '95%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    modalButton: {
      flex: 1,
      margin: 5,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    confirmButton: {
      backgroundColor: Colors.blue_theme_Color,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight : 'bold'
    },
    sliderValue: {
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 10,
      fontWeight: 'bold',
    },
    emojiContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
      width: '100%',
    },
    emojiItem: {
      alignItems: 'center',
      paddingHorizontal: 1,
    },
    selectedEmoji: {
      borderWidth: 2,
      borderColor: Colors.blue_theme_Color,
      borderRadius: 10,
    },
    emojiLabel: {
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 5,
    },
    time: {
      color: Colors.blue_theme_Color,
      fontWeight: 'bold',
      fontSize: 16,
    },
    noTextContainer : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center'
    },
    noText : {
      fontSize : 16,
      color : Colors.white_text_color,
      textAlign : 'center'
    },
    animation: {
      width: "100%",
      height: 120,
      // backgroundColor : Colors.black_bg_Theme,
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
  });
export default StartStoreStyle;