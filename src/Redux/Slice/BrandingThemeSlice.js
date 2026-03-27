import { createSlice } from '@reduxjs/toolkit'
import { GetBrandingThemeApi } from '../API/BrandingThemeApi';

const BrandingThemeSlice = createSlice({
  name: 'BrandingTheme',
  initialState: {
    GetBrandingThemeLoading: false,
    isError: false,
    BrandingThemeData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(GetBrandingThemeApi.pending, (state, action) => {
      state.GetBrandingThemeLoading = true;
    });
    builder.addCase(GetBrandingThemeApi.fulfilled, (state, action) => {
      state.GetBrandingThemeLoading = false;
      state.BrandingThemeData = action.payload;
    });
    builder.addCase(GetBrandingThemeApi.rejected, (state, action) => {
      state.GetBrandingThemeLoading = false;
      state.isError = true;
    });
  },
});


export default BrandingThemeSlice.reducer;
