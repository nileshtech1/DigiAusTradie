import {StyleSheet} from 'react-native';
import Colors from '../../Assets/Style/Color';

const RevenueQuoteDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_bg_Theme,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.white_text_color,
  },
  table: {
    backgroundColor: Colors.grey_bg_Color,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  cellLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.blue_theme_Color,
  },
  cellValue: {
    flex: 1,
    fontSize: 16,
    color: Colors.white_text_color,
  },
  viewInvoiceButton: {
    backgroundColor: Colors.blue_theme_Color,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewInvoiceButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  loaderText: {
    fontSize: 18,
    color: Colors.white_text_color,
    marginTop: 10,
  },
  downloadButton: {
    backgroundColor: Colors.grey_bg_Color, // Use your desired color
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
  }
  
});

export default RevenueQuoteDetailStyle;
