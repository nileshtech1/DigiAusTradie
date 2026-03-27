import {StyleSheet} from 'react-native';
import Colors from '../../../Assets/Style/Color';
import { Switch } from 'react-native-gesture-handler';

const ProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_bg_Theme,
  },
  contentContainer: {
    flex: 1,
    margin: 10,
  },
  card: {
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white_text_color,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white_text_color,
    marginLeft: 5,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoCard: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.black_bg_Theme,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
    borderWidth: 1,
    borderColor: '#333',
    marginHorizontal: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: Colors.gray_text_color,
  },
  infoText: {
    fontSize: 15,
    marginTop: 5,
    color: Colors.white_text_color,
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  // logoutContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  // },
  
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue_theme_Color,
    paddingVertical: 14,
    marginHorizontal: 20,
   borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  
  logoutText: {
    color: Colors.white_text_color,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  DeleteButton :{
 flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.pink_theme_color,
    paddingVertical: 14,
    marginHorizontal: 20,
   borderRadius: 10,
    elevation: 5,
    marginTop : 20,
    opacity : 0.8
  },
  
  targetValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.blue_theme_Color,
    textAlign: 'center',
    marginBottom: 10,
  },
  linkText: {
    color: 'skyblue',
    textDecorationLine: 'underline',
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: Colors.black_bg_Theme,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: Colors.gray_text_color,
    elevation: 5,
  },
  shareText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 13,
  },
  targetRevenue: {
    fontSize: 16,  
    fontWeight: 'bold', 
    color: Colors.blue_theme_Color, 
    textAlign: 'center', 
    marginBottom: 10,
  },
  targetRevenue: {
    fontSize: 14,
    color: '#aaa',         
    marginVertical: 6,
  },
  
  targetValue: {
    color: Colors.green_color,
    fontWeight: '600',
  },
  SwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 40,
  },
  SwitchText: {
    fontSize: 16,
    color: Colors.white_text_color,
    marginLeft: 10,
  },
  
});

export default ProfileStyle;
