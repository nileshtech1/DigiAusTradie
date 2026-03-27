import { createSlice } from '@reduxjs/toolkit';
import { DeleteExpenseApi } from '../API/DeleteExpenseApi';

const DeleteExpenseSlice = createSlice({
  name: 'DeleteExpense',
  initialState: {
    DeleteExpenseLoading: false,
    isError: false,
    DeleteExpenseData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(DeleteExpenseApi.pending, (state, action) => {
      state.DeleteExpenseLoading = true;
    });
    builder.addCase(DeleteExpenseApi.fulfilled, (state, action) => {
      state.DeleteExpenseLoading = false;
      state.DeleteExpenseData = action.payload;
    });
    builder.addCase(DeleteExpenseApi.rejected, (state, action) => {
      state.DeleteExpenseLoading = false;
      state.isError = true;
    });
  },
});


export default DeleteExpenseSlice.reducer;
