import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_State_List } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_State_List}`;

export const GetStateApi = createAsyncThunk(
  'StateList',
  async (CountryCode) => {
    const token = await AsyncStorage.getItem('Token');

    const parsedToken = JSON.parse(token);

    const header = {
      "Content-Type": "application/json",
    //   "Authorization": `Bearer ${parsedToken}`, 
    };

    try {
      const response = await axios.get(url + CountryCode, { headers: header });
      // console.log('GetStateApi response:', response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      throw error;
    }
  }
);
