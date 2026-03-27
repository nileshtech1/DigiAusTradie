
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_Hazard_Url } from '../NWConfig';

const url = `${BASE_URL}${Get_Hazard_Url}`;

export const GetHazardApi = createAsyncThunk(
  'GetHazard',
  async (token) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url, {
        headers,
      });
      // console.log("GetHazardApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Get Hazard Api error:", error);
    }
  }
);