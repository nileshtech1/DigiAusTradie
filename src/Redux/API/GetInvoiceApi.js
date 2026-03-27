import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_Invoice_Pdf_Url, Get_Invoice_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_Invoice_Url}`;

export const GetInvoiceUrl = createAsyncThunk(
  'GetInvoiceApi',
  async ({ token, franchiseid }, { rejectWithValue }) => {
    try {
      const storedToken = await AsyncStorage.getItem('Token');
      const parsedToken = storedToken ? JSON.parse(storedToken) : null;
      
      const token = parsedToken || token;

      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      };

      const response = await axios.get(url, { headers, params: franchiseid });
      // console.log("GetInvoiceUrl response:", response.data);
      
      return response.data;
    } catch (error) {
      console.error('Invoice list error:', error.response.data);
      
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch invoices'
      );
    }
  }
);

const url1 = `${BASE_URL}${Get_Invoice_Pdf_Url}`;

export const GetInvoicePdfUrl = createAsyncThunk(
  'GetInvoicePdfApi',
  async ({token1, id, franchiseid}, { rejectWithValue }) => {
    try {
      const storedToken = await AsyncStorage.getItem('Token');
      const parsedToken = storedToken ? JSON.parse(storedToken) : null;
      
      const token = parsedToken || token1;

      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      };

      const response = await axios.get(url1 + id, { headers, params: franchiseid });

      return response.data;
    } catch (error) {
      console.error('Invoice pdf error:', error);
      
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch invoices'
      );
    }
  }
);
