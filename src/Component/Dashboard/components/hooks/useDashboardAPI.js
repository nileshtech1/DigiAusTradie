import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// --- All your imports remain the same ---
import {GetCustomerListApi} from '../../../../Redux/API/GetCustomerListApi';
import {ProfitLossApi} from '../../../../Redux/API/Profit&LossApi';
import {GetXeroSentQuotesApi,UpdateQuoteSerialNoApi} from '../../../../Redux/API/XeroQuoteApi';
import {GetCountryListApi} from '../../../../Redux/API/GetCountryApi';
import {GetTutorialCatApi} from '../../../../Redux/API/GetTutorialCatApi';
import {GetStockApi} from '../../../../Redux/API/GetStockApi';
import {UserDetailsApi} from '../../../../Redux/API/GetUserDetailsApi';
import {GetScheduleApi} from '../../../../Redux/API/GetScheduleApi';
import {GetAllTimetrackingApi, GetTimetrackingApi} from '../../../../Redux/API/GetTimeTrackedApi';
import {GetInvoiceUrl} from '../../../../Redux/API/GetInvoiceApi';
import {GetFinishedJobApi} from '../../../../Redux/API/GetFinishedApi';
import {GetAccountApi} from '../../../../Redux/API/GetAccountsApi';
import {GetItemsApi} from '../../../../Redux/API/GetItemsApi';
import {GetTrailBalanceApi} from '../../../../Redux/API/GettrailbalanceApi';
import {GetBrandingThemeApi} from '../../../../Redux/API/BrandingThemeApi';
import {GetDocumentListApi} from '../../../../Redux/API/GetDocumentListApi';
import {GetFranchiseDocumentApi,GetRiskAssesmentDocumentApi} from '../../../../Redux/API/GetJHGroupDocumentApi';
import {NotificationQuoteStatusUpdateApi} from '../../../../Redux/API/NotificationQuoteStatusUpdateApi';
import {GetQuotationListApi} from '../../../../Redux/API/GetQuotationListApi';
import {GetStateApi} from '../../../../Redux/API/GetStateApi';
import {Alert} from 'react-native';
import {GetHazardApi} from '../../../../Redux/API/GetHazardApi';
import { GetAllUserApi } from '../../../../Redux/API/GetAllUserApi';
import { GetCommercialDropdownAPi, GetResidentialDropdownAPi, GetStoreFrontDropdownAPi } from '../../../../Redux/API/GetDropdownApi';
import { GetExpenseListApi } from '../../../../Redux/API/GetExpenseListApi';
import { GetAllScheduleApi } from '../../../../Redux/API/GetAllScheduleListApi';
import { HelpSupportApi } from '../../../../Redux/API/HelpSupportApi';
import { GetTradeTypeApi } from '../../../../Redux/API/GetTradeTypeApi';
import { GetPaymentDetailsApi } from '../../../../Redux/API/GetPaymentDetailsApi';

// The hook now accepts setRefreshing as a prop, as it was used in the `finally` block
const useDashboardAPI = (LoginData, setLoading, setRefreshing) => {
  const dispatch = useDispatch();
  
  // Destructure dependencies to stabilize the useEffect
  const { status, token, user } = LoginData || {};
  const userId = user?.id;
  const id = LoginData?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      // Guard clause: Exit early if we don't have the necessary data
      if (!status || !token || !userId) {
        return;
      }

      setLoading?.(true);
      const id2 = await AsyncStorage.getItem('current_job');
      
      const franchiseid = {
        franchise_id: userId,
      };

      const postData1 = {
        franchise_id: userId,
      };

      try {
        await AsyncStorage.setItem('User', JSON.stringify(user));
        await AsyncStorage.setItem('Token', JSON.stringify(token));

        // Create an array of all the API calls (promises) you want to make
        const apiCalls = [
          dispatch(ProfitLossApi(postData1)),
          dispatch(GetTradeTypeApi()),
          dispatch(UserDetailsApi(token)),
          dispatch(GetCustomerListApi({ token, franchiseid })),
          dispatch(GetResidentialDropdownAPi()),
          dispatch(GetCommercialDropdownAPi()),
          dispatch(GetStoreFrontDropdownAPi()),
          dispatch(GetHazardApi(token)),
          dispatch(HelpSupportApi(token)),
          dispatch(NotificationQuoteStatusUpdateApi({token, franchiseid})),
          dispatch(GetInvoiceUrl({ token, franchiseid })),
          dispatch(GetScheduleApi({ token, franchiseid })),
          dispatch(GetXeroSentQuotesApi({ token, postData1 })),
          dispatch(GetExpenseListApi({ token, franchiseid })),
          dispatch(GetAllScheduleApi({ token, franchiseid })),
           dispatch(GetPaymentDetailsApi({ token, id })),
          // dispatch(UpdateQuoteSerialNoApi({token, franchiseid})),
          // dispatch(GetItemsApi({token, franchiseid})),
          // dispatch(GetBrandingThemeApi({token, franchiseid})),
          // dispatch(GetCountryListApi()),
          // dispatch(GetStateApi()),
          // dispatch(GetTutorialCatApi(token)),
          // dispatch(GetStockApi(token)),
          dispatch(GetTimetrackingApi({ id2, token })),
          dispatch(GetAllTimetrackingApi({ token, franchiseid })),
          dispatch(GetQuotationListApi({ token, id: userId })),
          dispatch(GetFinishedJobApi({ token, franchiseid })),
          // dispatch(GetAccountApi({token, franchiseid})),
          // dispatch(GetTrailBalanceApi({token, franchiseid})),
          // dispatch(GetDocumentListApi({token, franchiseid})),
          // dispatch(GetFranchiseDocumentApi(token)),
          // dispatch(GetRiskAssesmentDocumentApi(token)),
        ];
        
        // Use Promise.all to run all API calls concurrently
        await Promise.all(apiCalls);

      } catch (error) {
        console.error('Error in Dashboard API batch fetch:', error);
      } finally {
        setRefreshing?.(false);
        setLoading?.(false);
      }
    };

    fetchData();
  // Add stable dependencies to the dependency array.
  // This ensures the hook only re-runs if these specific values change.
  }, [status, token, userId, dispatch, setLoading, setRefreshing]); 

  // This function is not used in the useEffect but is kept as requested.
  const getStartAndEndOfMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const fromDate = new Date(year, month, 1);
    const toDate = new Date(year, month + 1, 0);

    const formatDate = date =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0',
      )}-${String(date.getDate()).padStart(2, '0')}`;

    return {
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      franchise_id: LoginData?.user?.id,
    };
  };
};

export default useDashboardAPI;