import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_All_User_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_All_User_Url}`;

export const GetAllUserApi = createAsyncThunk(
  'GetAllUser',
  async () => {
    const header = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(url, { headers: header });
      // console.log("GetAllUserApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      console.log("GetAllUserApi error", error?.response);
      
    }
  }
);
