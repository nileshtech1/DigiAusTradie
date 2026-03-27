import { StyleSheet } from "react-native";
import Colors from "../../../Assets/Style/Color";

const YoutubeVideoStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : Colors.black_bg_Theme
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    categoryName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        color: Colors.Neon_Blue_Theme_Color,
    },
    videoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: Colors.grey_bg_Color,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 4},
        elevation: 6,
        borderWidth: 1,
        borderColor: '#333',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    videoTitle: {
        flex: 1,
        fontSize: 16,
        color: Colors.white_text_color,
        marginRight: 10,
        fontWeight: 'bold',
    },
    videoImage: {
        width: '100%',
        height: 100,
        borderRadius: 8,
    },
    flatListContainer: {
        paddingBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonContainer :{
        backgroundColor : Colors.pink_theme_color,
        paddingVertical : 10,
        paddingHorizontal : 20,
        borderRadius : 5,
        marginTop : 20
    },
    closeText : {
        color : Colors.white_text_color,
        fontWeight : 'bold'
    },
    loaderContainer: {
        position: 'absolute', // Ensure it overlays the entire screen
        top: 0, // Start from the top
        left: 0, // Start from the left
        right: 0, // Ensure it stretches to the right
        bottom: 0, // Ensure it stretches to the bottom
        justifyContent: 'center', // Vertically center
        alignItems: 'center', // Horizontally center
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: semi-transparent background
        zIndex: 9999,
      },
});

export default YoutubeVideoStyle;