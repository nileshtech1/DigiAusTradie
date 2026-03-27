import { createSlice } from '@reduxjs/toolkit';
import { GetHazardApi } from '../API/GetHazardApi';

const GetHazardSlice = createSlice({
  name: 'GetHazardsSlice',
  initialState: {
    HazardLoading: false,
    isError: false,
    GetHazardData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetHazardApi.pending, (state, action) => {
      state.HazardLoading = true;
    });
    builder.addCase(GetHazardApi.fulfilled, (state, action) => {
      state.HazardLoading = false;
      state.GetHazardData = action.payload;
    });
    builder.addCase(GetHazardApi.rejected, (state, action) => {
      state.HazardLoading = false;
      state.isError = true;
    });
  },
});


export default GetHazardSlice.reducer;
