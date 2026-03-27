import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, SignUp_Url } from '../NWConfig';
import { Alert } from 'react-native';

const url = `${BASE_URL}${SignUp_Url}`;

export const SignUpApi = createAsyncThunk(
  'SignUpApi',
  async (PostData, { rejectWithValue }) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    try {
      const response = await axios.post(url, PostData, { headers });
      const result = response.data;
      // console.log('✅ SignUpApi response:', result);
      return result;
    } catch (error) {
      console.log('❌ SignUpApi error:', error.response?.data);

      // Extract and combine backend error messages
      const errData = error.response?.data;
      let message = 'Something went wrong! Please try again.';

      if (errData?.errors) {
        const allErrors = Object.values(errData.errors).flat().join('\n');
        message = allErrors || errData.message;
      } else if (errData?.message) {
        message = errData.message;
      }

      // Show alert
      Alert.alert('Signup Failed', message);

      // Return error for Redux
      return rejectWithValue(errData);
    }
  }
);
