import { createSlice } from '@reduxjs/toolkit';
import { GetDocumentListApi } from '../API/GetDocumentListApi';

const GetDocumentListSlice = createSlice({
  name: 'DocumentList',
  initialState: {
    GetDocumentListLoading: false,
    isError: false,
    DocumentList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetDocumentListApi.pending, (state, action) => {
      state.GetDocumentListLoading = true;
    });
    builder.addCase(GetDocumentListApi.fulfilled, (state, action) => {
      state.GetDocumentListLoading = false;
      state.DocumentList = action.payload;
    });
    builder.addCase(GetDocumentListApi.rejected, (state, action) => {
      state.GetDocumentListLoading = false;
      state.isError = true;
    });
  },
});


export default GetDocumentListSlice.reducer;
