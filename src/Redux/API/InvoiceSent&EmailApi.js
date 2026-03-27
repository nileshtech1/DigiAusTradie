import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Invoice_Sent_and_Email } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Invoice_Sent_and_Email}`;

export const CreateInvoiceSentandEmailAPi = createAsyncThunk(
  'InvoiceSent&EmailApi',
  async (PostData) => {
      const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
        "Authorization": `Bearer ${parsedToken}`, 
    }
    try {
      const response = await axios.post(url, PostData, {
        headers
      });
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Network error:", error);
     throw error;
    }
  }
);