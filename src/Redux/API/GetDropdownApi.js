import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, commercial_Dropdown_Url, residential_Dropdown_Url, storeFrontJob_Dropdown_Url, swmsJobs_Dropdown_Url } from '../NWConfig';

const url1 = `${BASE_URL}${storeFrontJob_Dropdown_Url}`;

export const GetStoreFrontDropdownAPi = createAsyncThunk(
  'StoreFrontDropdown',
  async () => {

    const header = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(url1, { headers: header });
      const result = response.data;

      return result;
    } catch (error) {
      throw error;
    }
  }
);

const url2 = `${BASE_URL}${residential_Dropdown_Url}`;

export const GetResidentialDropdownAPi = createAsyncThunk(
  'ResidentialDropdown',
  async () => {

    const header = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(url2, { headers: header });
      const result = response.data;
      
      return result;
    } catch (error) {
      throw error;
    }
  }
);

const url3 = `${BASE_URL}${commercial_Dropdown_Url}`;

export const GetCommercialDropdownAPi = createAsyncThunk(
  'CommercialDropdown',
  async () => {

    const header = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(url3, { headers: header });
      const result = response.data;

      return result;
    } catch (error) {
      throw error;
    }
  }
);

const url4 = `${BASE_URL}${swmsJobs_Dropdown_Url}`;

export const GetSwmsDropdownAPi = createAsyncThunk(
  'SwmsDropdown',
  async () => {
    const header = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(url4, { headers: header });
      const result = response.data;
      
      return result;
    } catch (error) {
      throw error;
    }
  }
);
