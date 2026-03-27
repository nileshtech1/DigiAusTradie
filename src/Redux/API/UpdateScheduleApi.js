
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Update_Schedule_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Update_Schedule_Url}`;

export const UpdateScheduleApi = createAsyncThunk(
  'UpdateScheduleApi/UpdateSchedule',
  async (PostData) => {
      const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${parsedToken}`, 
    }
    try {
      const response = await axios.post(url, PostData, {
        headers
      });
      const result = response.data;
      return result;
    } catch (error) {
     console.log('Network error in UpdateScheduleApi:', error);
     
    }
  }
);