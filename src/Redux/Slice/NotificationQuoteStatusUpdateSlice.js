import { createSlice } from '@reduxjs/toolkit';
import { NotificationQuoteStatusUpdateApi } from '../API/NotificationQuoteStatusUpdateApi';

const NotificationQuoteStatusUpdateSlice = createSlice({
  name: 'Notification',
  initialState: {
    loading: false,
    isError: false,
    NotificationQuoteStatusUpdateData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(NotificationQuoteStatusUpdateApi.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(NotificationQuoteStatusUpdateApi.fulfilled, (state, action) => {
      state.loading = false;
      state.NotificationQuoteStatusUpdateData = action.payload;
    });
    builder.addCase(NotificationQuoteStatusUpdateApi.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});


export default NotificationQuoteStatusUpdateSlice.reducer;
