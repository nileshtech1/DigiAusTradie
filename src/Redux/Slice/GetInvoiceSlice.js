import { createSlice } from '@reduxjs/toolkit';
import { GetInvoicePdfUrl, GetInvoiceUrl } from '../API/GetInvoiceApi';

const GetInvoiceSlice = createSlice({
  name: 'GetInvoiceList',
  initialState: {
    GetInvoiceLoader: false,
    isError: false,
    errorMessage: '',
    InvoiceList: [],
    GetInvoicePdfLoader: false, // Loader for GetInvoicePdfUrl
    isPdfError: false,          // Error flag for GetInvoicePdfUrl
    pdfErrorMessage: '',         // Error message for GetInvoicePdfUrl
    PdfInvoiceList:[],
  },

  extraReducers: (builder) => {
    builder.addCase(GetInvoiceUrl.pending, (state) => {
      state.GetInvoiceLoader = true;
      state.isError = false;
      state.errorMessage = '';
    });

    builder.addCase(GetInvoiceUrl.fulfilled, (state, action) => {
      state.GetInvoiceLoader = false;
      state.InvoiceList = action.payload;
    });

    builder.addCase(GetInvoiceUrl.rejected, (state, action) => {
      state.GetInvoiceLoader = false;
      state.isError = true;
      state.errorMessage = action.payload || 'Failed to fetch invoices';
    });


    builder.addCase(GetInvoicePdfUrl.pending, (state) => {
      state.GetInvoicePdfLoader = true;
      state.isPdfError = false;
      state.pdfErrorMessage = '';
    });

    builder.addCase(GetInvoicePdfUrl.fulfilled, (state, action) => {
      state.GetInvoicePdfLoader = false;
      state.PdfInvoiceList = action.payload;
    });

    builder.addCase(GetInvoicePdfUrl.rejected, (state, action) => {
      state.GetInvoicePdfLoader = false;
      state.isPdfError = true;
      state.pdfErrorMessage = action.payload || 'Failed to fetch invoices pdf';
    });
  },
});

export default GetInvoiceSlice.reducer;