import { createSlice } from '@reduxjs/toolkit';
import { UpdateScheduleApi } from '../API/UpdateScheduleApi';

const UpdateScheduleSlice = createSlice({
  name: 'UpdateSchedule',
  initialState: {
    UpdateScheduleLoading: false,
    isError: false,
    UpdateScheduleData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(UpdateScheduleApi.pending, (state, action) => {
      state.UpdateScheduleLoading = true;
    });
    builder.addCase(UpdateScheduleApi.fulfilled, (state, action) => {
      state.UpdateScheduleLoading = false;
      state.UpdateScheduleData = action.payload;
    });
    builder.addCase(UpdateScheduleApi.rejected, (state, action) => {
      state.UpdateScheduleLoading = false;
      state.isError = true;
    });
  },
});


export default UpdateScheduleSlice.reducer;
