import { createSlice } from '@reduxjs/toolkit';
import { UpdateExpenseApi } from '../API/UpdateExpenseApi';

const UpdateExpenseSlice = createSlice({
  name: 'UpdateExpense',
  initialState: {
    UpdateExpenseLoading: false,
    isError: false,
    UpdateExpenseData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(UpdateExpenseApi.pending, (state, action) => {
      state.UpdateExpenseLoading = true;
    });
    builder.addCase(UpdateExpenseApi.fulfilled, (state, action) => {
      state.UpdateExpenseLoading = false;
      state.UpdateExpenseData = action.payload;
    });
    builder.addCase(UpdateExpenseApi.rejected, (state, action) => {
      state.UpdateExpenseLoading = false;
      state.isError = true;
    });
  },
});


export default UpdateExpenseSlice.reducer;
