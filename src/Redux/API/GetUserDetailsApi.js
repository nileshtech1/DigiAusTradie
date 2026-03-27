import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL, Get_UserData_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Get_UserData_Url}`;

export const UserDetailsApi = createAsyncThunk(
  'UserDetails',
  async (token) => {
    const token1 = await AsyncStorage.getItem('Token');

    const parsedToken = JSON.parse(token1);
    

    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${parsedToken || token}`, 
    };

    try {
      const response = await axios.get(url, { headers: header });
      // console.log("UserDetailsApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
    //  console.log("UserDetailsApi error", error);
     
    }
  }
);
