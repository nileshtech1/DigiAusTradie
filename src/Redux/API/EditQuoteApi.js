
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL, Edit_Quote_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Edit_Quote_Url}`;

export const EditQuoteApi = createAsyncThunk(
  'EditQuote',
  async ({ formData, quotationId }) => {  
      const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${parsedToken}`, 
    }
    try {
      const response = await axios.post(url + quotationId, formData, {
        headers
      });
      // console.log("EditQuoteApi response", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Edit quote error:", error);
     throw error;
    }
  }
);