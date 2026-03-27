import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_PaymentDetails_url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_PaymentDetails_url}`;

export const GetPaymentDetailsApi = createAsyncThunk(
  'GetPaymentDetailsApi',
  async ({ token, id }) => {
    try {
      const token1 = await AsyncStorage.getItem('Token');

      if (!token1) {
        throw new Error('Token or user not found in AsyncStorage');
      }
      const parsedToken = JSON.parse(token1);

      const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${parsedToken || token}`,
      };
      console.log(url + id);
      

      const response = await axios.get(`${url}${id}`, { headers: header });
      // console.log("GetPaymentDetailsApi response:", response.data);
      
      
      return response.data;
    } catch (error) {
      console.error('Error in GetPaymentDetailsApi:', error.response.data);
    }
  }
);
