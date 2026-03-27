
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_RiskLevels_Url } from '../NWConfig';

const url = `${BASE_URL}${Get_RiskLevels_Url}`;

export const GetRiskLevelsApi = createAsyncThunk(
  'GetRiskLevels',
  async ({token, id}) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
     const response = await axios.get(`${url}${id}`, { headers });
      
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Get Risk Level Api error:", error);
    }
  }
);