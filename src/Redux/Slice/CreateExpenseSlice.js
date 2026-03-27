import { createSlice } from '@reduxjs/toolkit';
import { CreateExpenseApi } from '../API/CreateExpenseApi';

const CreateExpenseSlice = createSlice({
  name: 'CreateExpense',
  initialState: {
    ExpenseLoading: false,
    isError: false,
    ExpenseData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(CreateExpenseApi.pending, (state, action) => {
      state.ExpenseLoading = true;
    });
    builder.addCase(CreateExpenseApi.fulfilled, (state, action) => {
      state.ExpenseLoading = false;
      state.ExpenseData = action.payload;
    });
    builder.addCase(CreateExpenseApi.rejected, (state, action) => {
      state.ExpenseLoading = false;
      state.isError = true;
    });
  },
});


export default CreateExpenseSlice.reducer;
