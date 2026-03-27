import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const NewContactStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black_bg_Theme,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      margin: 10,
      textAlign: 'center',
      color: Colors.blue_theme_Color,
    },
    checkboxGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 10,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
      marginBottom: 8,
      backgroundColor: Colors.blue_theme_Color,
      padding: 10,
      width: '45%',
      borderRadius: 10,
    },
    CheckBoxLabel: {
      color: '#fff',
      fontWeight: 'bold',
    },
    label: {
      fontSize: 14,
      color: Colors.white_text_color,
      marginBottom: 4,
      marginVertical: 5,
    },
    dropdownWrapper: {
      flex: 1,
      position: 'relative',
    },
    dropdown: {
      position: 'absolute',
      top: 78,
      left: 0,
      right: 0,
      backgroundColor: Colors.blue_theme_Color,
      // borderWidth: 0.5,
      // borderColor: '#ccc',
      borderRadius: 5,
      zIndex: 1,
      elevation: 1,
      height: 'auto',
      maxHeight: 240,
    },
    dropdownItem: {
      padding: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc',
    },
    dropdownText: {
      fontSize: 16,
      color: Colors.white_text_color,
    },
    button: {
      marginTop: 16,
      marginBottom: 50,
      borderRadius: 10,
      backgroundColor: Colors.blue_theme_Color,
    },
    inputWithIcon: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.7,
      borderColor: '#7E7C7CFF',
      borderRadius: 5,
      height: 50,
      paddingHorizontal: 10,
      marginBottom: 8,
      backgroundColor: Colors.black_bg_Theme,
      marginRight: 5,
    },
    CustomerDropdown: {
      flex: 1,
      top: -2,
      left: 0,
      right: 0,
      backgroundColor: Colors.blue_theme_Color,
      // borderWidth: 0.5,
      // borderColor: '#ccc',
      // borderRadius: 5,
      // zIndex: 1,
      // elevation: 1,
      maxHeight: 250,
      overflow: 'scroll',
    },
    crossIcon :{
      marginRight : 6
    },
    errorText: {
      color: 'red',
      fontSize: 12,
    },
    inputError: {
      borderWidth: 2,
      borderColor: 'red',
    },
    cancelButton : {
      padding : 5,
      backgroundColor : Colors.grey_bg_Color,
      borderBottomLeftRadius : 5,
      borderBottomRightRadius : 5,
      borderWidth : 0.3,
      borderColor : '#ccc'
    },
    cancelText : {
      textAlign : 'center',
      color : Colors.white_text_color,
      fontWeight : 'bold'
    },
    asterisk: {
      color: 'red',
    },
  });

  export default NewContactStyle;