import { createSlice } from '@reduxjs/toolkit';
import { EditCustomerApi } from '../API/EditCustomerApi';

const EditCustomerSlice = createSlice({
  name: 'EditCustomer',
  initialState: {
    EditCustomerLoading: false,
    isError: false,
    EditCustomerData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(EditCustomerApi.pending, (state, action) => {
      state.EditCustomerLoading = true;
    });
    builder.addCase(EditCustomerApi.fulfilled, (state, action) => {
      state.EditCustomerLoading = false;
      state.EditCustomerData = action.payload;
    });
    builder.addCase(EditCustomerApi.rejected, (state, action) => {
      state.EditCustomerLoading = false;
      state.isError = true;
    });
  },
});


export default EditCustomerSlice.reducer;
