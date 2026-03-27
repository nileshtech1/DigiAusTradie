import { createSlice } from '@reduxjs/toolkit'
import { GetTradeTypeApi } from '../API/GetTradeTypeApi';

const GetTradeTypeSlice = createSlice({
  name: 'TradeType',
  initialState: {
    TradeTypeLoading: false,
    isError: false,
    TradeTypeData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetTradeTypeApi.pending, (state, action) => {
      state.TradeTypeLoading = true;
    });
    builder.addCase(GetTradeTypeApi.fulfilled, (state, action) => {
      state.TradeTypeLoading = false;
      state.TradeTypeData = action.payload;
    });
    builder.addCase(GetTradeTypeApi.rejected, (state, action) => {
      state.TradeTypeLoading = false;
      state.isError = true;
    });
  },
});


export default GetTradeTypeSlice.reducer;
