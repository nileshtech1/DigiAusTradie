import { StyleSheet } from "react-native";
import Colors from "../../../Assets/Style/Color";

const OtherQuoteQuoteViewStyle = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: Colors.green_color,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        width : '90%',
        maxHeight: '80%', // Prevents the modal from taking up the entire screen
        backgroundColor: Colors.grey_bg_Color,
        borderRadius: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#333',
      },
    content: {
      margin: 6,
      // borderRadius: 8,
      backgroundColor: Colors.grey_bg_Color,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 5,
      padding: 10,
      // justifyContent: 'center',
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 15,
      color: Colors.white_text_color,
      textAlign: 'center',
    },
    title1: {
      fontSize: 15,
      fontWeight: 'bold',
      color: Colors.white_text_color,
      textAlign: 'center',
      backgroundColor: Colors.green_color, 
      borderRadius: 5,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6, 
      marginBottom: 10,
      borderWidth: 1, 
      borderColor: '#333',
    },
    imgContainer: {
      alignItems: 'center',
      // backgroundColor: Colors.grey_bg_Color, 
      borderRadius: 10,
      padding : 5,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      marginBottom: 10,
      borderWidth: 1, 
      borderColor: '#333', 
    },
    img: {
      width: '100%',
      height: 150,
      resizeMode: 'contain',
      borderRadius: 8,
    },
    smallImageContainer: {
      flexDirection: 'row',
      marginBottom: 15,
    
    },
    smallImage: {
      width: 80,
      height: 80,
      marginRight: 10,
      borderRadius: 8,
    },
    swmsImage: {
      width: 30,
      height: 30,
      marginRight: 10,
      borderRadius: 8,
    },
    cardBox :{
      backgroundColor : Colors.grey_bg_Color,
      borderRadius : 5
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    cardItem: {
      flex : 1,
      marginLeft : 20
    },
    cardItem1: {
      flex : 1,
      marginLeft : 20
    },
    quoteItem : {
      flex : 1,
      backgroundColor: Colors.grey_bg_Color, 
      borderRadius: 5,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6, 
      marginBottom: 10,
      borderWidth: 1, 
      borderColor: '#333', 
    },
    cardLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: Colors.blue_theme_Color,
    },
    cardValue1: {
      fontSize: 16,
      color: '#fff',
      marginBottom: 5,
    },
    quoteLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: Colors.blue_theme_Color,
      textAlign : 'center'
    },
    quotevalue: {
      fontSize: 16,
      color: '#fff',
      marginBottom: 5,
      textAlign : 'center'
    },
  });

export default OtherQuoteQuoteViewStyle;