import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../../ReusableComponent/Header';
import Colors from '../../../Assets/Style/Color';

const PdfView = ({ route }) => {
  const { pdfLink } = route.params;

  return (
    <View style={styles.container}>
      <Header notificationIcon={true} backButton={true} route="FranchiseDocumentList" />
      <View style={{ flex: 1, marginTop : 10 }}>
        {pdfLink ? (
          <WebView
            source={{ uri: pdfLink }}
            style={{ flex: 1 }}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        ) : (
          <Text style={styles.errorText}>No document available</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container :{
 flex : 1,
 backgroundColor : Colors.black_bg_Theme
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
});

export default PdfView;
