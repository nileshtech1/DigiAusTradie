import { createSlice } from '@reduxjs/toolkit';
import { JobFinishedApi } from '../API/JobFinishedApi';

const JobFinishedSlice = createSlice({
  name: 'JobFinished',
  initialState: {
    JobFinishedLoading: false,
    isError: false,
    JobFinishedData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(JobFinishedApi.pending, (state, action) => {
      state.JobFinishedLoading = true;
    });
    builder.addCase(JobFinishedApi.fulfilled, (state, action) => {
      state.JobFinishedLoading = false;
      state.JobFinishedData = action.payload;
    });
    builder.addCase(JobFinishedApi.rejected, (state, action) => {
      state.JobFinishedLoading = false;
      state.isError = true;
    });
  },
});


export default JobFinishedSlice.reducer;
