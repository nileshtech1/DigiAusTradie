import { createSlice } from '@reduxjs/toolkit';
import { UpdatePaymentDetailsApi } from '../API/UpdatePaymentDetailsAPi';

const UpdatePaymentSlice = createSlice({
  name: 'UpdatePayment',
  initialState: {
    UpdatePaymentLoading: false,
    isError: false,
    UpdatePaymentData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(UpdatePaymentDetailsApi.pending, (state, action) => {
      state.UpdatePaymentLoading = true;
    });
    builder.addCase(UpdatePaymentDetailsApi.fulfilled, (state, action) => {
      state.UpdatePaymentLoading = false;
      state.UpdatePaymentData = action.payload;
    });
    builder.addCase(UpdatePaymentDetailsApi.rejected, (state, action) => {
      state.UpdatePaymentLoading = false;
      state.isError = true;
    });
  },
});


export default UpdatePaymentSlice.reducer;
