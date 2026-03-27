import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Update_paymentDetails_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Update_paymentDetails_Url}`;

export const UpdatePaymentDetailsApi = createAsyncThunk(
  'UpdatePaymentDetailsApi/UpdatePayment',
  async ({postData, id}) => {
    console.log("postData in UpdatePaymentDetailsApi:", postData);
    console.log("id in UpdatePaymentDetailsApi:", id);
    
    
    const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${parsedToken}`, 
    }
    try {
      const response = await axios.post(`${url}${id}`, postData, {
        headers
      });
      const result = response.data;
      console.log("UpdatePaymentDetailsApi result", result);
      
      return result;
    } catch (error) {
     console.log('Error in UpdatePaymentDetailsApi:', error.response.data);
     
    }
  }
);