
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_Finished_Job_url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_Finished_Job_url}`;

export const GetFinishedJobApi = createAsyncThunk(
  'GetFinishedJob',
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
        params : franchiseid,
      });

      const result = response.data;
      return result;
    } catch (error) {
      console.error("Network error:", error);
     throw error;
    }
  }
);