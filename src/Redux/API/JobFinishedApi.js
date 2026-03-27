import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL, Job_Finished_Url} from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Job_Finished_Url}`;

export const JobFinishedApi = createAsyncThunk(
  'JobFinished',
  async PostData => {
    const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${parsedToken}`,
    };

    try {
      const response = await axios.post(url, PostData, {
        headers,
      });
      console.log('JobFinishedApi response:', response.data);

      const result = response.data;
      return result;
    } catch (error) {
      console.error('finish job api response:', error.response.data);
      throw error;
    }
  },
);
