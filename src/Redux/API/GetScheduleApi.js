import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_Schedule_List_url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_Schedule_List_url}`;

export const GetScheduleApi = createAsyncThunk(
  'ScheduleList',
  async ({token, franchiseid}) => {
    const token1 = await AsyncStorage.getItem('Token');

    const parsedToken = JSON.parse(token1);

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${parsedToken || token}`, 
    };

    try {
      const response = await axios.get(url , { headers, params : franchiseid });
      const result = response.data;
      // console.log("GetScheduleApi response:", result);
      
      return result;
    } catch (error) {
     console.log("GetScheduleApi error", error.response.data);
    }
  }
);
