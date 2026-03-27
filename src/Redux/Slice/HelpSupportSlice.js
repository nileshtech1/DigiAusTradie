import { createSlice } from '@reduxjs/toolkit';
import { HelpSupportApi } from '../API/HelpSupportApi';

const HelpSupportSlice = createSlice({
  name: 'HelpSupport',
  initialState: {
    HelpSupportloading: false,
    isError: false,
    HelpSupportData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(HelpSupportApi.pending, (state, action) => {
      state.HelpSupportloading = true;
    });
    builder.addCase(HelpSupportApi.fulfilled, (state, action) => {
      state.HelpSupportloading = false;
      state.HelpSupportData = action.payload;
    });
    builder.addCase(HelpSupportApi.rejected, (state, action) => {
      state.HelpSupportloading = false;
      state.isError = true;
    });
  },
});


export default HelpSupportSlice.reducer;
