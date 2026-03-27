import { createSlice } from '@reduxjs/toolkit'
import { GetAccountApi } from '../API/GetAccountsApi';

const GetAccountSlice = createSlice({
  name: 'AccountCode',
  initialState: {
    GetAccountLoading: false,
    isError: false,
    AccountList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetAccountApi.pending, (state, action) => {
      state.GetAccountLoading = true;
    });
    builder.addCase(GetAccountApi.fulfilled, (state, action) => {
      state.GetAccountLoading = false;
      state.AccountList = action.payload;
    });
    builder.addCase(GetAccountApi.rejected, (state, action) => {
      state.GetAccountLoading = false;
      state.isError = true;
    });
  },
});


export default GetAccountSlice.reducer;
