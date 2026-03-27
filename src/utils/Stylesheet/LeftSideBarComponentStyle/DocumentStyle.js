import { StyleSheet } from "react-native";
import Colors from "../../../Assets/Style/Color";

// Styles for the card, modal, and layout
const DocumentStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black_bg_Theme,
    },
    categoriesContainer: {
        flexDirection: 'column', // stack vertically
        marginTop: 20,
    },
    card: {
      width: '100%', // full width
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 4},
      elevation: 6,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#333',
      padding: 15,
      flexDirection: 'row', // add row for icon + text
      alignItems: 'center',
      gap: 10, // add spacing between icon and text (optional)
    },
    cardText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.white_text_color,
      flex: 1, // take available space if needed
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: Colors.Neon_Blue_Theme_Color,
      marginBottom : 10
    },
    button: {
      backgroundColor: Colors.Neon_Blue_Theme_Color, // Primary color for the button
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 2},
      marginTop: 20,
    },
    documentName : {
      fontSize: 16, 
      fontWeight: 'bold', 
      marginBottom: 5, 
      color: Colors.blue_theme_Color,
    },
    documentNameInput : {
      width : '100%',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      paddingHorizontal: 10,
      height: 80,
      fontSize: 16,
      color: '#000',
      backgroundColor: '#fff',
      marginRight : 5
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 8,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: Colors.blue_theme_Color,
    },
    input: {
      flex: 1,
      paddingHorizontal: 8,
      height: 50,
      marginRight: 10, // Add some space between input and button
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
    },
    selectedFile: {
      fontSize: 14,
      color: '#000000',
      marginBottom: 15,
      fontWeight: 'bold',
    },
    selectFileButton: {
      flexDirection: 'row',
      backgroundColor: Colors.blue_theme_Color,
      paddingVertical: 12,
      width: 250,
      borderRadius: 8,
      marginTop: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadButton: {
      backgroundColor: Colors.green_color,
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 8,
      marginTop: 10,
      marginLeft: 5,
    },
    cancelButton: {
      backgroundColor: Colors.pink_theme_color,
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 8,
      marginTop: 10,
    },
    rowContainer: {
      flexDirection: 'row', // Arrange items in a row
      alignItems: 'center',
      marginBottom: 15,
    },
    noCategoryText: {
      textAlign: 'center',
      fontSize: 18,
      color: '#000',
      marginTop: 20,
    },
    waitText: {
      flex: 1,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
      color: Colors.Neon_Blue_Theme_Color, // Or any color you'd like
      paddingVertical: 15,
    },
    
  });

export default DocumentStyle;