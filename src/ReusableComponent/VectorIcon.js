import React from "react";
import IconF from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconL from 'react-native-vector-icons/MaterialIcons';
import IconT from 'react-native-vector-icons/FontAwesome';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconJ from 'react-native-vector-icons/Entypo';
import IconG from 'react-native-vector-icons/Ionicons';
import IconP from 'react-native-vector-icons/Octicons';
import IconW from 'react-native-vector-icons/FontAwesome5';
import IconV from 'react-native-vector-icons/Fontisto';

// Mapping icon library names to components
const ICON_MAP = {
    Feather: IconF,
    AntDesign: IconA,
    MaterialCommunityIcons: IconM,
    MaterialIcons: IconL,
    FontAwesome: IconT,
    EvilIcons: IconE,
    Entypo: IconJ,
    Ionicons: IconG,
    Octicons: IconP,
    FontAwesome5: IconW,
    Fontisto: IconV,
};

const VectorIcon = ({ icon = "", name, color, size, style }) => {
    const IconComponent = ICON_MAP[icon];
    
    if (!IconComponent) {
        console.warn(`Icon library "${icon}" is not recognized.`);
        return null; // Render nothing if the icon library is invalid
    }

    return <IconComponent name={name} color={color} size={size} style={style} />;
};

export default VectorIcon;
