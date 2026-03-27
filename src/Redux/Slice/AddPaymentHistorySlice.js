import { createSlice } from '@reduxjs/toolkit';
import { AddPaymentHistoryApi } from '../API/AddPaymentHistory';

const AddPaymentHistorySlice = createSlice({
  name: 'AddPaymentHistory',
  initialState: {
    AddPaymentHistoryLoading: false,
    isError: false,
    AddPaymenthistoryData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(AddPaymentHistoryApi.pending, (state, action) => {
      state.AddPaymentHistoryLoading = true;
    });
    builder.addCase(AddPaymentHistoryApi.fulfilled, (state, action) => {
      state.AddPaymentHistoryLoading = false;
      state.AddPaymenthistoryData = action.payload;
    });
    builder.addCase(AddPaymentHistoryApi.rejected, (state, action) => {
      state.AddPaymentHistoryLoading = false;
      state.isError = true;
    });
  },
});


export default AddPaymentHistorySlice.reducer;
