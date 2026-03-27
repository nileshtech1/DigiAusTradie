import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Pressable,
} from 'react-native';
import Colors from '../Assets/Style/Color';
import VectorIcon from './VectorIcon';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SlideToLogout = ({ onSlideComplete }) => {
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx >= 0 && gestureState.dx <= SCREEN_WIDTH - 100) {
          pan.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SCREEN_WIDTH * 0.6) {
          // Slide complete
          Animated.timing(pan, {
            toValue: SCREEN_WIDTH - 100,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            onSlideComplete();
            pan.setValue(0); // Reset after action
          });
        } else {
          // Slide canceled
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: pan }],
            },
          ]}
          {...panResponder.panHandlers}
        >
         <VectorIcon
          icon="MaterialIcons"
          name="logout"
          size={20}
          color={Colors.white_Icon_Color}
        />
        
        </Animated.View>
        <Text style={styles.logoutLabel}>
          Slide to Logout
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  track: {
    width: '100%',
    height: 52,
    backgroundColor: Colors.black_bg_Theme,
    borderWidth: 1,
    borderColor: '#6B6B6BFF',
    borderRadius: 30,
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.green_color,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
  },
    logoutLabel: {
        textAlign: 'center',
        color: Colors.gray_text_color,
        fontSize: 13,
        // fontWeight: 'bold',
    },
});

export default SlideToLogout;
