import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../../ReusableComponent/Header';
import {WebView} from 'react-native-webview'; // Import WebView

const ViewInvoice = ({route}) => {
  const {url} = route.params;

  return (
    <View style={styles.container}>
      <Header notificationIcon={true} backButton={true} route="Revenue" />
      <WebView
        source={{uri: url}}
        style={styles.webview}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        injectedJavaScript="
          const meta = document.createElement('meta');
          meta.setAttribute('name', 'viewport');
          meta.setAttribute('content', 'width=1024');
          document.getElementsByTagName('head')[0].appendChild(meta);
        "
        javaScriptEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5FF', // Adjust background color as per design
  },
  webview: {
    flex: 1, // Take up all available space
  },
});

export default ViewInvoice;
