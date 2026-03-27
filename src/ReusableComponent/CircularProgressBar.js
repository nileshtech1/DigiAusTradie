import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

const CircularProgressBar = ({ data, title = "Progress" }) => {
  const baseRadius = 70; // Starting radius for the outermost circle
  const strokeWidth = 10; // Width of each circle

  const renderConcentricCircles = () =>
    data.map((item, index) => {
      const radius = baseRadius - index * (strokeWidth + 5); // Reduce radius for inner circles
      const circumference = 2 * Math.PI * radius;
      const percentage = item.value / 100;
      const strokeDasharray = `${percentage * circumference} ${circumference}`;

      return (
        <React.Fragment key={index}>
          {/* Grey background circle */}
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#D3D3D3" // Grey color for the background
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Colored progress circle */}
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={0}
            fill="none"
          />
        </React.Fragment>
      );
    });

  return (
    <View style={styles.container}>
      <Svg width="170" height="150" viewBox="0 20 190 170">
        <G transform="rotate(-90 100 100)">
          {renderConcentricCircles()}
        </G>
        <SvgText
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="16"
          fontWeight="bold"
          fill="#000">
          {/* {title} */}
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircularProgressBar;
