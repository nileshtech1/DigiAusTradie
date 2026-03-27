import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const ForgetPasswordStyle = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: Colors.black_bg_Theme,
      paddingTop: 40,
    },
    instructions: {
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
      shadowOffset: {width: 0, height: 4},
      elevation: 6,
      marginBottom: 20,
    },
    button: {
      width: '100%',
    },
      title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color : Colors.blue_theme_Color
      },
  });

export default ForgetPasswordStyle;