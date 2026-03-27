import { createSlice } from '@reduxjs/toolkit';
import { GetPaymenthistoryApi } from '../API/GetPaymentHistoryApi';

const GetPaymentHistorySlice = createSlice({
  name: 'GetPaymentHistory',
  initialState: {
    GetPaymentHistoryLoading: false,
    isError: false,
    GetPaymentHistoryData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetPaymenthistoryApi.pending, (state, action) => {
      state.GetPaymentHistoryLoading = true;
    });
    builder.addCase(GetPaymenthistoryApi.fulfilled, (state, action) => {
      state.GetPaymentHistoryLoading = false;
      state.GetPaymentHistoryData = action.payload;
    });
    builder.addCase(GetPaymenthistoryApi.rejected, (state, action) => {
      state.GetPaymentHistoryLoading = false;
      state.isError = true;
    });
  },
});


export default GetPaymentHistorySlice.reducer;
