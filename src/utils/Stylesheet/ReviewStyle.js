import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";
const { height, width } = Dimensions.get('window'); // Get screen dimensions

const ReviewStyle = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor : Colors.black_bg_Theme
  },
    card: {
      backgroundColor: Colors.grey_bg_Color,
      padding: 10,
      marginHorizontal: 15,
      marginVertical: 10,
      borderRadius: 10,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color : Colors.white_text_color,
    },
    valueLabel: {
      marginVertical: 5,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      marginVertical: 5,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      marginVertical: 2,
      marginHorizontal: 5,
      color : Colors.white_text_color,
    },
    value: {
      fontSize: 14,
      marginVertical: 2,
      marginHorizontal: 5,
      color : Colors.white_text_color
    },
    timeText: {
      fontSize: 11,
      marginVertical: 2,
      // marginHorizontal: 5,
      fontWeight : 'bold',
      color : Colors.white_text_color,
      textAlign : 'center'
    },
    input: {
      flex: 1,
      borderWidth: 0.6,
      borderColor: '#ccc',
      borderRadius: 4,
      paddingVertical: 10,
      paddingHorizontal : 2,
      marginHorizontal: 5,
      // height: 40,
      backgroundColor : Colors.black_bg_Theme
    },
    inputForNotes: {
      textAlign: 'center',
      justifyContent: 'center',
      borderWidth: 0.6,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 10,
      marginHorizontal: 5,
      height: 80,
      backgroundColor : Colors.black_bg_Theme
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 40,
    },
    button: {
      flex: 1,
      backgroundColor: Colors.blue_theme_Color,
      padding: 10,
      alignItems: 'center',
      borderRadius: 4,
      marginHorizontal: 5,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 16,
      marginBottom: 10,
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
    cancelButton: {
      backgroundColor: Colors.pink_theme_color,
    },
    confirmButton: {
      backgroundColor: Colors.blue_theme_Color,
    },
    dropdownWrapper: {
      flex: 1,
      position: 'relative',
    },
    CustomerDropdown: {
      position : 'absolute',
      flex: 1,
      top: -18,
      left: 0,
      right: 0,
      backgroundColor: Colors.blue_theme_Color,
      borderWidth: 0.5,
      borderColor: '#ccc',
      borderRadius: 5,
      zIndex: 1,
      elevation: 1,
      height: 'auto',
      maxHeight: 150,
      overflow: 'scroll',
    },
    inputWithIcon: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      paddingHorizontal: 10,
      marginRight: 5,
      backgroundColor: Colors.black_bg_Theme, 
      borderRadius: 5,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6, 
      marginBottom: 20,
      borderWidth: 0.4, 
      borderColor: '#ccc', 
      
    },
    dropdownItem: {
      padding: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc',
    },
    dropdownText: {
      fontSize: 16,
      color: '#fff',
      fontWeight : '500'
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
    skipButton: {
      backgroundColor: "orange", // Adjust color as needed
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    openButton: {
      backgroundColor: Colors.Neon_Blue_Theme_Color,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      width: width * 0.40,
      marginBottom: 16,
      marginHorizontal : 10,

  },
  buttonText: {
      color: Colors.white_text_color,
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily : 'serif'
  },    
  label: {
    fontSize: 16,
    color: Colors.white_text_color,
    marginBottom: 8,
    fontWeight : 'bold',
    marginHorizontal : 5,
},
label1: {
  fontSize: 16,
  color: Colors.black_bg_Theme,
  marginBottom: 8,
  fontWeight : 'bold',
  marginHorizontal : 10,
},
timeSelectionContainer : {
  flexDirection: 'row',
  justifyContent: 'space-between', //Evenly Distribute in time container
  marginTop: 10,
},


  });
  export default ReviewStyle;