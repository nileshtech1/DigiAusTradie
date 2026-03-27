import { createSlice } from '@reduxjs/toolkit';
import { ProfitLossApi } from '../API/Profit&LossApi';

const ProfitLossSlice = createSlice({
  name: 'ProfitLoss',
  initialState: {
    ProfitLossLoading: false,
    isError: false,
    ProfitLossData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(ProfitLossApi.pending, (state, action) => {
      state.ProfitLossLoading = true;
    });
    builder.addCase(ProfitLossApi.fulfilled, (state, action) => {
      state.ProfitLossLoading = false;
      state.ProfitLossData = action.payload;
    });
    builder.addCase(ProfitLossApi.rejected, (state, action) => {
      state.ProfitLossLoading = false;
      state.isError = true;
    });
  },
});


export default ProfitLossSlice.reducer;
