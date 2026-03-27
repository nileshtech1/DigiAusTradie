import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_Franchise_Document_Url, Get_RiskAssesment_Document_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url1 = `${BASE_URL}${Get_Franchise_Document_Url}`;
const url2 = `${BASE_URL}${Get_RiskAssesment_Document_Url}`;

export const GetFranchiseDocumentApi = createAsyncThunk(
  'GetFranchiseDocumentApi',
  async (token) => {
      const token1 = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token1);
    const finalToken = parsedToken || token;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${finalToken}`, 
    }
    try {
      const response = await axios.get(url1, {
        headers
      });
      // console.log("GetFranchiseDocumentApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Network error in Franchise Document API:", error);
     throw error;
    }
  }
);

export const GetRiskAssesmentDocumentApi = createAsyncThunk(
    'GetRiskAssesmentDocumentApi',
    async (token) => {
        const token1 = await AsyncStorage.getItem('Token');
      const parsedToken = JSON.parse(token1);
      const finalToken = parsedToken || token;
      const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${finalToken}`, 
      }
      try {
        const response = await axios.get(url2, {
          headers
        });
        // console.log("GetRiskAssesmentDocumentApi response:", response.data);
        const result = response.data;
        return result;
      } catch (error) {
        console.error("Network error in Risk Assessment Document API:", error);
       throw error;
      }
    }
  );