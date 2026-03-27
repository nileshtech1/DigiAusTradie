import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import VectorIcon from '../ReusableComponent/VectorIcon';
import Schedule from '../Component/LeftSideBarComponent/Schedule/Schedule';
import Quotes from '../Component/LeftSideBarComponent/Quotes/Quotes';
import PL from '../Component/LeftSideBarComponent/ProfitLoss/PL';
import Contacts from '../Component/LeftSideBarComponent/Contacts/Contacts';
import Tutorials from '../Component/LeftSideBarComponent/Tutorials/Tutorials';
import Documents from '../Component/LeftSideBarComponent/Documents/Documents';
import StockOrder from '../Component/LeftSideBarComponent/StockOrder/StockOrder';
import Canvassing from '../Component/LeftSideBarComponent/Canvassing/Canvassing';
import Dashboard from '../Component/Dashboard/Dashboard';

const LeftDrawer = createDrawerNavigator();

const LeftDrawerScreen = () => {
  return (
    <LeftDrawer.Navigator
      screenOptions={{
        drawerPosition: 'left',
        drawerStyle: {
          width: 280, // Adjust width as needed
        },
        drawerActiveTintColor: '#FFFFFF', // Active text color
        drawerInactiveTintColor: '#3F3F3FFF', // Inactive text color
        drawerActiveBackgroundColor: '#588DFFFF', // Active item background color
        drawerInactiveBackgroundColor: 'transparent', // Inactive item background color
      }}
    >
         <LeftDrawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="MaterialCommunityIcons" name="view-dashboard" color={color} size={20} />
          ),
        }}
      />
      <LeftDrawer.Screen
        name="Schedule"
        component={Schedule}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="MaterialCommunityIcons" name="calendar" color={color} size={20} />
          ),
        }}
      />
      <LeftDrawer.Screen
        name="Quotes"
        component={Quotes}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="FontAwesome5" name="file-alt" color={color} size={20} />
          ),
        }}
      />
      <LeftDrawer.Screen
        name="P/L"
        component={PL}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="MaterialCommunityIcons" name="chart-line" color={color} size={20} />
          ),
        }}
      />
      <LeftDrawer.Screen
        name="Contacts"
        component={Contacts}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="FontAwesome5" name="address-book" color={color} size={20} />
          ),
        }}
      />
      <LeftDrawer.Screen
        name="Tutorials"
        component={Tutorials}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="FontAwesome5" name="book-open" color={color} size={20} />
          ),
        }}
      />
      <LeftDrawer.Screen
        name="Documents"
        component={Documents}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="MaterialCommunityIcons" name="file-document" color={color} size={20} />
          ),
        }}
      />
      <LeftDrawer.Screen
        name="Stock Order"
        component={StockOrder}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="MaterialCommunityIcons" name="cart" color={color} size={20} />
          ),
        }}
      />
      <LeftDrawer.Screen
        name="Canvassing"
        component={Canvassing}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <VectorIcon icon="MaterialCommunityIcons" name="map" color={color} size={20} />
          ),
        }}
      />
    </LeftDrawer.Navigator>
  );
};

export default LeftDrawerScreen;
