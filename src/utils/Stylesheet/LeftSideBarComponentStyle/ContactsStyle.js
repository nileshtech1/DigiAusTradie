import { StyleSheet } from "react-native";
import Colors from "../../../Assets/Style/Color";

const ContactStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black_bg_Theme,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 15,
    },
    pieChartContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    contactItem: {
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
      marginBottom: 5,
      borderWidth: 1,
      borderColor: '#333',
      padding: 10,
      margin: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contactName: {
      fontSize: 18,
      flex: 1,
      color: Colors.white_text_color,
      fontWeight: 'bold',
    },
    gradientContainer: {
      flexDirection: 'row',
      marginTop: 10,
      height: 10,
      overflow: 'hidden',
    },
    gradientBarSegment: {
      width: 30,
      height: '100%',
    },
    colorCodesContainer: {
      marginVertical: 20,
    },
    colorItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    colorBox: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    colorLabel: {
      fontSize: 16,
      color: Colors.white_text_color,
      fontWeight: 'bold',
    },
    noCategoryText: {
      textAlign: 'center',
      fontSize: 18,
      color: '#fff',
      marginTop: 20,
    },
  });

export default  ContactStyle;