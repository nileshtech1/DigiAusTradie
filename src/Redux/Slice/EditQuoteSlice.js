import { createSlice } from '@reduxjs/toolkit';
import { EditQuoteApi } from '../API/EditQuoteApi';

const EditQuoteSlice = createSlice({
  name: 'EditQuote',
  initialState: {
    EditQuoteLoading: false,
    isError: false,
    EditQuoteData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(EditQuoteApi.pending, (state, action) => {
      state.EditQuoteLoading = true;
    });
    builder.addCase(EditQuoteApi.fulfilled, (state, action) => {
      state.EditQuoteLoading = false;
      state.EditQuoteData = action.payload;
    });
    builder.addCase(EditQuoteApi.rejected, (state, action) => {
      state.EditQuoteLoading = false;
      state.isError = true;
    });
  },
});


export default EditQuoteSlice.reducer;
