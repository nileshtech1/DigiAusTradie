import { createSlice } from '@reduxjs/toolkit';
import { GetQuotationListApi } from '../API/GetQuotationListApi';

const GetQuotationSlice = createSlice({
  name: 'QuotationList',
  initialState: {
    GetQuotationLoader: false,
    isError: false,
    QuotationList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetQuotationListApi.pending, (state, action) => {
      state.GetQuotationLoader = true;
    });
    builder.addCase(GetQuotationListApi.fulfilled, (state, action) => {
      state.GetQuotationLoader = false;
      state.QuotationList = action.payload;
    });
    builder.addCase(GetQuotationListApi.rejected, (state, action) => {
      state.GetQuotationLoader = false;
      state.isError = true;
    });
  },
});


export default GetQuotationSlice.reducer;
