
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Add_Payment_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Add_Payment_Url}`;
console.log("url:", url);


export const AddPaymentApi = createAsyncThunk(
  'AddPaymentApi',
  async (PostData) => {
    console.log("PostData in AddPaymentApi:", PostData);
    
    const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${parsedToken}`, 
    }
    try {
      const response = await axios.post(url, PostData, {
        headers
      });
      console.log("Response from AddPaymentApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      console.log('Error in AddPaymentApi:', error.response.data);
    }
  }
);