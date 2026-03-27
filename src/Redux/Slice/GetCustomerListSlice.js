import { createSlice } from '@reduxjs/toolkit';
import { GetCustomerListApi } from '../API/GetCustomerListApi';

const GetCustomerListSlice = createSlice({
  name: 'CustomerList',
  initialState: {
    GetCustomerListLoading: false,
    isError: false,
    CustomerList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetCustomerListApi.pending, (state, action) => {
      state.GetCustomerListLoading = true;
    });
    builder.addCase(GetCustomerListApi.fulfilled, (state, action) => {
      state.GetCustomerListLoading = false;
      state.CustomerList = action.payload;
    });
    builder.addCase(GetCustomerListApi.rejected, (state, action) => {
      state.GetCustomerListLoading = false;
      state.isError = true;
    });
  },
});


export default GetCustomerListSlice.reducer;
