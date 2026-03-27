import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Assets/Style/Color';

const TOAST_DISPLAY_DURATION = 2000;

const ToastAlert = ({ type = "info", message, visible, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(-120));
  const [fadeAnim] = useState(new Animated.Value(0));

  // Define styles by type
  const backgroundColors = {
    success: "#4BB543",
    error: "#FF3B30",
    info: Colors.blue_theme_Color,
  };

  const icons = {
    success: "checkmark-circle",
    error: "close-circle",
    info: "information-circle",
  };

  useEffect(() => {
    let timer;

    if (visible) {
      // Slide + fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto close toast
      timer = setTimeout(() => {
        // Fade out smoothly
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: -120,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start(() => onClose());
      }, TOAST_DISPLAY_DURATION);
    }

    return () => {
      clearTimeout(timer);
      slideAnim.stopAnimation();
      fadeAnim.stopAnimation();
    };
  }, [visible, onClose, slideAnim, fadeAnim]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { 
          backgroundColor: backgroundColors[type],
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Ionicons name={icons[type]} size={22} color="white" style={{ marginRight: 8 }} />
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    zIndex: 1000,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minWidth: "80%",
  },
  toastText: {
    color: "white",
    fontSize: 15,
    flexShrink: 1,
    fontWeight: "500",
  },
});

export default ToastAlert;
