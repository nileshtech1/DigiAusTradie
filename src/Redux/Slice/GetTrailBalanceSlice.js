import { createSlice } from '@reduxjs/toolkit'
import { GetTrailBalanceApi } from '../API/GettrailbalanceApi';

const GetTrailBalanceSlice = createSlice({
  name: 'TrailBalance',
  initialState: {
    TrailBalanceLoading: false,
    isError: false,
    TrailBalanceData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetTrailBalanceApi.pending, (state, action) => {
      state.TrailBalanceLoading = true;
    });
    builder.addCase(GetTrailBalanceApi.fulfilled, (state, action) => {
      state.TrailBalanceLoading = false;
      state.TrailBalanceData = action.payload;
    });
    builder.addCase(GetTrailBalanceApi.rejected, (state, action) => {
      state.TrailBalanceLoading = false;
      state.isError = true;
    });
  },
});


export default GetTrailBalanceSlice.reducer;
