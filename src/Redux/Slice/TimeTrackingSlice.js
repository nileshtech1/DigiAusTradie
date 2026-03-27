import { createSlice } from '@reduxjs/toolkit';
import { TimeTrackingApi } from '../API/TimeTrackingApi';

const TimeTrackingSlice = createSlice({
  name: 'TimeTracking',
  initialState: {
    TimeTrackingLoading: false,
    isError: false,
    TimeTrackingData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(TimeTrackingApi.pending, (state, action) => {
      state.TimeTrackingLoading = true;
    });
    builder.addCase(TimeTrackingApi.fulfilled, (state, action) => {
      state.TimeTrackingLoading = false;
      state.TimeTrackingData = action.payload;
    });
    builder.addCase(TimeTrackingApi.rejected, (state, action) => {
      state.TimeTrackingLoading = false;
      state.isError = true;
    });
  },
});


export default TimeTrackingSlice.reducer;
