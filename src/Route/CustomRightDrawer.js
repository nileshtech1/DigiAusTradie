import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LeftDrawerScreen from './CutsomLeftDrawer';
import NewContract from '../Component/RightSideBarComponent/New Contact/NewContact';
import NewStoreFront from '../Component/RightSideBarComponent/New Store Front/NewStoreFront';
import NewCommercial from '../Component/RightSideBarComponent/New Commercial/NewCommercial';
import NewResidential from '../Component/RightSideBarComponent/New Residential/NewResidential';
import NewExpenses from '../Component/RightSideBarComponent/New Expenses/NewExpenses';
import VectorIcon from '../ReusableComponent/VectorIcon';
import NewContact from '../Component/RightSideBarComponent/New Contact/NewContact';

const RightDrawer = createDrawerNavigator();

const RightDrawerScreen = () => {
  return (
    <RightDrawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerStyle: {
          width: 280, 
        },
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#3F3F3FFF',
        drawerActiveBackgroundColor: '#588DFFFF',
        drawerInactiveBackgroundColor: 'transparent',
        drawerLabelStyle : 'serif'
      }}
    >
      <RightDrawer.Screen
        name="Back"
        component={LeftDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="FontAwesome5" name="arrow-left" color={color} size={20} />
          ),
        }}
      />
      <RightDrawer.Screen
        name="New Contact"
        component={NewContact}
        options={{
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="MaterialCommunityIcons" name="file-document-edit" color={color} size={20} />
          ),
        }}
      />
      <RightDrawer.Screen
        name="New Store Front"
        component={NewStoreFront}
        options={{
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="MaterialCommunityIcons" name="storefront" color={color} size={20} />
          ),
        }}
      />
      <RightDrawer.Screen
        name="New Commercial"
        component={NewCommercial}
        options={{
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="MaterialCommunityIcons" name="domain" color={color} size={20} />
          ),
        }}
      />
      <RightDrawer.Screen
        name="New Residential"
        component={NewResidential}
        options={{
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="MaterialCommunityIcons" name="home" color={color} size={20} />
          ),
        }}
      />
      <RightDrawer.Screen
        name="New Expenses"
        component={NewExpenses}
        options={{
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="MaterialCommunityIcons" name="currency-usd" color={color} size={20} />
          ),
        }}
      />
    </RightDrawer.Navigator>
  );
};

export default RightDrawerScreen;
