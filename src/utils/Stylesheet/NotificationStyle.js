import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const NotificationStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black_bg_Theme,
    },
    notification: {
      backgroundColor: Colors.grey_bg_Color,
      padding: 18,
      marginBottom: 15,
      borderRadius: 12,
      elevation: 3,
      borderWidth: 0.5,
      borderColor: Colors.Neon_Blue_Theme_Color,
    },
    newNotification: {
      backgroundColor: Colors.grey_bg_Color,
      borderColor: Colors.Neon_SkyBlue_Theme_color,
    },
    notificationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    notificationContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      
    },
    message: {
      fontSize: 14,
      color: Colors.Neon_Blue_Theme_Color,
      maxWidth: '85%',
      
    },
    title: {
      fontSize: 16,
      color: Colors.white_text_color,
      fontWeight: 'bold',
      maxWidth: '95%',
    },
    newMessage: {
      fontWeight: 'bold',
      color: '#4caf50',
    },
    newTag: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      fontSize: 12,
      color: 'white',
      backgroundColor: '#4caf50',
      borderRadius: 12,
      textAlign: 'center',
    },
    notificationImage: {
      width: '100%',
      borderRadius: 8,
      marginBottom: 10,
      
    },
    deleteIcon: {},
    idBackground: {
        backgroundColor: Colors.blue_theme_Color,
        color: 'white',
        paddingVertical: 40,
        borderRadius: 10,
        
      },
  });

export default NotificationStyle