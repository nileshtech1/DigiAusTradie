import { createSlice } from '@reduxjs/toolkit';
import { GetRiskLevelsApi } from '../API/GetRiskLevelsApi';

const GetRiskLevelSlice = createSlice({
  name: 'RiskLevelsSlice',
  initialState: {
    RiskLevelLoading: false,
    isError: false,
    GetRiskLevelData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetRiskLevelsApi.pending, (state, action) => {
      state.RiskLevelLoading = true;
    });
    builder.addCase(GetRiskLevelsApi.fulfilled, (state, action) => {
      state.RiskLevelLoading = false;
      state.GetRiskLevelData = action.payload;
    });
    builder.addCase(GetRiskLevelsApi.rejected, (state, action) => {
      state.RiskLevelLoading = false;
      state.isError = true;
    });
  },
});


export default GetRiskLevelSlice.reducer;
