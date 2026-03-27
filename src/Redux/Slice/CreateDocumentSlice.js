import { createSlice } from '@reduxjs/toolkit';
import { CreateDocumentApi } from '../API/CreateDocumentApi';

const CreateDocumentSlice = createSlice({
  name: 'Document',
  initialState: {
    DocumentLoading: false,
    isError: false,
    DocumentData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(CreateDocumentApi.pending, (state, action) => {
      state.DocumentLoading = true;
    });
    builder.addCase(CreateDocumentApi.fulfilled, (state, action) => {
      state.DocumentLoading = false;
      state.DocumentData = action.payload;
    });
    builder.addCase(CreateDocumentApi.rejected, (state, action) => {
      state.DocumentLoading = false;
      state.isError = true;
    });
  },
});


export default CreateDocumentSlice.reducer;
