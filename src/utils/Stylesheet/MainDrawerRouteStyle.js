import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

const MainDrawerRouteStyle = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: Colors.black_bg_Theme,
  },
  logo: {
    height: 50,
    width: '70%',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  switchButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.black_bg_Theme,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  switchButton: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: Colors.grey_bg_Color
  },
  switchButtonText: {
    fontWeight: 'bold',
  },
  activeSwitchButton: {
    backgroundColor: Colors.blue_theme_Color || '#3B82F6',
  },
  drawerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginHorizontal: 15,
    borderRadius: 12,
    marginBottom: 5,
  },
  activeDrawerButton: {
    backgroundColor: Colors.blue_theme_Color || '#3B82F6',
  },
  drawerButtonText: {
    fontSize: 16,
    marginLeft: 20,
    fontWeight: '500',
    color: Colors.white_text_color || '#A0A0A0',
  },
  activeDrawerButtonText: {
    color: Colors.white_text_color || '#FFFFFF',
  },
  logoutButtonContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: '#2A2D3A',
    marginBottom: 70
  },
  LogoutButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  free: {
    color: Colors.green_color || '#10B981',
    fontWeight: 'bold',
  }
});

export default MainDrawerRouteStyle;