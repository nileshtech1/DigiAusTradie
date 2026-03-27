import { StyleSheet } from "react-native";
import Colors from "../../../Assets/Style/Color";

const CostOfSaleComponentStyle = StyleSheet.create({
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
      borderBottomColor: '#ddd',
    },
    rowText: {
      fontSize: 16,
      color: Colors.white_text_color,
    },
    totalBoldText: {
      fontSize: 16,
      color: Colors.white_text_color,
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
  });

export default CostOfSaleComponentStyle;
