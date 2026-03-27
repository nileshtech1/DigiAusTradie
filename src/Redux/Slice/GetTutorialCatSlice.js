import { createSlice } from '@reduxjs/toolkit';
import { GetTutorialCatApi } from '../API/GetTutorialCatApi';

const TutorialCatSlice = createSlice({
  name: 'TutorialCatList',
  initialState: {
    GetTutorialsCatLoader: false,
    isError: false,
    TutorialCatData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetTutorialCatApi.pending, (state, action) => {
      state.GetTutorialsCatLoader = true;
    });
    builder.addCase(GetTutorialCatApi.fulfilled, (state, action) => {
      state.GetTutorialsCatLoader = false;
      state.TutorialCatData = action.payload;
    });
    builder.addCase(GetTutorialCatApi.rejected, (state, action) => {
      state.GetTutorialsCatLoader = false;
      state.isError = true;
    });
  },
});


export default TutorialCatSlice.reducer;
