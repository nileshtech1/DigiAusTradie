import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Colors from '../Assets/Style/Color';

const DashedLoader = ({ size = 100, color = Colors.blue_theme_Color }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const radius = size / 2.5;
  const strokeWidth = 6;

  return (
    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray="12,6" // dashed effect
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
    </Animated.View>
  );
};

export default DashedLoader;
