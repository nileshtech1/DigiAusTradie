import {StyleSheet} from 'react-native';
import Colors from '../../Assets/Style/Color';

const PLStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_bg_Theme,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    color: Colors.Neon_Blue_Theme_Color,
  },
  rowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.Neon_Blue_Theme_Color,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  totalBoldText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  totalBoldText1: {
    fontSize: 16,
    color: Colors.Neon_Blue_Theme_Color,
    fontWeight: 'bold',
  },
  netProfit: {
    fontSize: 16,
    color: Colors.Neon_Blue_Theme_Color,
    fontWeight: 'bold',
  },
  cell1: {
    flex: 1,
  },
  cell2: {
    flex: 0.6,
  },
  cell3: {
    flex: 0.4,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  dateInputRow: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dateInput: {
    width: '100%',
    paddingVertical: 12,
    fontSize: 12,
    color: Colors.white_text_color,
    fontWeight: '500',
  },
  inputCont: {
    flex: 1,
  },
  toText: {
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  Comparessioncontainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 5,
  },
  // Modal Styling
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 320,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: Colors.blue_theme_Color,
    padding: 10,
  },
  closeText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  filterButton: {
    borderRadius: 5,
    marginLeft: 2,
    width: '23%',
    backgroundColor: Colors.blue_theme_Color,
  },
  settingButton: {
    borderRadius: 5,
    marginLeft: 2,
    width: '29%',
    backgroundColor: Colors.blue_theme_Color,
  },
  divider: {
    marginRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
  applyButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  applyButton: {
    backgroundColor: Colors.blue_theme_Color,
  },
});
export default PLStyle;
