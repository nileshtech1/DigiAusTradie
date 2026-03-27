import { createSlice } from '@reduxjs/toolkit'
import { GetStockApi } from '../API/GetStockApi';

const GetStockSlice = createSlice({
  name: 'StockList',
  initialState: {
    GetStockLoading: false,
    isError: false,
    StockData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetStockApi.pending, (state, action) => {
      state.GetStockLoading = true;
    });
    builder.addCase(GetStockApi.fulfilled, (state, action) => {
      state.GetStockLoading = false;
      state.StockData = action.payload;
    });
    builder.addCase(GetStockApi.rejected, (state, action) => {
      state.GetStockLoading = false;
      state.isError = true;
    });
  },
});


export default GetStockSlice.reducer;
