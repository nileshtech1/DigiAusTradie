import { createSlice } from '@reduxjs/toolkit';
import { UserDetailsApi } from '../API/GetUserDetailsApi';

const GetUserDetailsSlice = createSlice({
  name: 'UserDetails',
  initialState: {
    UserDetailsLoading: false,
    isError: false,
    UserData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(UserDetailsApi.pending, (state, action) => {
      state.UserDetailsLoading = true;
    });
    builder.addCase(UserDetailsApi.fulfilled, (state, action) => {
      state.UserDetailsLoading = false;
      state.UserData = action.payload;
    });
    builder.addCase(UserDetailsApi.rejected, (state, action) => {
      state.UserDetailsLoading = false;
      state.isError = true;
    });
  },
});


export default GetUserDetailsSlice.reducer;
