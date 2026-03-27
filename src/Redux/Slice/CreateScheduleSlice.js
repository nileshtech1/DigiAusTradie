import { createSlice } from '@reduxjs/toolkit';
import { CreateScheduleApi } from '../API/CreateScheduleApi';

const CreateScheduleSlice = createSlice({
  name: 'CreateSchedule',
  initialState: {
    createScheduleLoading: false,
    isError: false,
    CreateScheduleData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(CreateScheduleApi.pending, (state, action) => {
      state.createScheduleLoading = true;
    });
    builder.addCase(CreateScheduleApi.fulfilled, (state, action) => {
      state.createScheduleLoading = false;
      state.CreateScheduleData = action.payload;
    });
    builder.addCase(CreateScheduleApi.rejected, (state, action) => {
      state.createScheduleLoading = false;
      state.isError = true;
    });
  },
});


export default CreateScheduleSlice.reducer;
