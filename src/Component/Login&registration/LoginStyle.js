import { StyleSheet } from "react-native";
import Colors from "../../Assets/Style/Color";

export default LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black_bg_Theme,
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    width: "90%",
    marginVertical: 20,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgwhite,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.bggray,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    elevation: 5,
  },

  input1: {
    width: '100%',
    backgroundColor: Colors.black_bg_Theme,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
    // marginTop: 20,
    marginLeft: 10,
  },
  input2: {
    width: '100%',
    backgroundColor: Colors.black_bg_Theme,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
    marginTop: 20,
    marginLeft: 10,
  },

  icon: {
    marginRight: 10,
  },

  eyeIconContainer: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -9 }],
  },

  backgroundCircle1: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 350,
    height: 350,
    borderRadius: 225,
    // backgroundColor: Colors.Neon_Lavender_theme_Color,
  },

  backgroundCircle3: {
    position: "absolute",
    left: 140,
    bottom: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    // backgroundColor: Colors.Neon_Lavender_theme_Color,
  },

  imageCircleContainer: {
    alignItems: "center",
    // marginBottom: 10,
  },

  imageCircle: {
    width: 140,
    height: 140,
    borderRadius: 60,
    // backgroundColor: Colors.bgwhite,
    left : 10,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "70%",
    height: "100%",
    resizeMode: "contain",
  },

  titleContainer: {
    alignItems: "center",
    marginBottom: 15,
    bottom : 10

  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white_Icon_Color,
  },

  subtitle: {
    fontSize: 13,
    color: Colors.white_Icon_Color,
  },

  forgotPasswordText: {
    fontSize: 13,
    color: Colors.white_text_color,
    fontWeight: "bold",
    textDecorationLine: 'underline',
  },

  button: {
    paddingVertical: 12,
    width: "50%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: "#000",
    backgroundColor: Colors.blue_theme_Color,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  buttonText: {
    color: Colors.bgwhite,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 8,
  },

  googleLogin: {
    width: 19,
    height: 19,
  },
  errorText: {
    color: Colors.red_crayola_color,
    fontSize: 12,
    marginTop: 5,
  },
  errorText1: {
    color: Colors.red_crayola_color,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10
  },
  socialLoginContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
  },
  socialLoginText: {
    color: Colors.white_text_color,
    marginBottom: 15,
  },
  socialButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton: {
    borderWidth: 1,
    borderColor: Colors.bggray,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.white,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  appleButton: {
    width: 180, // or as needed
    height: 50, // or as needed
    marginHorizontal: 10,
  },
  forgotPasswordContainer : {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  }
});
