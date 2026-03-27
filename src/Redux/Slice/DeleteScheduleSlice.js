import { createSlice } from '@reduxjs/toolkit';
import { DeleteScheduleApi } from '../API/DeleteScheduleApi';

const DeleteScheduleSlice = createSlice({
  name: 'DeleteSchedule',
  initialState: {
    DeleteScheduleLoading: false,
    isError: false,
    DeleteScheduleData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(DeleteScheduleApi.pending, (state, action) => {
      state.DeleteScheduleLoading = true;
    });
    builder.addCase(DeleteScheduleApi.fulfilled, (state, action) => {
      state.DeleteScheduleLoading = false;
      state.DeleteScheduleData = action.payload;
    });
    builder.addCase(DeleteScheduleApi.rejected, (state, action) => {
      state.DeleteScheduleLoading = false;
      state.isError = true;
    });
  },
});


export default DeleteScheduleSlice.reducer;
