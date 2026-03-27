
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL,Login_Url, GoogleLogin_Url } from '../NWConfig';

const url = `${BASE_URL}${Login_Url}`;
const googleUrl = `${BASE_URL}${GoogleLogin_Url}`

export const LoginApi = createAsyncThunk(
  'Login',
  async (PostData) => {
    const header = {
        "Content-Type" : "application/json"
    }
    try {
      const response = await axios.post(url,PostData,{header});
      const result = response.data;
      
      return result;
    } catch (error) {
      Alert.alert('Login Error', error.response.data.message || "Something went wrong")
    }
  }
);

export const googleLoginApi = createAsyncThunk(
  'googleLogin',
  async (PostData) => {
    const header = {
        "Content-Type" : "application/json"
    }
    try {
      
      const response = await axios.post(googleUrl,PostData,{header});
      const result = response.data;
      // console.log("googleLoginApi response:", result);
      
      return result;
    } catch (error) {
      Alert.alert('Login Error', error.response.data.message || "Something went wrong")
    }
  }
);