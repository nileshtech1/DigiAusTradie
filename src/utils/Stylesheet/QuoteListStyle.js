import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const QuoteListStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black_bg_Theme,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    dateRangeContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
      marginLeft: 10,
    },
    dateRangeText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: Colors.blue_theme_Color,
    },
    dateInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateInput: {
      marginHorizontal: 5,
      width: '100%',
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 5,
      elevation: 5,
      borderWidth: 1,
      borderColor: Colors.blue_theme_Color,
      textAlign: 'center',
      fontSize: 12,
      padding: 10,
      color: Colors.white_text_color,
    },
    dateInput1: {
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 5,
      elevation: 5,
      borderWidth: 1,
      borderColor: Colors.blue_theme_Color,
      textAlign: 'center',
      fontSize: 12,
      padding: 10,
    },
    toText: {
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft: 8,
      color: Colors.blue_theme_Color,
    },
    summaryRow: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    summaryBox: {
      flex: 1,
      alignItems: 'center',
    },
    summaryText: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: Colors.blue_theme_Color,
      marginHorizontal: 5,
      elevation: 2,
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 5,
      marginVertical: 5,
      fontSize: 12,
      color: Colors.white_text_color,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.Neon_Blue_Theme_Color,
    },
    labelTop: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.Neon_Blue_Theme_Color,
      textAlign: 'center',
    },
    card: {
      padding: 5,
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 4},
      elevation: 6,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#333',
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    cardItem: {
      flex: 1,
      alignItems: 'center',
    },
    cardItem1: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.blue_theme_Color,
      borderRadius: 5,
    },
    cardLabel: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
      color: Colors.Neon_Blue_Theme_Color,
    },
    cardLabel1: {
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 5,
      color: Colors.bgwhite,
      marginRight: 5,
      textAlign: 'center',
    },
    cardValue: {
      fontSize: 14,
      color: Colors.white_text_color,
    },
    cardValue1: {
      fontSize: 14,
      color: Colors.black_text_color,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    listContainer: {
      flex: 1, // Ensures the FlatList takes the remaining space
    },
    downloadIcon: {
      paddingRight: 10, // Optional, to give space from the edge if needed
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flex: 0, // Ensure that the icon doesn't take up unnecessary space
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.theme_background_dark,
      textAlign: 'center', // Ensure the title is aligned to the left
    },
    noDataText: {
      textAlign: 'center',
      fontSize: 18,
      color: Colors.theme_background_dark,
      marginTop: 20,
      textAlign: 'center',
      color: Colors.white_text_color,
    },
    checkboxContainer: {
      marginBottom: 5,
      flexDirection: 'row',
    },
    checkboxItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      flex: 1,
    },
    Button: {
      backgroundColor: Colors.theme_background_dark,
      flex: 1,
      margin: 5,
      padding: 5,
    },
    modalButtonText: {
      textAlign: 'center',
      color: Colors.white_text_color,
    },
    imgContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    img: {
      width: 300,
      height: 200,
      borderRadius: 10,
      resizeMode: 'contain',
    },
    smallImageContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    smallImage: {
      width: 60,
      height: 60,
      marginRight: 10,
      borderRadius: 5,
    },
    datetext: {
      color: Colors.white_text_color,
    },
  });
  export default QuoteListStyle;