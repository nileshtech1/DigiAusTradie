import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const ObligationsStyle = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      marginBottom: 40,
      marginTop: 10,
      borderRadius: 10,
    },
    cell: {
      backgroundColor: Colors.grey_bg_Color, 
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6, 
      marginBottom: 20,
      borderWidth: 1, 
      borderColor: '#333', 
      padding: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    column: {
      flex: 1,
      alignItems: 'center',
    },
    label: {
      fontSize: 16,
      color: Colors.white_text_color,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    value: {
      fontSize: 16,
      color: Colors.blue_theme_Color,
      fontWeight: 'bold',
      paddingHorizontal: 15,
      paddingVertical: 5,
      textAlign: 'center',
      backgroundColor: Colors.black_bg_Theme, 
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6, 
      borderWidth: 1, 
      borderColor: '#333', 
    },
  });

export default ObligationsStyle;