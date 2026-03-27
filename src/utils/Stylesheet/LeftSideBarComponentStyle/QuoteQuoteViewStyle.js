import {StyleSheet} from 'react-native';
import Colors from '../../../Assets/Style/Color';

const QuoteViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_bg_Theme,
  },
  content: {
    margin: 10,
    borderRadius: 8,
    // backgroundColor: Colors.grey_bg_Color,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 10,
    // justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.white_text_color,
    textAlign: 'center',
  },
  title1: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.white_text_color,
    textAlign: 'center',
    backgroundColor: Colors.green_color,
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
    fontFamily: 'serif',
  },
  imgContainer: {
    alignItems: 'center',
    // backgroundColor: Colors.grey_bg_Color,
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  img: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  smallImageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  smallImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  swmsImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 8,
  },
  cardBox: {
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 5,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardItem: {
    flex: 1,
    marginLeft: 20,
  },
  cardItem1: {
    flex: 1,
    marginLeft: 20,
  },
  quoteItem: {
    flex: 1,
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.blue_theme_Color,
  },
  cardValue1: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  notvalue: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
    textAlign: 'center',
  },
  quoteLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.blue_theme_Color,
    textAlign: 'center',
  },
  quotevalue: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  scheduleButton: {
    backgroundColor: Colors.blue_theme_Color,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 40,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  downloadButton: {
    backgroundColor: Colors.grey_bg_Color,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
    invoicedButton : {
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.green_color,
        borderRadius: 5,
        padding: 10,
        marginBottom: 50,
      },

      modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContentView: {
        flex: 1, // take full space
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
      },
      webViewFull: {
        flex: 1, // makes WebView fill parent
      },
      closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        zIndex: 10,
      },
      modalHeader: {
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              backgroundColor: '#f5f5f5',
            }
      
  
});

export default QuoteViewStyle;
