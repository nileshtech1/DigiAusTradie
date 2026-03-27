import { createSlice } from '@reduxjs/toolkit';
import { ChangePasswordApi } from '../API/ChangePasswordApi';

const ChangePasswordSlice = createSlice({
  name: 'ChangePassword',
  initialState: {
    ChangePasswordLoading: false,
    isError: false,
    ChangePasswordData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(ChangePasswordApi.pending, (state, action) => {
      state.ChangePasswordLoading = true;
    });
    builder.addCase(ChangePasswordApi.fulfilled, (state, action) => {
      state.ChangePasswordLoading = false;
      state.ChangePasswordData = action.payload;
    });
    builder.addCase(ChangePasswordApi.rejected, (state, action) => {
      state.ChangePasswordLoading = false;
      state.isError = true;
    });
  },
});


export default ChangePasswordSlice.reducer;
