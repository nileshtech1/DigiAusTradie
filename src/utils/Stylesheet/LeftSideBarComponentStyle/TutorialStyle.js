import { StyleSheet } from "react-native";
import Colors from "../../../Assets/Style/Color";

const TutorialStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black_bg_Theme,
    },
    contentContainer: {
      flex : 1,
      padding: 10,
    },
    title : {
      fontSize: 20,
      marginBottom: 10,
      textAlign: 'center',
      color: Colors.Neon_Blue_Theme_Color,
      fontWeight: 'bold',
    },
    rowContainer: {
      flex : 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    categoryItem: {
      flex : 1,
      padding: 20,
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#333',
    },
    categoryText: {
      flex: 1,
      fontSize: 16,
      color: Colors.white_text_color,
      fontWeight: 'bold',
      textAlign: 'left',
      marginLeft: 10,
    },
    subCategoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#444',
      borderRadius: 5,
    },
    subCategoryText: {
      fontSize: 14,
      color: Colors.white_text_color,
      marginRight: 10,
      flex: 1,
    },
    videoThumbnail: {
      width: 80,
      height: 50,
      borderRadius: 5,
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
    noCategoryText: {
      textAlign: 'center',
      fontSize: 18,
      color: Colors.white_text_color,
      marginTop: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  },
  modalContent: {
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
  },
  closeButtonContainer :{
      backgroundColor : Colors.pink_theme_color,
      paddingVertical : 10,
      paddingHorizontal : 20,
      borderRadius : 5,
      marginTop : 20
  },
  closeText : {
      color : Colors.white_text_color,
      fontWeight : 'bold'
  }
  });

export default TutorialStyle;