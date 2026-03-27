import { createSlice } from '@reduxjs/toolkit';
import { ForgetPassowrdApi } from '../API/ForgetPasswordApi';

const ForgetPasswordSlice = createSlice({
  name: 'ForgetPassowrd',
  initialState: {
    ForgetPasswordLoading: false,
    isError: false,
    ForgetPasswordData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(ForgetPassowrdApi.pending, (state, action) => {
      state.ForgetPasswordLoading = true;
    });
    builder.addCase(ForgetPassowrdApi.fulfilled, (state, action) => {
      state.ForgetPasswordLoading = false;
      state.ForgetPasswordData = action.payload;
    });
    builder.addCase(ForgetPassowrdApi.rejected, (state, action) => {
      state.ForgetPasswordLoading = false;
      state.isError = true;
    });
  },
});


export default ForgetPasswordSlice.reducer;
