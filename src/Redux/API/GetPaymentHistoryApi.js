import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_Payment_History_url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_Payment_History_url}`;

export const GetPaymenthistoryApi = createAsyncThunk(
  'GetPaymenthistoryApi',
  async ({token, id, franchiseid}) => {
    console.log(id, franchiseid);
    
    
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
      console.log(`${url}${id}${franchiseid}`);
      

      const response = await axios.get(`${url}${id}/${franchiseid}`, { headers: header });
      console.log("GetPaymenthistoryApi response:", response.data);
      
      
      return response.data;
    } catch (error) {
      console.error('Error in GetPaymenthistoryApi:', error.response.data);
    }
  }
);
