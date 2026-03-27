
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL, Create_New_Customer } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Create_New_Customer}`;

export const CreateCustomerApi = createAsyncThunk(
  'CreateCustomer',
  async (PostData, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('Token');
      const parsedToken = JSON.parse(token);
      const headers = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${parsedToken}`,
      };

      const response = await axios.post(url, PostData, { headers });
      return response.data;

    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;

        let errorMessages = '';
        Object.entries(errors).forEach(([field, messages]) => {
          errorMessages += `${field}: ${messages.join(', ')}\n`;
        });

        Alert.alert("Validation Error", errorMessages.trim());

        return rejectWithValue(errors);
      }

      Alert.alert("Error", error.message || "Something went wrong");
      return rejectWithValue(error.message || "Something went wrong");
}

  }
);
