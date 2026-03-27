import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Delete_account_url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Delete_account_url}`;

export const DeleteAccountApi = createAsyncThunk(
  'DeleteAccountApi',
  async ({postData, token}) => {
      const token1 = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token1);
    const finalToken = parsedToken || token;
    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${finalToken}`,
        },
        // IMPORTANT: For DELETE requests, data must be under the 'data' key
        data: postData 
      });

      const result = response.data;
      console.log("DeleteAccountApi result", result);
      
      return result;
    } catch (error) {
    console.log(error.response.data)
    }
  }
);