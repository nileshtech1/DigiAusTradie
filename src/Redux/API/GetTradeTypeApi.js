import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Get_trade_Type_Url } from '../NWConfig';

const url = `${BASE_URL}${Get_trade_Type_Url}`;

export const GetTradeTypeApi = createAsyncThunk(
  'GetTradeType',
  async () => {

    const header = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(url, { headers: header });
      // console.log("GetTradeTypeApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
     console.log("GetTradeTypeApi error", error.response.data);
     
    }
  }
);
