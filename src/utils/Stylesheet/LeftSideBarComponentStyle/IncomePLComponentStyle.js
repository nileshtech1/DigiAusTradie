import { StyleSheet } from "react-native";
import Colors from "../../../Assets/Style/Color";

const IncomePLComponentStyle = StyleSheet.create({
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: Colors.grey_bg_Color,
      paddingVertical: 10,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: Colors.Neon_Blue_Theme_Color,
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    rowText: {
      fontSize: 16,
      color: Colors.white_text_color,
    },
    totalBoldText: {
      fontSize: 16,
      color: Colors.Neon_Blue_Theme_Color,
      fontWeight: 'bold',
    },
    cell1: {
      flex: 1,
    },
    cell2: {
      flex: 0.6,
    },
    cell3: {
      flex: 0.4,
    },
    headerCell1: {
      flex: 0.7,
      marginRight : 10
    },
    headerCell2: {
      flex: 0.5,
      marginRight : 10
  
    },
    headerCell3: {
      flex: 0.4,
    },
  });

export default IncomePLComponentStyle;