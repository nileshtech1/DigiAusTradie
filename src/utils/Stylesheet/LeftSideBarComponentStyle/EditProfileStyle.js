import { StyleSheet } from "react-native";
import Colors from "../../../Assets/Style/Color";

const EditProfileStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black_bg_Theme,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 10,
    },
    saveButton: {
      backgroundColor: Colors.blue_theme_Color,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 50,
    },
    saveText: {
      color: '#fff',
      fontSize: 16,
    },
    img: {
      width: '100%',
      height: 100,
      borderRadius: 50,
    },
    imgContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    plusIcon: {
      position: 'absolute',
      left: 70,
      top: 75,
      // backgroundColor: Colors.blue_theme_Color,
      borderRadius: 20,
      paddingHorizontal: 5,
      paddingVertical: 2,
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
    dropdownWrapper: {
      flex: 1,
      position: 'relative',
    },
    dropdown: {
      position: 'absolute',
      top: 80,
      left: 0,
      right: 0,
      backgroundColor: Colors.blue_theme_Color,
      borderWidth: 0.5,
      borderColor: '#ccc',
      borderRadius: 5,
      zIndex: 1,
      elevation: 1,
      height: 'auto',
      maxHeight: 200,
    },
    dropdownItem: {
      padding: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc',
    },
    dropdownText: {
      fontSize: 16,
      color: '#fff',
    },
    button: {
      marginTop: 16,
      marginBottom: 40,
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
    label: {
      fontSize: 14,
      color: Colors.white_text_color,
      marginBottom: 4,
      marginVertical: 5,
    },
    uploadBox: {
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: Colors.blue_theme_Color,
      borderRadius: 10,
      paddingVertical: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 12,
      backgroundColor: '#1c1c1e',
    },
    
    uploadText: {
      color: '#888',
      fontSize: 15,
    },
    
    uploadPreview: {
      width: 120,
      height: 120,
      borderRadius: 8,
    },
    
    imagePreviewRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    workImageContainer: {
      position: 'relative',
      marginRight: 10,
      marginBottom: 10,
    },
    workImage: {
      width: 70,
      height: 70,
      borderRadius: 8,
    },
    removeImageButton: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: 'red',
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1, // Ensures the button is on top of the image
    },
    removeImageText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  


    tradeDropdownContainer: {
      backgroundColor: Colors.white_text_color,
      borderWidth: 1,
      borderColor: Colors.gray_text_color,
      borderRadius: 10,
      marginTop: -8,
      // marginHorizontal: 2,
      zIndex: 10,
      elevation: 5,
    },
    
    tradeListItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray_html_color,
    },
    
    tradeListItemSelected: {
      backgroundColor: Colors.Neon_Blue_Theme_Color,
    },
    
    tradeListItemText: {
      fontSize: 16,
      color: Colors.black_text_color,
    },
    
    tradeListItemTextSelected: {
      color: Colors.white_text_color,
    },
    
    
  });

export default EditProfileStyle;