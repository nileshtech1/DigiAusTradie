import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const ChangePasswordStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black_bg_Theme,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    heading: {
      fontSize: 22,
      marginBottom: 20,
      textAlign: 'center',
      color: Colors.blue_theme_Color,
    },
    input: {
      width: '100%',
      backgroundColor: Colors.black_bg_Theme,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
      marginBottom: 20,
    },
    button: {
      width: '100%',
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

export default ChangePasswordStyle; 