
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL, Create_Expense_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Create_Expense_Url}`;

export const CreateExpenseApi = createAsyncThunk(
  'CreateExpense',
  async (PostData) => {
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
      console.log("Create expense response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      console.log('Network error in CreateExpenseApi:', error.response.data);
    }
  }
);