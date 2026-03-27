import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL, Get_Country_list } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_Country_list}`;

export const GetCountryListApi = createAsyncThunk(
  'CountryList',
  async () => {
    const token = await AsyncStorage.getItem('Token');

    const parsedToken = JSON.parse(token);

    const header = {
      "Content-Type": "application/json",
    //   "Authorization": `Bearer ${parsedToken}`, 
    };

    try {
      const response = await axios.get(url, { headers: header });
      // console.log('GetCountryListApi response:', response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      throw error;
    }
  }
);
