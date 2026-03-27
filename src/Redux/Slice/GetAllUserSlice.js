import { createSlice } from '@reduxjs/toolkit'
import { GetAllUserApi } from '../API/GetAllUserApi';

const GetAllUserSlice = createSlice({
  name: 'AllUser',
  initialState: {
    GetAllUserLoading: false,
    isError: false,
    AllUserList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetAllUserApi.pending, (state, action) => {
      state.GetAllUserLoading = true;
    });
    builder.addCase(GetAllUserApi.fulfilled, (state, action) => {
      state.GetAllUserLoading = false;
      state.AllUserList = action.payload;
    });
    builder.addCase(GetAllUserApi.rejected, (state, action) => {
      state.GetAllUserLoading = false;
      state.isError = true;
    });
  },
});


export default GetAllUserSlice.reducer;
