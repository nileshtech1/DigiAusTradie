import { createSlice } from '@reduxjs/toolkit';
import { CreateInvoiceSentandEmailAPi } from '../API/InvoiceSent&EmailApi';

const InvoiceSentAndEmailSlice = createSlice({
  name: 'InvoiceSent&Email',
  initialState: {
    InvoiceSentAndEmailLoading: false,
    isError: false,
    EmailSentAndEmailData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(CreateInvoiceSentandEmailAPi.pending, (state, action) => {
      state.InvoiceSentAndEmailLoading = true;
    });
    builder.addCase(CreateInvoiceSentandEmailAPi.fulfilled, (state, action) => {
      state.InvoiceSentAndEmailLoading = false;
      state.EmailSentAndEmailData = action.payload;
    });
    builder.addCase(CreateInvoiceSentandEmailAPi.rejected, (state, action) => {
      state.InvoiceSentAndEmailLoading = false;
      state.isError = true;
    });
  },
});


export default InvoiceSentAndEmailSlice.reducer;
