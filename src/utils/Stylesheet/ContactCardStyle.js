import {StyleSheet} from 'react-native';
import Colors from '../../Assets/Style/Color';

const ContactCardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_bg_Theme,
  },
  contentContainer: {
    paddingBottom: 20,
    backgroundColor: Colors.black_bg_Theme,
  },
  customerNumberContainer: {
    padding: 15,
    alignItems: 'center',
  },
  customerNumberLabel: {
    fontSize: 14,
    color: Colors.Neon_Blue_Theme_Color, // Changed to blue
  },
  customerNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.Neon_Blue_Theme_Color,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 10,
  },
  profileImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain', // Use 'cover' or 'contain' as appropriate
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white_text_color,
    marginRight: 10,
  },
  editButton: {
    padding: 2,
    top :2
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 2,
    marginTop: 5,
  },
  statCard: {
    backgroundColor: Colors.grey_bg_Color,
    padding: 10,
    margin: 4,
    borderRadius: 8,
    width: '45%',
  },
  statCardLabel: {
    fontSize: 14,
    color: Colors.Neon_Blue_Theme_Color, // Changed to blue
    marginBottom: 5,
  },
  statCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white_text_color,
  },
  detailSection: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white_text_color,
    marginBottom: 10,
  },
  detailCard: {
    backgroundColor: Colors.grey_bg_Color,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.Neon_Blue_Theme_Color, // Changed to blue
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white_text_color, // Changed to white
  },
  notesSection: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  notesCard: {
    backgroundColor: Colors.grey_bg_Color,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notesValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white_text_color,
  },
  notesButton: {
    marginLeft: 10,
  },
  scheduleSection: {
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 50,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleItem: {
    flex: 1,
  },
  scheduleLabel: {
    fontSize: 16,
    color: Colors.white_text_color,
    marginBottom: 5,
  },
  scheduleButton: {
    backgroundColor: Colors.blue_theme_Color,
    padding: 15,
    borderRadius: 5,
    // alignItems: 'center',
    marginRight: 8,
  },
  createBookingButton: {
    backgroundColor: Colors.blue_theme_Color,
    padding: 10,
    marginHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.white_text_color,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeButton: {
    backgroundColor: Colors.Neon_Blue_Theme_Color,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  phoneText: {
    color: Colors.Neon_Blue_Theme_Color,
    textDecorationLine: 'underline',
  },
  emailText: {
    color: Colors.Neon_Blue_Theme_Color,
    textDecorationLine: 'underline',
  },
  fixedContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  editIconInline: {
    // marginLeft: 8,
    // padding: 4,
  },
});
export default ContactCardStyle;
