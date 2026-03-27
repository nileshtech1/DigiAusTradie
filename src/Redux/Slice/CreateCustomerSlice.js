import { createSlice } from '@reduxjs/toolkit';
import { CreateCustomerApi } from '../API/CreateCustomerApi';

const CreateCustomerSlice = createSlice({
  name: 'CreateCustomer',
  initialState: {
    CreateCustomerLoading: false,
    isError: false,
    CustomerData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(CreateCustomerApi.pending, (state, action) => {
      state.CreateCustomerLoading = true;
    });
    builder.addCase(CreateCustomerApi.fulfilled, (state, action) => {
      state.CreateCustomerLoading = false;
      state.CustomerData = action.payload;
    });
    builder.addCase(CreateCustomerApi.rejected, (state, action) => {
      state.CreateCustomerLoading = false;
      state.isError = true;
    });
  },
});


export default CreateCustomerSlice.reducer;
