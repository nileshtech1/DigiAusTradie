import { createSlice } from '@reduxjs/toolkit';
import { GetAllTimetrackingApi, GetTimetrackingApi } from '../API/GetTimeTrackedApi';

const GetTimeTrackingSlice = createSlice({
  name: 'GetTimeTracking',
  initialState: {
    timeTrackerLoader: false,
    allTimeTrackerLoader: false,
    isError: false,
    isAllError: false,
    timeTrackerData: [],
    allTimeTrackerData: [],
  },

  extraReducers: (builder) => {
    // Separate pending actions
    builder.addCase(GetTimetrackingApi.pending, (state) => {
      state.timeTrackerLoader = true;
    });
    builder.addCase(GetTimetrackingApi.fulfilled, (state, action) => {
      state.timeTrackerLoader = false;
      state.timeTrackerData = action.payload;
    });
    builder.addCase(GetTimetrackingApi.rejected, (state) => {
      state.timeTrackerLoader = false;
      state.isError = true;
    });

    builder.addCase(GetAllTimetrackingApi.pending, (state) => {
      state.allTimeTrackerLoader = true;
    });
    builder.addCase(GetAllTimetrackingApi.fulfilled, (state, action) => {
      state.allTimeTrackerLoader = false;
      state.allTimeTrackerData = action.payload;
    });
    builder.addCase(GetAllTimetrackingApi.rejected, (state) => {
      state.allTimeTrackerLoader = false;
      state.isAllError = true;
    });
  },
});

export default GetTimeTrackingSlice.reducer;
