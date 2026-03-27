import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from './Header';
import { PDF_Base_Url } from '../Redux/NWConfig';

const PdfViewer = ({ route }) => {
  const { pdfUrl } = route.params;

  const trimmedPath = pdfUrl.replace('/opt/lampp/htdocs/tradie/tradie/', '');

  const actualUrl = `${PDF_Base_Url}${trimmedPath}`;
  console.log(pdfUrl, 'pdfUrl');

  const pdfViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

  return (
    <>
      <Header backButton={true} />
      <View style={styles.container}>
        <WebView
          source={{ uri: pdfViewerUrl }}
          style={{ flex: 1 }}
          originWhitelist={['*']}
          startInLoadingState={true}
          javaScriptEnabled={true}
          allowFileAccess={true}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default PdfViewer;
