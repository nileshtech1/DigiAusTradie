import { createSlice } from '@reduxjs/toolkit';
import { SignUpApi } from '../API/SignUpApi';

const SignUpSlice = createSlice({
  name: 'SignUp',
  initialState: {
    SignUpLoading: false,
    isError: false,
    SignUpdata: [],
  },

  extraReducers: (builder) => {
    builder.addCase(SignUpApi.pending, (state, action) => {
      state.SignUpLoading = true;
    });
    builder.addCase(SignUpApi.fulfilled, (state, action) => {
      state.SignUpLoading = false;
      state.SignUpdata = action.payload;
    });
    builder.addCase(SignUpApi.rejected, (state, action) => {
      state.SignUpLoading = false;
      state.isError = true;
    });
  },
});


export default SignUpSlice.reducer;
