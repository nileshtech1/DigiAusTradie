import { createSlice } from '@reduxjs/toolkit';
import { GetFinishedJobApi } from '../API/GetFinishedApi';

const GetFinishedJobSlice = createSlice({
  name: 'GetFinishedJob',
  initialState: {
    GetFinishJobLoading: false,
    isError: false,
    GetFinishedJobData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetFinishedJobApi.pending, (state, action) => {
      state.GetFinishJobLoading = true;
    });
    builder.addCase(GetFinishedJobApi.fulfilled, (state, action) => {
      state.GetFinishJobLoading = false;
      state.GetFinishedJobData = action.payload;
    });
    builder.addCase(GetFinishedJobApi.rejected, (state, action) => {
      state.GetFinishJobLoading = false;
      state.isError = true;
    });
  },
});


export default GetFinishedJobSlice.reducer;
