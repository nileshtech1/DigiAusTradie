import { createSlice } from '@reduxjs/toolkit'
import { GetItemsApi } from '../API/GetItemsApi';

const GetItemsSlice = createSlice({
  name: 'ItemsJob',
  initialState: {
    GetItemsLoading: false,
    isError: false,
    ItemsList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetItemsApi.pending, (state, action) => {
      state.GetItemsLoading = true;
    });
    builder.addCase(GetItemsApi.fulfilled, (state, action) => {
      state.GetItemsLoading = false;
      state.ItemsList = action.payload;
    });
    builder.addCase(GetItemsApi.rejected, (state, action) => {
      state.GetItemsLoading = false;
      state.isError = true;
    });
  },
});


export default GetItemsSlice.reducer;
