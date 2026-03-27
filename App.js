import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainRoute from './src/Route/MainRoute';
import { TimerProvider } from './src/ReusableComponent/TimerContext';
import Colors from './src/Assets/Style/Color';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/Store/Store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { requestGalleryPermission, requestCameraPermission, requestContactsPermission} from './src/utils/Function/RequestPermissions';

const App = () => {
  useEffect(() => {
  GoogleSignin.configure({
  webClientId: '841623319340-8qk1v6tk89g2prs26g9ku2m17s1gg02b.apps.googleusercontent.com',
  iosClientId: '841623319340-6483f6ah2dsdkkghushl9vpso9orrfan.apps.googleusercontent.com',
  offlineAccess: true,
});
  }, []);

useEffect(() => {
  const requestAllPermissions = async () => {
    const cameraGranted = await requestCameraPermission();
    if (!cameraGranted) return;

    const galleryGranted = await requestGalleryPermission();
    if (!galleryGranted) return;

    console.log('✅ All permissions granted');
  };
  requestAllPermissions();
}, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TimerProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: Colors.grey_bg_Color }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar barStyle="light-content" backgroundColor={Colors.grey_bg_Color} />
              <MainRoute />
            </GestureHandlerRootView>
          </SafeAreaView>
        </TimerProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
