import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const PaymentSettingsStyle = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0D0D0D" },
    scrollContentContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    heading: {
      fontSize: 22,
      fontWeight: "bold",
      marginVertical: 20,
      color: Colors.gray_html_color,
      textAlign: "center",
    },
    subHeading: {
      fontSize: 15,
      fontWeight: "600",
      color: Colors.gray_html_color,
      marginBottom: 15,
      marginTop: 10,
      textAlign: "center",
    },
    tabContainer: {
      flexDirection: "row",
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 12,
      marginBottom: 20,
      overflow: 'hidden',
    },
    tab: {
      flex: 1,
      paddingVertical: 15,
      alignItems: "center",
    },
    activeTab: {
      backgroundColor: Colors.blue_theme_Color,
    },
    tabText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "600",
      textAlign: 'center',
    },
    row: { // This style is for the old 'toggle methods' list, may not be directly used now.
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: Colors.black_bg_Theme,
      padding: 18,
      marginBottom: 14,
      borderRadius: 14,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    label: { fontSize: 16, fontWeight: "500", color: "#FFFFFF" },
    formContainer: {
      marginTop: 10,
      padding: 16,
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 12,
    },
    dropdownTrigger: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#333333',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#555',
    },
    dropdownTriggerText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    formSection: {
      marginBottom: 10,
    },
    input: {
      color: "#FFFFFF",
      borderBottomWidth: 1,
      borderBottomColor: "#555",
      paddingVertical: 10,
      fontSize: 16,
      marginBottom: 5,
    },
    inputError: {
      borderBottomColor: Colors.pink_theme_color,
    },
    errorText: {
      color: Colors.pink_theme_color,
      fontSize: 12,
      marginLeft: 5,
      marginBottom: 10,
    },
    infoText: {
      color: "#FFFFFF",
      fontSize: 15,
      textAlign: "center",
      paddingVertical: 20,
    },
    submitButton: {
      backgroundColor: Colors.blue_theme_Color,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 20,
    },
    submitButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
    paymentItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.black_bg_Theme,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    paymentItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 1,
    },
    paymentMethodTitle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    paymentMethodDetails: {
      color: Colors.gray_html_color,
      fontSize: 13,
      marginTop: 2,
      flexWrap: 'wrap',
    },
    paymentStatus: {
      fontSize: 12,
      marginTop: 5,
      fontWeight: 'bold',
    },
    paymentItemActions: {
      flexDirection: 'row',
      alignItems: 'center', // Align actions vertically in the center
      marginLeft: 10,
    },
    actionButton: {
      marginLeft: 15,
      padding: 5,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
      backgroundColor: Colors.grey_bg_Color,
      borderRadius: 15,
      padding: 25,
      width: '90%',
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 20,
      textAlign: 'center',
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    modalButton: {
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 10,
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: '#6C757D',
    },
    saveButton: {
      backgroundColor: Colors.blue_theme_Color,
    },
    modalButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  export default PaymentSettingsStyle