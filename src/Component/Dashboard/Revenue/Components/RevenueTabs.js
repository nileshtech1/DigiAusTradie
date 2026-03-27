import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import Colors from '../../../../Assets/Style/Color';
import Quotes from '../Quotes';
import PaidInvoice from '../PaidInvoice';
import UnpaidInvoice from '../UnpaidInvoice';

const TABS = [
  { key: 'Quotes', title: 'Quotes Sent', color: Colors.Neon_Pink_Theme_Color },
  { key: 'Unpaid', title: 'Unpaid Invoices', color: Colors.blue_theme_Color },
  { key: 'Paid', title: 'Paid Invoices', color: Colors.green_color },
];

const { width } = Dimensions.get('window');
const TAB_CONTAINER_WIDTH = width - 40;
const TAB_WIDTH = TAB_CONTAINER_WIDTH / TABS.length;

const RevenueTabs = ({ activeTab, setActiveTab }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const newIndex = TABS.findIndex(tab => tab.key === activeTab);
    Animated.spring(slideAnim, {
      toValue: newIndex,
      useNativeDriver: true,
    }).start();
  }, [activeTab, slideAnim]);

  const translateX = slideAnim.interpolate({
    inputRange: TABS.map((_, i) => i),
    outputRange: TABS.map((_, i) => i * TAB_WIDTH),
  });

  const activeColor = TABS.find(tab => tab.key === activeTab)?.color || Colors.green_color;

  const renderContent = () => {
    switch (activeTab) {
      case 'Quotes':
        return <Quotes />;
      case 'Paid':
        return <PaidInvoice />;
      case 'Unpaid':
        return <UnpaidInvoice />;
      default:
        return (
          <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#A0A0A0' }}>Select a tab to view content</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabHeader}>
        <Animated.View
          style={[
            styles.activeTabIndicator,
            { transform: [{ translateX }], backgroundColor: activeColor },
          ]}
        />
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab.key && { color: '#FFFFFF' }]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.tabContent}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  tabHeader: {
    flexDirection: 'row',
    backgroundColor: '#1C1F2A',
    borderRadius: 30,
    padding: 5,
    position: 'relative',
    height: 50,
  },
  activeTabIndicator: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: TAB_WIDTH - 10,
    height: '100%',
    borderRadius: 25,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0A0A0',
  },
  tabContent: {
    flex: 1,
  },
});

export default RevenueTabs;
