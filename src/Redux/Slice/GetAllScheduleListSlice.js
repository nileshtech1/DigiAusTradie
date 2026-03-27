import { createSlice } from '@reduxjs/toolkit';
import { GetAllScheduleApi } from '../API/GetAllScheduleListApi';

const GetAllScheduleSlice = createSlice({
  name: 'AllScheduleList',
  initialState: {
    GetAllScheduleLoader: false,
    isError: false,
    AllScheduleList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetAllScheduleApi.pending, (state, action) => {
      state.GetAllScheduleLoader = true;
    });
    builder.addCase(GetAllScheduleApi.fulfilled, (state, action) => {
      state.GetAllScheduleLoader = false;
      state.AllScheduleList = action.payload;
    });
    builder.addCase(GetAllScheduleApi.rejected, (state, action) => {
      state.GetAllScheduleLoader = false;
      state.isError = true;
    });
  },
});


export default GetAllScheduleSlice.reducer;
