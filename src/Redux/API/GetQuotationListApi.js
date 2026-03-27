import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL, Quotation_List_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Quotation_List_Url}`;

export const GetQuotationListApi = createAsyncThunk(
  'QuotationList',
  async ({ token, id }, { rejectWithValue }) => {
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

      const response = await axios.get(`${url}${id}`, { headers: header });
      // console.log("GetQuotationListApi response:", response.data);
      
      
      return response.data;
    } catch (error) {
      console.error('Error fetching quotation list:', error);
    }
  }
);
