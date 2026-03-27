import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";
const { height, width } = Dimensions.get('window'); // Get screen dimensions


const ScheduleModalStyle = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    backgroundPressable: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    modalContentContainer: {
        backgroundColor: Colors.white_text_color,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: height * 0.75, // Adjusted height to 75%
    },
    scrollableContent: {
        paddingBottom: 20, // Add some padding to the bottom of the scroll view
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'serif'
    },
    dropdownWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: Colors.granite_Gray_color,
        marginBottom: 8,
        fontWeight : 'bold'
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#BDBDBD',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#FAFAFA',
    },
    iconMargin: {
        marginRight: 8,
    },
    inputField: {
        flex: 1,
        fontSize: 16,
        color: '#424242',
        paddingVertical: 10,
    },
    CustomerDropdown: {
        maxHeight: 150,
        borderWidth: 1,
        borderColor: '#BDBDBD',
        borderRadius: 8,
        marginTop: 4,
        backgroundColor: '#FFFFFF',
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    dropdownText: {
        fontSize: 16,
        color: Colors.blue_theme_Color,
    },
    dropdownTextSmall: {
        fontSize: 12,
        color: '#757575',
    },
    timeSelectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', //Evenly Distribute in time container
        marginTop: 10,
    },
    openButton: {
        backgroundColor: Colors.Neon_Blue_Theme_Color,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: width * 0.40,
        marginBottom: 16,

    },
    buttonText: {
        color: Colors.white_text_color,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily : 'serif'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button1: {
        backgroundColor: Colors.pink_theme_color,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: width * 0.40, // 35% of screen width
    },
    button2: {
        backgroundColor: Colors.green_color,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: width * 0.40,
    },

    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      timeLabel: {
        color: Colors.white_text_color,
        marginBottom: 5,
      },
       toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
      },
      toggleLabel: {
        color: Colors.black_bg_Theme,
        fontSize: 16,
        // No marginRight here, as it's space-between
      },
      switchWithLabels: { // New style for the container of switch and labels
          flexDirection: 'row',
          alignItems: 'center',
      },
      toggleStateLabel: { // Style for YES/NO text
          fontSize: 14,
          color: Colors.grey, // Default color for inactive label
          fontWeight: 'bold', // Make them bold
      },
      activeToggleLabel: { // Style for the active label
          color: Colors.white_text_color, // Highlight color
      },
      switch: { // Style for the switch itself to add spacing
          marginHorizontal: 5, // Space between switch and labels
          borderWidth: 1,
          borderColor: Colors.white_text_color, 
          },
          AddressInput : {
            borderWidth: 0.6,
            borderColor: '#ccc',
            borderRadius: 4,
            padding: 10,
            marginHorizontal: 5,
            height: 80,
            backgroundColor: Colors.black_bg_Theme,
          }
});

export default ScheduleModalStyle;