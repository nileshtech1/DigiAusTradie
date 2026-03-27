
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Create_Schedule_url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Create_Schedule_url}`;

export const CreateScheduleApi = createAsyncThunk(
  'CreateSchedule',
  async (PostData) => {
      const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);

    const headers = {
        "Authorization": `Bearer ${parsedToken}`, 
    }
    try {
      const response = await axios.post(url, PostData, {
        headers
      });
      const result = response.data;
      return result;
    } catch (error) {
      console.log('Network error in CreateScheduleApi:', error);
      
    }
  }
);