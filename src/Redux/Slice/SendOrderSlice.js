import { createSlice } from '@reduxjs/toolkit';
import { SendOrderApi } from '../API/SendOrderApi';

const SendOrderSlice = createSlice({
  name: 'SendOrder',
  initialState: {
    SendOrderLoading: false,
    isError: false,
    SendOrderData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(SendOrderApi.pending, (state, action) => {
      state.SendOrderLoading = true;
    });
    builder.addCase(SendOrderApi.fulfilled, (state, action) => {
      state.SendOrderLoading = false;
      state.SendOrderData = action.payload;
    });
    builder.addCase(SendOrderApi.rejected, (state, action) => {
      state.SendOrderLoading = false;
      state.isError = true;
    });
  },
});


export default SendOrderSlice.reducer;
