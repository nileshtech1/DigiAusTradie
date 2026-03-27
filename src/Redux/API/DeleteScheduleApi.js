
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Delete_Schedule_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Delete_Schedule_Url}`;

export const DeleteScheduleApi = createAsyncThunk(
  'DeleteSchedule',
  async (id) => {
    const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
        "Authorization": `Bearer ${parsedToken}`, 
    }
    try {
      const response = await axios.get(url + id, {
        headers
      });

      const result = response.data;
      return result;
    } catch (error) {
      console.error("Network error:", error);
     throw error;
    }
  }
);