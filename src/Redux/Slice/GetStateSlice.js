import { createSlice } from '@reduxjs/toolkit'
import { GetStateApi } from '../API/GetStateApi';

const GetStateSlice = createSlice({
  name: 'StateList',
  initialState: {
    GetStateLoading: false,
    isError: false,
    StateListData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetStateApi.pending, (state, action) => {
      state.GetStateLoading = true;
    });
    builder.addCase(GetStateApi.fulfilled, (state, action) => {
      state.GetStateLoading = false;
      state.StateListData = action.payload;
    });
    builder.addCase(GetStateApi.rejected, (state, action) => {
      state.GetStateLoading = false;
      state.isError = true;
    });
  },
});


export default GetStateSlice.reducer;
