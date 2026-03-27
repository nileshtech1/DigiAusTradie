
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Forget_Password_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const url = `${BASE_URL}${Forget_Password_Url}`;

export const ForgetPassowrdApi = createAsyncThunk(
  'ForgetPassword',
  async (PostData) => {
    const headers = {
        "Content-Type": "application/json",
    }
    try {
      const response = await axios.post(url, PostData, {
        headers
      });

      const result = response.data;
      console.log("result", result);
      
      return result;
    } catch (error) {
      const errorMessage =
      error?.response?.data?.message || 
      
      error?.response?.data?.errors?.email_primary?.[0] || 'Something went wrong'; 
      console.log("error", error?.response?.data);
      
      Alert.alert('Error', errorMessage);

     throw error;
    }
  }
);