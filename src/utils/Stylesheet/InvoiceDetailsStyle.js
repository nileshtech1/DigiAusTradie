// InvoiceDetailsStyle.js (Updated with note field style)
import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const InvoiceDetailsStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.eerie_black_color,
    },
    scrollViewContent: {
      paddingBottom: 20,
    },
    contentContainer: {
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    headerSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      flexWrap: 'wrap',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: Colors.white_text_color,
      marginRight: 10,
    },
    editIconContainer: {
        padding: 5,
        marginLeft: 'auto',
        backgroundColor: Colors.blue_theme_Color,
        borderRadius: 20,
    },
    card: {
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 12,
      padding: 20,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: Colors.sidebar_Active_grey,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: Colors.blue_crayola_color,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: Colors.charcol_color,
      paddingBottom: 10,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    detailLabel: {
      fontSize: 15,
      color: Colors.philippine_silver_color,
      fontWeight: '500',
    },
    detailValue: {
      fontSize: 15,
      color: Colors.white_text_color,
      fontWeight: '600',
      textAlign: 'right',
    },
    statusBadge: {
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: 20,
      marginLeft: 'auto',
    },
    statusText: {
      color: Colors.white_text_color,
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    statusPaid: {
      backgroundColor: Colors.green_color,
    },
    statusDue: {
      backgroundColor: Colors.lava_color,
    },
    partialsDue: {
      backgroundColor: Colors.red_crayola_color,
    },
    statusDefault: {
      backgroundColor: Colors.gray_html_color,
    },
    buttonContainer: {
      marginTop: 20,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.blue_theme_Color,
      paddingVertical: 15,
      borderRadius: 12,
      shadowColor: Colors.blue_theme_Color,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    },
    shareButton: {
      backgroundColor: Colors.teal_color,
      marginTop: 15,
    },
    actionButtonText: {
      color: Colors.white_text_color,
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonIcon: {
      marginRight: 10,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: Colors.grey_bg_Color,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: Colors.charcol_color,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: Colors.white_text_color,
    },
    closeButton: {
      padding: 5,
    },
    webView: {
      flex: 1,
      backgroundColor: Colors.grey_bg_Color,
    },
    loaderContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderText: {
      marginTop: 10,
      fontSize: 16,
      color: Colors.white_text_color,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.grey_bg_Color,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    // Payment Modal Styles (updated for single button & note)
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    paymentModalContainer: {
        backgroundColor: Colors.eerie_black_color,
        borderRadius: 12,
        padding: 25,
        width: '90%',
        maxHeight: '90%',
        shadowColor: Colors.blue_crayola_color,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 1,
        borderColor: Colors.sidebar_Active_grey,
    },
    paymentModalCloseButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        padding: 8,
        zIndex: 1,
    },
    paymentModalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.blue_crayola_color,
        marginBottom: 25,
        textAlign: 'center',
    },
    paymentModalScrollView: {
        flexGrow: 1,
    },
    paymentDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
        paddingVertical: 3,
    },
    paymentDetailLabel: {
        fontSize: 16,
        color: Colors.philippine_silver_color,
        fontWeight: '500',
    },
    paymentDetailValue: {
        fontSize: 16,
        color: Colors.white_text_color,
        fontWeight: '600',
        textAlign: 'right',
    },
    inputLabel: {
        fontSize: 16,
        color: Colors.white_text_color,
        marginTop: 20,
        alignSelf: 'flex-start',
        marginBottom: 8,
        fontWeight: '500',
    },
    amountInput: {
        borderWidth: 1,
        borderColor: Colors.sidebar_Active_grey,
        borderRadius: 10,
        paddingHorizontal: 15,
        // paddingVertical: 12,
        fontSize: 16,
        width: '100%',
        marginBottom: 15,
        color: Colors.white_text_color,
        backgroundColor: Colors.black_bg_Theme,
    },
    // New style for note field to allow multiple lines
    noteInput: {
        height: 100, // Adjust height as needed
        textAlignVertical: 'top', // Make text start from the top
        paddingTop: 12,
        // paddingBottom: 12,
    },
    errorText: {
        color: Colors.lava_color,
        fontSize: 14,
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    paymentMethodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.black_bg_Theme,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        margin: 5,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    paymentMethodButtonSelected: {
        borderColor: Colors.blue_theme_Color,
        backgroundColor: Colors.black_bg_Theme,
    },
    paymentMethodText: {
        color: Colors.philippine_silver_color,
        marginLeft: 8,
        fontWeight: '500',
    },
    paymentMethodTextSelected: {
        color: Colors.white_text_color,
        fontWeight: 'bold',
    },
    paymentInputFieldContainer: {
        width: '100%',
        // marginBottom: 10,
    },
    paymentButtonContainer: {
        // No longer 'space-between' as there's only one button
        justifyContent: 'center', // Center the single button
        width: '100%',
        marginTop: 10,
    },
    paymentButton: {
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 10,
        // Removed flex: 1, marginHorizontal: 5
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: Colors.blue_theme_Color, // Ensure single button uses the blue theme color
        width: '90%', // Make it slightly narrower than full width
        alignSelf: 'center', // Center it horizontally
    },
    // partialPayButton and fullPayButton are no longer used for separate buttons but kept if styling needs to be reused
    partialPayButton: {
        backgroundColor: Colors.teal_color,
    },
    fullPayButton: {
        backgroundColor: Colors.blue_theme_Color,
    },
    paymentButtonText: {
        color: Colors.white_text_color,
        fontSize: 16,
        fontWeight: 'bold',
    },
    paidStatusText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.green_color,
        marginTop: 25,
        textAlign: 'center',
    },
  //   dateInputButton: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     borderWidth: 1,
  //     borderColor: Colors.sidebar_Active_grey,
  //     borderRadius: 10,
  //     backgroundColor: Colors.black_bg_Theme,
  //     marginBottom: 15,
  //     width: '100%',
  // },
  calendarIcon: {
      position: 'absolute',
      right: 15,
      paddingVertical: 12, // Align vertically with input text
  },
  });

export default InvoiceDetailsStyle;