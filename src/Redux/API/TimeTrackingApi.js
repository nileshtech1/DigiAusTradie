import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL, Time_Tracking_Url} from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Time_Tracking_Url}`;

export const TimeTrackingApi = createAsyncThunk(
  'TimeTracking',
  async PostData => {
    const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
      Authorization: `Bearer ${parsedToken}`,
    };
    try {
      const response = await axios.post(url, PostData, {
        headers,
      });

      const result = response.data;
      // console.log("TimeTrackingApi response:", result);
      
      return result;
    } catch (error) {
      console.log('Error in TimeTrackingApi:', error.response.message);
    }
  },
);
