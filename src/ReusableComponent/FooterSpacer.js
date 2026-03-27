import React from 'react';
import { View } from 'react-native';
import Colors from '../Assets/Style/Color';

const FooterSpacer = ({ height = 50 }) => {
  return <View style={{ height, backgroundColor: Colors.black_bg_Theme, position: 'relative' }} />;
};

export default FooterSpacer;
