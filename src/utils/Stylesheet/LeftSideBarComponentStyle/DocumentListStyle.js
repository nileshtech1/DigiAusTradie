import { StyleSheet } from "react-native";
import Colors from "../../../Assets/Style/Color";

const DocumentListStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black_bg_Theme,
    },
    contentContainer: {
      flex: 1,
      marginHorizontal: 20,
    },
    categoryName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 5,
      textAlign: 'center',
      color: Colors.Neon_Blue_Theme_Color,
    },
    documentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 4},
      elevation: 6,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#333',
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    documentTitle: {
      flex: 1,
      fontSize: 16,
      color: Colors.white_text_color,
      marginRight: 10,
      fontWeight: 'bold',
    },
    documentImage: {
      width: 50,
      height: 50,
      borderRadius: 8,
    },
    flatListContainer: {
      paddingBottom: 20,
    },
    noCategoryText: {
      textAlign: 'center',
      fontSize: 18,
      color: '#fff',
      marginTop: 20,
    },
  });

export default DocumentListStyle;