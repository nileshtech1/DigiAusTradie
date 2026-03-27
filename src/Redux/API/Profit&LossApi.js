import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL, Profit_Loss_Url} from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Profit_Loss_Url}`;

export const ProfitLossApi = createAsyncThunk(
  'ProfitLossApi',
  async PostData => {
    const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${parsedToken}`,
    };
    try {
      const response = await axios.post(url, PostData, {
        headers,
      });
      // console.log("ProfitLossApi response:", response.data);

      const result = response.data;
      return result;
    } catch (error) {
      console.error('Profit loss error:', error.response.data);
    }
  },
);
