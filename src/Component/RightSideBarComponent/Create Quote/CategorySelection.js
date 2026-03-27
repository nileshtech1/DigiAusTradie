import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Checkbox} from 'react-native-paper';
import CreateQuoteStyle from '../../../utils/Stylesheet/CreateQuoteStyle';

const CategorySelection = ({
  isResidential,
  setIsResidential,
  isStorefront,
  setIsStorefront,
  isCommercial,
  setIsCommercial,
  isShowResidential,
  isShowStorefront,
  isShowCommercial,
}) => {
 
  return (
    <View>
      {isShowResidential || isShowCommercial || isShowStorefront ? (
        <Text style={CreateQuoteStyle.label}>Select Category for Quote</Text>
      ) : null}

      <View style={CreateQuoteStyle.checkboxGroup}>
        {isShowResidential && (
          <View style={CreateQuoteStyle.checkboxContainer}>
            <Checkbox
              status={isResidential ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsResidential(!isResidential);
                setIsCommercial(false);
                setIsStorefront(false);
              }}
              color="white"
              uncheckedColor="white"
            />
            <Text style={CreateQuoteStyle.CheckBoxLabel}>Residential</Text>
          </View>
        )}
        {isShowStorefront && (
          <View style={CreateQuoteStyle.checkboxContainer}>
            <Checkbox
              status={isStorefront ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsStorefront(!isStorefront);
                setIsCommercial(false);
                setIsResidential(false);
              }}
              color="white"
              uncheckedColor="white"
            />
            <Text style={CreateQuoteStyle.CheckBoxLabel}>Storefront</Text>
          </View>
        )}
        {isShowCommercial && (
          <View style={CreateQuoteStyle.checkboxContainer}>
            <Checkbox
              status={isCommercial ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsCommercial(!isCommercial);
                setIsResidential(false);
                setIsStorefront(false);
              }}
              color="white"
              uncheckedColor="white"
            />
            <Text style={CreateQuoteStyle.CheckBoxLabel}>Commercial</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CategorySelection;
