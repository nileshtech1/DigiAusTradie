
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Quotation_Status_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Quotation_Status_Url}`;

export const QuotationStatusApi = createAsyncThunk(
  'QuotationUpdateApi',
  async (PostData) => {
    const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
      "Content-Type" : "application/json",
        "Authorization": `Bearer ${parsedToken}`, 
    }
    try {
      const response = await axios.post(url, PostData, {
        headers
      });

      const result = response.data;
      console.log("QuotationStatusApi response:", result);
      
      return result;
    } catch (error) {
      console.error("Network error:", error.response.data);
    }
  }
);