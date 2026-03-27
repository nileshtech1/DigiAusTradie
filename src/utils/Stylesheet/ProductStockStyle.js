import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const ProductStockStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : Colors.black_bg_Theme
    },
    searchContainer: {
      marginVertical: 10,
      paddingHorizontal: 15
    },
    productCard: {
      flexDirection: 'row',
      backgroundColor: Colors.grey_bg_Color, 
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6, 
      borderWidth: 1, 
      borderColor: '#333',
      paddingHorizontal: 8,
      paddingVertical : 5,
      marginBottom: 10,
      alignItems: 'center',
    },
    productNameContainer: {
      flex: 0.8,
    },
    productImageContainer: {
      flex: 0.5,
      alignItems: 'center',
    },
    productPriceContainer: {
      flex: 0.4,
    },
    productCheckboxContainer: {
      flex: 0.2,
      marginRight: 3
    },
    productQuantityContainer: {
      flex: 0.6,
    },
    productName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.white_text_color,
      textAlign: 'center',
    },
    productImage: {
      width: 50,
      height: 50,
      borderRadius: 8,
    },
    productPrice: {
      fontSize: 16,
      color: Colors.Neon_Blue_Theme_Color,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    productQuantity: {
      fontSize: 12,
      fontWeight: 'bold',
      color: Colors.white_text_color,
      textAlign: 'center',
    },
    productOutQuantity: {
      fontSize: 12,
      fontWeight: 'bold',
      color: Colors.pink_theme_color,
      textAlign: 'center',
    },
    categoryName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 5,
      textAlign: 'center',
      color: Colors.Neon_Blue_Theme_Color,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      width: 300,
    },
    modalContent1: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: 300,
        height : 400
  
      },
      modalTitle1: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        marginLeft : 5
      },
    modalTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    outOfStock: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 10,
      color : Colors.pink_theme_color
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    quantityButton: {
      padding: 10,
      backgroundColor: Colors.blue_theme_Color,
      borderRadius: 5,
      margin: 5,
      width : 50
    },
    quantityButtonText: {
      fontSize: 18,
      color: '#fff',
      textAlign : 'center'
    },
    quantityInput: {
      width: 50,
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      textAlign: 'center',
      fontSize: 16,
    },
    modalButtonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
    },
    fabButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Colors.blue_theme_Color, // Choose a color for the button
        borderRadius: 50,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10, // For shadow effect on Android
        zIndex: 1000, // Ensure the button stays on top of other elements
      },
      
      cartBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red', // Badge background color
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      
      cartBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
      },      
      cartItemRow: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
      },
      cartItemRow1: {
        flexDirection: 'row',
      },
      deleteIcon : {
       marginLeft : 10,
      },
      cartItemImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 10,
      },
      cartItemText: {
        fontSize: 14,
        color: '#000',
        textAlign: 'left',
      },
      noCategoryText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        marginTop: 20, 
      },
      totalAmountContainer: {
        marginBottom: 10,
        alignItems: 'center',
      },
      totalAmountText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green', 
      },
      cartLabelContainer : {
        flexDirection : 'row',
        justifyContent : 'center'
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
  export default ProductStockStyle;