import { createSlice } from '@reduxjs/toolkit';
import { DeleteAccountApi } from '../API/DeleteAccountApi';

const DeleteAccountSlice = createSlice({
  name: 'DeleteAccount',
  initialState: {
    DeleteAccountLoading: false,
    isError: false,
    DeleteAccountData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(DeleteAccountApi.pending, (state, action) => {
      state.DeleteAccountLoading = true;
    });
    builder.addCase(DeleteAccountApi.fulfilled, (state, action) => {
      state.DeleteAccountLoading = false;
      state.DeleteAccountData = action.payload;
    });
    builder.addCase(DeleteAccountApi.rejected, (state, action) => {
      state.DeleteAccountLoading = false;
      state.isError = true;
    });
  },
});


export default DeleteAccountSlice.reducer;
