import { createSlice } from '@reduxjs/toolkit';
import { CreateQuoteApi } from '../API/CreateQuoteApi';

const CreateQuoteSlice = createSlice({
  name: 'CreateQuote',
  initialState: {
    CreateQuoteLoading: false,
    isError: false,
    CreateQuoteData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(CreateQuoteApi.pending, (state, action) => {
      state.CreateQuoteLoading = true;
    });
    builder.addCase(CreateQuoteApi.fulfilled, (state, action) => {
      state.CreateQuoteLoading = false;
      state.CreateQuoteData = action.payload;
    });
    builder.addCase(CreateQuoteApi.rejected, (state, action) => {
      state.CreateQuoteLoading = false;
      state.isError = true;
    });
  },
});


export default CreateQuoteSlice.reducer;
