import { useState, useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/Slice/LoginSlice';
import { UserDetailsApi } from '../../../Redux/API/GetUserDetailsApi';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { DeleteAccountApi } from '../../../Redux/API/DeleteAccountApi';

const useProfile = () => {
  const { UserData } = useSelector(state => state.UserDetails);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { sentQuotes } = useSelector(state => state.XeroQuoteSlice);
  const [target, setTarget] = useState(0);
  const {LoginData} = useSelector(state => state.Login);

  useEffect(() => {
    calculateTargetRevenue();
  }, [sentQuotes]);

  useEffect(() => {
    getProfileDetails();
  }, []);

  const parseJobArray = (jobStr) => {
    if (!jobStr || jobStr === "null" || jobStr === "[]") return [];
    try {
      return JSON.parse(jobStr);
    } catch (e) {
      console.error("Invalid JSON in job field:", jobStr);
      return [];
    }
  };

  const calculateTargetRevenue = () => {
    if (sentQuotes?.status === true && sentQuotes?.data?.length > 0) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const filterInvoicesByMonth = (invoices, month, year) => {
        return invoices?.filter(invoice => {
          const invoiceDate = new Date(invoice.created_at);
          return (
            invoiceDate.getMonth() === month &&
            invoiceDate.getFullYear() === year
          );
        });
      };

      const currentMonthTargetAmount = filterInvoicesByMonth(
        sentQuotes?.data,
        currentMonth,
        currentYear,
      );

      const targetAmount = currentMonthTargetAmount?.reduce((sum, item) => {
        let total = 0;

        const commercialJobs = parseJobArray(item.commercial_job);
        const residentialJobs = parseJobArray(item.residential_job);
        const storefrontJobs = parseJobArray(item.storefront_job);

        commercialJobs.forEach((job) => {
          total += parseFloat(job.price || 0);
        });
        residentialJobs.forEach((job) => {
          total += parseFloat(job.price || 0);
        });
        storefrontJobs.forEach((job) => {
          total += parseFloat(job.price || 0);
        });

        return sum + total;
      }, 0);

      setTarget(targetAmount);
    }
  };

  const getProfileDetails = async () => {
    const token = await AsyncStorage.getItem('Token');
    const parsedToken = token ? JSON.parse(token) : null;
    if (parsedToken) {
      dispatch(UserDetailsApi(parsedToken));
    }
  };

 const handleLogout = async () => {
  Alert.alert(
    'Logout..',
    'Do you really want to log out?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: async () => {
          try {
            // 1. Firebase से साइन आउट (यह Apple और Google दोनों के लिए काम करेगा)
            await auth().signOut();

            // 2. अगर Google Sign-in भी यूज़ कर रहे हैं, तो इसे भी सेफ साइड के लिए डाल दें
            const isGoogleSignedIn = await GoogleSignin.isSignedIn();
            if (isGoogleSignedIn) {
              await GoogleSignin.signOut();
            }

            // 3. अपना Local Storage साफ़ करें
            await AsyncStorage.removeItem('userLoginData');
            await AsyncStorage.removeItem('Token');
            await AsyncStorage.removeItem('User');

            // 4. Redux स्टेट साफ़ करें
            dispatch(logout());

            // 5. लॉगिन स्क्रीन पर वापस भेजें (अगर ऑटोमैटिक नहीं हो रहा)
            // navigation.replace('Login'); 

          } catch (error) {
            console.error('Logout Error:', error);
            Alert.alert("Error", "Logout failed. Please try again.");
          }
        },
      },
    ],
    { cancelable: true },
  );
};
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

const handleDeleteAccount = () => {
  // --- First Confirmation ---
  Alert.alert(
    "Delete Account",
    "Are you sure you want to delete your account? This action is permanent.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // --- Second (Double) Confirmation ---
          Alert.alert(
            "Final Warning",
            "This will erase all your data and cannot be undone. Proceed?",
            [
              { text: "No, Keep My Account", style: "cancel" },
              {
                text: "Yes, Delete Permanently",
                style: "destructive",
                onPress: async () => {
                  const id = LoginData?.user?.id;
                  const postData = { user_id: id };
                  const token = LoginData?.token

                  const result = await dispatch(DeleteAccountApi({postData, token}));

                  // Check if the API was successful
                  if (result.payload?.status === true) {
                    dispatch(logout());
                  } else {
                    Alert.alert("Error", "Could not delete account. Please try again.");
                  }
                },
              },
            ]
          );
        },
      },
    ]
  );
};

  const handleShareProfile = async () => {
    try {
  
      const vCardData =
  `BEGIN:VCARD
  VERSION:3.0
  N:${UserData?.data?.last_name || ''};${UserData?.data?.first_name || ''};;;
  FN:${UserData?.data?.first_name || ''} ${UserData?.data?.last_name || ''}
  EMAIL;type=INTERNET:${UserData?.data?.email_primary || ''}
  TEL;type=CELL:${UserData?.data?.phone_primary || ''}
  ADR;type=WORK:;;${UserData?.data?.address || ''};;;;
  ORG:${UserData?.data?.business_name || ''}
  END:VCARD`;
  
      // Internal path
      const internalPath = `${RNFS.DocumentDirectoryPath}/contact.vcf`;
      await RNFS.writeFile(internalPath, vCardData, "utf8");
  
      // Copy to cache (Android needs shareable uri)
      const cachePath = `${RNFS.CachesDirectoryPath}/contact.vcf`;
      await RNFS.copyFile(internalPath, cachePath);
  
      const shareUrl = Platform.OS === "android"
        ? `file://${cachePath}`
        : cachePath;
  
      console.log("SHARE URL:", shareUrl);
  
      await Share.open({
        url: shareUrl,
        type: "text/x-vcard",
        failOnCancel: false,
      });
  
    } catch (error) {
      console.error("VCard Share Error:", error);
      Alert.alert("Share Error", error.message || "Something went wrong");
    }
  };
  
  const handleLinkPress = async url => {
    if (url) {
      try {
        await Linking.openURL(url);
      } catch (error) {
        console.error('Could not open URL:', error);
        Alert.alert('Error', 'Could not open the link.');
      }
    }
  };

  return {
    user : UserData?.data,
    target,
    handleLogout,
    handleEditProfile,
    handleShareProfile,
    handleLinkPress,
    handleDeleteAccount,
  };
};

export default useProfile;