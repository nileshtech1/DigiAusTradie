
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Change_Password_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Change_Password_Url}`;

export const ChangePasswordApi = createAsyncThunk(
  'ChangePassword',
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
      console.log('Network error in ChangePasswordApi:', error);
    }
  }
);