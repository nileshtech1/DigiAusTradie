import { createSlice } from '@reduxjs/toolkit';
import { GetXeroSentQuotesApi, UpdateQuoteSerialNoApi } from '../API/XeroQuoteApi';

const XeroQuoteSlice = createSlice({
  name: 'XeroQuoteSlice',
  initialState: {
    isLoadingQuotes: false,
    isLoadingUpdate: false,
    sentQuotes: [],
    updateResponse: null,
    isErrorQuotes: false,
    isErrorUpdate: false,
  },

  extraReducers: (builder) => {
    // Get Xero Sent Quotes
    builder.addCase(GetXeroSentQuotesApi.pending, (state) => {
      state.isLoadingQuotes = true;
      state.isErrorQuotes = false;
    });
    builder.addCase(GetXeroSentQuotesApi.fulfilled, (state, action) => {
      state.isLoadingQuotes = false;
      state.sentQuotes = action.payload;
    });
    builder.addCase(GetXeroSentQuotesApi.rejected, (state) => {
      state.isLoadingQuotes = false;
      state.isErrorQuotes = true;
    });

    // Update Quote Serial No
    builder.addCase(UpdateQuoteSerialNoApi.pending, (state) => {
      state.isLoadingUpdate = true;
      state.isErrorUpdate = false;
    });
    builder.addCase(UpdateQuoteSerialNoApi.fulfilled, (state, action) => {
      state.isLoadingUpdate = false;
      state.updateResponse = action.payload;
    });
    builder.addCase(UpdateQuoteSerialNoApi.rejected, (state) => {
      state.isLoadingUpdate = false;
      state.isErrorUpdate = true;
    });
  },
});

export default XeroQuoteSlice.reducer;
