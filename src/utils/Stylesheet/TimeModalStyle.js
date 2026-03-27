import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const TimeModalStyle = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
    },
    timerText: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    stopButton: {
      backgroundColor: Colors.blue_theme_Color,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    stopButtonPause: {
      backgroundColor: Colors.pink_theme_color,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    stopButtonresume: {
      backgroundColor: Colors.green_color,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    stopButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
    Title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.theme_background_dark,
      textAlign: 'center',
    },
    CustomerName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.theme_background_dark,
      textAlign: 'center',
    },
    Date: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.theme_background_dark,
    },
    Day: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.theme_background_dark,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
    },
  });
export default TimeModalStyle;