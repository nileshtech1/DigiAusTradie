import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL, Get_Tutorial_cat } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_Tutorial_cat}`;

export const GetTutorialCatApi = createAsyncThunk(
  'TutorialCatList',
  async (token1) => {
    const token = await AsyncStorage.getItem('Token');
    const user = await AsyncStorage.getItem('User');
    const parsedToken = JSON.parse(token);
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${parsedToken || token1}`, 
    };

    try {
      const response = await axios.get(url, { headers: header });
      // console.log("GetTutorialCatApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      throw error;
    }
  }
);
