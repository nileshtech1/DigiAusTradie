import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Xero_Sent_Quotes, update_quote_serial_no } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url1 = `${BASE_URL}${Xero_Sent_Quotes}`;
const url2 = `${BASE_URL}${update_quote_serial_no}`;

export const GetXeroSentQuotesApi = createAsyncThunk(
  'GetSentQuotesApi',
  async ({ token, postData1 }) => {
    const token1 = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token1);
    const finalToken = parsedToken || token;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${finalToken}`, 
    };

    try {
      const response = await axios.post(url1,postData1, {
        headers,
      });
      // console.log("Sent Quotes API Response:", response.data);
      
      return response.data;
    } catch (error) {
      console.warn("Error in Sent Quotes API:", error.response.data);
    }
  }
);

  
  export const UpdateQuoteSerialNoApi = createAsyncThunk(
    'UpdateQuoteSerialNoApi',
    async ({ token, franchiseid }) => {
      const token1 = await AsyncStorage.getItem('Token');
      const parsedToken = JSON.parse(token1);
      const finalToken = parsedToken || token;
  
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${finalToken}`, 
      }
  
      try {
        const response = await axios.get(url2, { 
          headers,
          params: franchiseid,
         });
        //  console.log("Update Quote Serial No API Response:", response.data);
         
        return response.data;
      } catch (error) {
        console.error("Network error in Update Quote Serial No API:", error);
      }
    }
  );
  