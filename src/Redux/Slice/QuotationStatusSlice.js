import { createSlice } from '@reduxjs/toolkit';
import { QuotationStatusApi } from '../API/QuotationStatusApi';

const QuotationStatusSlice = createSlice({
  name: 'QuotationStatusUpdate',
  initialState: {
    QuotationStatusLoading: false,
    isError: false,
    QuotationStatusUpdateData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(QuotationStatusApi.pending, (state, action) => {
      state.QuotationStatusLoading = true;
    });
    builder.addCase(QuotationStatusApi.fulfilled, (state, action) => {
      state.QuotationStatusLoading = false;
      state.QuotationStatusUpdateData = action.payload;
    });
    builder.addCase(QuotationStatusApi.rejected, (state, action) => {
      state.QuotationStatusLoading = false;
      state.isError = true;
    });
  },
});


export default QuotationStatusSlice.reducer;
