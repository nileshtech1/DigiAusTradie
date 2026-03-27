import { createSlice } from '@reduxjs/toolkit'
import { GetCountryListApi } from '../API/GetCountryApi';

const GetCountrySlice = createSlice({
  name: 'CountryList',
  initialState: {
    GetCountryLoading: false,
    isError: false,
    CountryListData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetCountryListApi.pending, (state, action) => {
      state.GetCountryLoading = true;
    });
    builder.addCase(GetCountryListApi.fulfilled, (state, action) => {
      state.GetCountryLoading = false;
      state.CountryListData = action.payload;
    });
    builder.addCase(GetCountryListApi.rejected, (state, action) => {
      state.GetCountryLoading = false;
      state.isError = true;
    });
  },
});


export default GetCountrySlice.reducer;
