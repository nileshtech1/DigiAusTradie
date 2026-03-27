import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_expense_url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_expense_url}`;

export const GetExpenseListApi = createAsyncThunk(
  'GetExpenseListApi',
  async ({token, franchiseid}) => {
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
      // console.log("GetExpenseListApi response:", response.data);
      const result = response.data;
      return result;
    } catch (error) {
      console.log('GetExpenseListApi error:', error.response.data);
    }
  }
);