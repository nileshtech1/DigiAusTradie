import { StyleSheet } from "react-native";
import Colors from "../../../Assets/Style/Color";

const ScheduleStyle = StyleSheet.create({
    container : {
     flex : 1,
     backgroundColor : Colors.black_bg_Theme
    },
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      padding: 2,
      // backgroundColor : Colors.grey_bg_Color,
      margin: 5
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
      // marginVertical: 2,
      justifyContent: 'center',
    },
    categoryColorBox: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 20,
      height: 10,
      borderRadius: 2,
      marginBottom: 5,
    },
    categoryText: {
      textAlign: 'center',
      marginBottom : 5,
      marginLeft : 10,
      color : Colors.white_text_color,
      fontWeight : 'bold',
      fontSize : 12
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
  });

export default ScheduleStyle;