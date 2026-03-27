import { createSlice } from '@reduxjs/toolkit';
import { GetPaymentDetailsApi } from '../API/GetPaymentDetailsApi';

const GetPaymentSlice = createSlice({
  name: 'GetPayment',
  initialState: {
    GetPaymentLoading: false,
    isError: false,
    GetPaymentData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetPaymentDetailsApi.pending, (state, action) => {
      state.GetPaymentLoading = true;
    });
    builder.addCase(GetPaymentDetailsApi.fulfilled, (state, action) => {
      state.GetPaymentLoading = false;
      state.GetPaymentData = action.payload;
    });
    builder.addCase(GetPaymentDetailsApi.rejected, (state, action) => {
      state.GetPaymentLoading = false;
      state.isError = true;
    });
  },
});


export default GetPaymentSlice.reducer;
