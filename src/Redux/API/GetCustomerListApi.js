import {createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import axios from 'axios';
import {BASE_URL, Get_Customer_List_Url} from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_Customer_List_Url}`;

export const GetCustomerListApi = createAsyncThunk(
  'CustomerList',
  async ({token, franchiseid}) => {
    const token1 = await AsyncStorage.getItem('Token');

    const parsedToken = JSON.parse(token1);
    

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${parsedToken || token}`,
    };

    try {
      const response = await axios.get(url, {headers, params: franchiseid});

      const result = response.data;
      return result;
    } catch (error) {
      console.error('Error in GetCustomerListApi:', error?.response?.data);
    }
  },
);
