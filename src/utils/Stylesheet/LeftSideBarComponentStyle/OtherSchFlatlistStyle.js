import { StyleSheet } from "react-native";
import Colors from "../../../Assets/Style/Color";

const OtherSchFlatlistStyle = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      padding: 10,
      marginHorizontal: 15,
      marginVertical: 10,
      borderRadius: 10,
      elevation: 2,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'sans-serif',
      marginBottom: 10,
      color: Colors.theme_background_dark,
      marginHorizontal: 5,
    },
    valueLabel: {
      marginVertical: 5,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      marginVertical: 2,
      marginHorizontal: 5,
    },
    input: {
      flex: 1,
      borderWidth: 0.6,
      borderColor: Colors.theme_background_dark,
      borderRadius: 4,
      padding: 10,
      marginHorizontal: 5,
      borderBottomWidth: 2,
    },
    inputForNotes: {
      textAlign: 'center',
      justifyContent: 'center',
      borderWidth: 0.6,
      borderColor: Colors.theme_background_dark,
      borderRadius: 4,
      padding: 10,
      marginHorizontal: 5,
      borderBottomWidth: 2,
      height: 80,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    button: {
      flex: 1,
      backgroundColor: Colors.theme_background_dark,
      padding: 10,
      alignItems: 'center',
      borderRadius: 4,
      marginHorizontal: 5,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    checkboxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    checkbox: {
      borderWidth: 0.6,
      borderColor: Colors.theme_background_dark,
      padding: 10,
      borderRadius: 4,
      alignItems: 'center',
      marginHorizontal: 5,
      backgroundColor: '#fff',
      borderBottomWidth: 2,
    },
    imgContainer: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: '#000',
      justifyContent: 'center',
      borderRadius: 10,
    },
    roomImgContainer: {
      borderWidth: 0.5,
      borderColor: '#000',
      justifyContent: 'center',
      borderRadius: 10,
      width : 150,
      marginBottom : 5
    },
    image: {
      width: '100%',
      height: 100,
    },
    titleContainer: {
      paddingVertical: 5,
    },
    titleMain: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'sans-serif',
      color: Colors.theme_background_dark,
    },
    rowUp: {
      flexDirection: 'row', // Align label and value horizontally
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      marginBottom: 10, // Space between rows
    },
    labelUp: {
      marginRight: 10, // Space between label and value
      fontWeight: 'bold',
      textAlign: 'center', // Center the text within label
      fontFamily: 'sans-serif',
    },
    value: {
      fontWeight: 'bold',
      textAlign: 'center', // Center the text within value
      borderWidth: 1,
      width: 100,
      borderColor: Colors.theme_background_dark,
      borderRadius: 5,
      fontFamily: 'sans-serif',
    },
    
    imageContainer: {
      flex: 1,  // Ensure the container takes up equal space in the row
      marginHorizontal: 5,  // Space between the image containers
      borderWidth: 0.6,
      borderColor: Colors.theme_background_dark,
      borderRadius: 4,
      borderBottomWidth: 2,
    },
  });

export default OtherSchFlatlistStyle;