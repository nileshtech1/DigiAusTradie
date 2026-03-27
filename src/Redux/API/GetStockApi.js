import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_Stock_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_Stock_Url}`;

export const GetStockApi = createAsyncThunk(
  'StockList',
  async (token) => {
    const token1 = await AsyncStorage.getItem('Token');

    const parsedToken = JSON.parse(token1);

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${parsedToken || token}`, 
    };

    try {
      const response = await axios.get(url, { headers});
      // console.log('Response from GetStockApi:', response.data);
      const result = response.data;
      return result;
    } catch (error) {
      console.log('Error in GetStockApi:', error);
      
    }
  }
);
