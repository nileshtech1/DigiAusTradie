import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_Time_Tracking_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_Time_Tracking_Url}`;

export const GetTimetrackingApi = createAsyncThunk(
  'GetTimeTracking',
  async ({id2, token}) => {
    const token1 = await AsyncStorage.getItem('Token');

    const parsedToken = JSON.parse(token1);

    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${parsedToken || token}`, 
    };

    try {
      const response = await axios.get(url + id2, { headers: header });
      const result = response.data;
      // console.log("GetTimetrackingApi response:", result);
      
      return result;
    } catch (error) {
      // throw error;
      // console.log("GetTimetrackingApi error", error.response.data);
      
    }
  }
);

const url1 = `${BASE_URL}${Get_Time_Tracking_Url}`;

export const GetAllTimetrackingApi = createAsyncThunk(
  'GetAllTimeTracking',
  async ({token, franchiseid}) => {
    const token1 = await AsyncStorage.getItem('Token');

    const parsedToken = JSON.parse(token1);

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${parsedToken || token}`, 
    };

    try {
      const response = await axios.get(url1 + 0, { headers, params: franchiseid });
      const result = response.data;
      // console.log("GetAllTimetrackingApi response:", result);
      
      return result;
    } catch (error) {
      // throw error;
      console.log("GetAllTimetrackingApi error", error.response.data);
      
    }
  }
);
