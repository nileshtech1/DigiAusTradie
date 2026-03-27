import { createSlice } from '@reduxjs/toolkit';
import { GetScheduleApi } from '../API/GetScheduleApi';

const GetScheduleSlice = createSlice({
  name: 'ScheduleList',
  initialState: {
    GetScheduleLoader: false,
    isError: false,
    ScheduleList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetScheduleApi.pending, (state, action) => {
      state.GetScheduleLoader = true;
    });
    builder.addCase(GetScheduleApi.fulfilled, (state, action) => {
      state.GetScheduleLoader = false;
      state.ScheduleList = action.payload;
    });
    builder.addCase(GetScheduleApi.rejected, (state, action) => {
      state.GetScheduleLoader = false;
      state.isError = true;
    });
  },
});


export default GetScheduleSlice.reducer;
