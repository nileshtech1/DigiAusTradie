
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Edit_Customer } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Edit_Customer}`;

export const EditCustomerApi = createAsyncThunk(
  'EditCustomer',
  async ({ formData, customerId }) => {
    
      const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${parsedToken}`, 
    }
    try {
      const response = await axios.post(url + customerId, formData, {
        headers
      });
      // console.log("EditCustomerApi response", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
     console.log("EditCustomerApi error", error.response?.data);
     
    }
  }
);