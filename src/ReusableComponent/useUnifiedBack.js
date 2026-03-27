import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

const useUnifiedBack = (navigation, targetScreen = 'Dashboard') => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate(targetScreen);
        }
        return true; // stop default behavior
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      // cleanup
      return () => subscription.remove();
    }, [navigation])
  );
};

export default useUnifiedBack;
