import { createSlice } from '@reduxjs/toolkit';
import { GetTutorialApi } from '../API/GetTutorialApi';

const TutorialSlice = createSlice({
  name: 'TutorialList',
  initialState: {
    GetTutorialsLoader: false,
    isError: false,
    TutorialData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetTutorialApi.pending, (state, action) => {
      state.GetTutorialsLoader = true;
    });
    builder.addCase(GetTutorialApi.fulfilled, (state, action) => {
      state.GetTutorialsLoader = false;
      state.TutorialData = action.payload;
    });
    builder.addCase(GetTutorialApi.rejected, (state, action) => {
      state.GetTutorialsLoader = false;
      state.isError = true;
    });
  },
});


export default TutorialSlice.reducer;
