import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL, Get_Tutorial_list } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_Tutorial_list}`;

export const GetTutorialApi = createAsyncThunk(
  'TutorialList',
  async (catType) => {
    const token = await AsyncStorage.getItem('Token');
    const user = await AsyncStorage.getItem('User');
    const parsedToken = JSON.parse(token);
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${parsedToken}`, 
    };

    try {
      const response = await axios.get(url + catType, { headers: header });
      const result = response.data;
      return result;
    } catch (error) {
      throw error;
    }
  }
);
