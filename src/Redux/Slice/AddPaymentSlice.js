import { createSlice } from '@reduxjs/toolkit';
import { AddPaymentApi } from '../API/AddPaymentDetailsApi';

const AddPaymentSlice = createSlice({
  name: 'AddPayment',
  initialState: {
    AddPaymentLoading: false,
    isError: false,
    AddPaymentData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(AddPaymentApi.pending, (state, action) => {
      state.AddPaymentLoading = true;
    });
    builder.addCase(AddPaymentApi.fulfilled, (state, action) => {
      state.AddPaymentLoading = false;
      state.AddPaymentData = action.payload;
    });
    builder.addCase(AddPaymentApi.rejected, (state, action) => {
      state.AddPaymentLoading = false;
      state.isError = true;
    });
  },
});


export default AddPaymentSlice.reducer;
