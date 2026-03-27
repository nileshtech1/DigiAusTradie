import { googleLoginApi, LoginApi } from '../API/LoginApi';
import { createSlice } from '@reduxjs/toolkit';

const LoginSlice = createSlice({
  name: 'Login',
  initialState: {
    LoginLoading: false,
    isError: false,
    isLoggedin: false,
    LoginData: [],
  },

  reducers: {
    logout: (state) => {
      state.isLoggedin = false;
      state.LoginData = [];
    },
    clearError: (state) => {
      state.isError = false;
    },
  },

  extraReducers: (builder) => {
    // ✅ For regular Login API
    builder
      .addCase(LoginApi.pending, (state) => {
        state.LoginLoading = true;
        state.isError = false;
      })
      .addCase(LoginApi.fulfilled, (state, action) => {
        state.LoginLoading = false;
        state.LoginData = action.payload;
        state.isLoggedin = true;
        state.isError = false;
      })
      .addCase(LoginApi.rejected, (state) => {
        state.LoginLoading = false;
        state.isError = true;
      });

    // ✅ For Google Login API
    builder
      .addCase(googleLoginApi.pending, (state) => {
        state.LoginLoading = true;
        state.isError = false;
      })
      .addCase(googleLoginApi.fulfilled, (state, action) => {
        state.LoginLoading = false;
        state.LoginData = action.payload;
        state.isLoggedin = true;
        state.isError = false;

      })
      .addCase(googleLoginApi.rejected, (state) => {
        state.LoginLoading = false;
        state.isError = true;
      });
  },
});

export const { logout, clearError } = LoginSlice.actions;
export default LoginSlice.reducer;
