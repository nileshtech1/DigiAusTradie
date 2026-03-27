import { StyleSheet } from "react-native";
import Colors from "../../../Assets/Style/Color";

const StockOrderStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black_bg_Theme
    },
    searchContainer: {
        marginTop: 10,
        paddingHorizontal: 10
    },
    categoriesContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
        flex: 1,  // Important to take up remaining space
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: Colors.Neon_Blue_Theme_Color,
        fontWeight: 'bold'
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        backgroundColor: Colors.grey_bg_Color,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
        borderWidth: 1,
        borderColor: '#333',
    },
    categoryText: {
        fontSize: 16,
        color: Colors.white_text_color,
        fontWeight: 'bold',

    },
    quantityText: {
        fontSize: 14,
        color: Colors.white_text_color,
    },
    priceText: {
        fontSize: 14,
        color: Colors.white_text_color,
    },
    noCategoryText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    imageContainer: {
        marginRight: 10,
    },
    textContainer: {
      flex : 1,
       
    },
    iconContainer: {
        flex: 1,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    searchBarContainer : {
        marginHorizontal: 10,
    }
});

export default StockOrderStyle;