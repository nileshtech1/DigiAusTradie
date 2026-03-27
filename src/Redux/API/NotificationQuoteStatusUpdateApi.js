
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Notification_Quote_Status_Update_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Notification_Quote_Status_Update_Url}`;

export const NotificationQuoteStatusUpdateApi = createAsyncThunk(
  'NotificationQuoteStatusUpdateApi',
  async ({ token, franchiseid }) => {
      const token1 = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token1);
    const finalToken = parsedToken || token;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${finalToken}`, 
    }
    try {
      const response = await axios.get(url, {
        headers,
        params: franchiseid,
      });
      // console.log("NotificationQuoteStatusUpdateApi response:", response.data);
      
      const result = response.data;
      
      return result;
    } catch (error) {
      console.error("Notification api error:", error.response.data);
     throw error;
    }
  }
);