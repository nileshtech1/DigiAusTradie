import { createSlice } from '@reduxjs/toolkit';
import { GetExpenseListApi } from '../API/GetExpenseListApi';

const GetExpenseSlice = createSlice({
  name: 'ExpenseListSlice',
  initialState: {
    GetExpenseLoading: false,
    isError: false,
    ExpenseList: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetExpenseListApi.pending, (state, action) => {
      state.GetExpenseLoading = true;
    });
    builder.addCase(GetExpenseListApi.fulfilled, (state, action) => {
      state.GetExpenseLoading = false;
      state.ExpenseList = action.payload;
    });
    builder.addCase(GetExpenseListApi.rejected, (state, action) => {
      state.GetExpenseLoading = false;
      state.isError = true;
    });
  },
});


export default GetExpenseSlice.reducer;
