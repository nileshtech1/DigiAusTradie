import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Delete_paymentDetails_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Delete_paymentDetails_Url}`;

export const DeletePaymentDetailsApi = createAsyncThunk(
  'DeletePaymentDetailsApi',
  async (id) => {
    console.log("id in DeletePaymentDetailsApi:", id);
    
    const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
        "Authorization": `Bearer ${parsedToken}`, 
    }
    try {
      const response = await axios.delete(url + id, {
        headers
      });

      const result = response.data;
      console.log("DeletePaymentDetailsApi result", result);
      
      return result;
    } catch (error) {
      console.error("Delete paymentDetails error:", error.response.data);
     throw error;
    }
  }
);