import React from 'react';
import {View, Text} from 'react-native';
import DetailCard from './DetailCard';
import ContactCardStyle from '../../../../utils/Stylesheet/ContactCardStyle';
import { capitalizeFirstLetter } from '../Utils/helpers';

const ContactDetails = ({
  phone,
  email,
  contactCategory,
  businessName,
  address,
  onPhonePress,
  onEmailPress,
}) => (
  <View style={ContactCardStyle.detailSection}>
    <Text style={ContactCardStyle.sectionTitle}>Contact Details</Text>
    
    <DetailCard label="Phone" value={phone} onPress={onPhonePress} interactive />
    <DetailCard label="Email" value={email} onPress={onEmailPress} interactive />
    
    {(contactCategory.includes('commercial') || contactCategory.includes('storefront')) && (
      <DetailCard label="Business Name" value={capitalizeFirstLetter(businessName)} />
    )}
    
    <DetailCard label="Address" value={capitalizeFirstLetter(address)} />
    <DetailCard 
      label="Category" 
      value={capitalizeFirstLetter(contactCategory?.join(', '))} 
    />
  </View>
);

export default ContactDetails;