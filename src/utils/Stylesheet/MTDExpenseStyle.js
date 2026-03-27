import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const MTDExpenseStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black_text_color,
    },
    contentContainer: {
      flex: 1,
      marginHorizontal: 20,
    },
    chartContainer: {
      marginVertical: 20,
      alignItems: 'center',
    },
    chartContainer1: {
      marginVertical: 20,
      alignItems: 'center',
      backgroundColor : Colors.white_text_color
    },
    tabContainer: {
      flex: 1,
      marginTop: 20,
    },
    tabHeader: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 4},
      elevation: 6,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#333',
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
    },
    activeTab: {
      // borderBottomWidth: 2,
      // borderBottomColor: '#CABEFFFF',
      backgroundColor: Colors.blue_theme_Color,
      paddingHorizontal: 10,
      paddingVertical: 5,
      justifyContent: 'center',
      borderRadius: 10,
    },
    tabText: {
      color: Colors.white_text_color,
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'serif',
      textAlign: 'center',
    },
    activeTabText: {
      fontWeight: 'bold',
      color: '#FFFFFFFF',
      textAlign: 'center',
    },
    tabContent: {
      flex: 1,
      marginTop: 5,
    },
    legendContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    legendColor: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 2,
    },
    legendText: {
      color: Colors.white_text_color,
      fontSize: 12,
      marginRight : 8
    },
      noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        backgroundColor: Colors.grey_bg_Color,
        borderRadius: 10,
        marginVertical: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
        borderWidth: 1,
        borderColor: '#333',
      },
    
      noDataText: {
        color: '#888',
        fontSize: 14,
      },
  });

  export default MTDExpenseStyle;