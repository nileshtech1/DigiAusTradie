// 2. ProfileSection.js
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import VectorIcon from '../../../../ReusableComponent/VectorIcon';
import Colors from '../../../../Assets/Style/Color';
import ContactCardStyle from '../../../../utils/Stylesheet/ContactCardStyle';
import {contactList_image_path} from '../../../../Redux/NWConfig';
import {noImg1, noImg2, placeHolderImage} from '../../../../Assets/Images';
import {capitalizeFirstLetter} from '../Utils/helpers';

const ProfileSection = ({images, firstName, lastName, onEdit, id}) => (
  <View style={ContactCardStyle.profileContainer}>
    {images?.length > 0 ? (
      <View style={ContactCardStyle.profileImageContainer}>
        <Image
          source={{uri: contactList_image_path + images[0].path}}
          style={ContactCardStyle.profileImage}
        />
      </View>
    ) : (
      <Image source={noImg2} style={ContactCardStyle.profileImage} />
    )}
    <View style={ContactCardStyle.profileInfo}>
      <View>
        <Text style={ContactCardStyle.customerNumber}>Cust ID : {id} | </Text>
      </View>

      <Text style={ContactCardStyle.customerName}>
        {capitalizeFirstLetter(firstName) +
          ' ' +
          capitalizeFirstLetter(lastName)}
      </Text>
      <TouchableOpacity style={ContactCardStyle.editButton} onPress={onEdit}>
        <VectorIcon
          icon="FontAwesome"
          name="edit"
          size={20}
          color={Colors.Neon_Blue_Theme_Color}
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default ProfileSection;
