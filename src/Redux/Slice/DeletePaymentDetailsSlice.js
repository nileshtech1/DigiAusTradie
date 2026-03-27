import { createSlice } from '@reduxjs/toolkit';
import { DeletePaymentDetailsApi } from '../API/DeletePaymentDetailsApi';

const DeletePaymentSlice = createSlice({
  name: 'DeleteSchedule',
  initialState: {
    DeletePaymentdetailsLoading: false,
    isError: false,
    DeletePaymentdetailsData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(DeletePaymentDetailsApi.pending, (state, action) => {
      state.DeletePaymentdetailsLoading = true;
    });
    builder.addCase(DeletePaymentDetailsApi.fulfilled, (state, action) => {
      state.DeletePaymentdetailsLoading = false;
      state.DeletePaymentdetailsData = action.payload;
    });
    builder.addCase(DeletePaymentDetailsApi.rejected, (state, action) => {
      state.DeletePaymentdetailsLoading = false;
      state.isError = true;
    });
  },
});


export default DeletePaymentSlice.reducer;
