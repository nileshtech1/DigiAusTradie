import { createSlice } from '@reduxjs/toolkit';
import { UserUpdateApi } from '../API/UserUpdateApi';

const UserUpdateSlice = createSlice({
  name: 'UserUpdate',
  initialState: {
    UpdateUserLoading: false,
    isError: false,
    UpdateUserData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(UserUpdateApi.pending, (state, action) => {
      state.UpdateUserLoading = true;
    });
    builder.addCase(UserUpdateApi.fulfilled, (state, action) => {
      state.UpdateUserLoading = false;
      state.UpdateUserData = action.payload;
    });
    builder.addCase(UserUpdateApi.rejected, (state, action) => {
      state.UpdateUserLoading = false;
      state.isError = true;
    });
  },
});


export default UserUpdateSlice.reducer;
