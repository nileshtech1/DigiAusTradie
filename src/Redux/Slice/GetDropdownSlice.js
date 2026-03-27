import { createSlice } from '@reduxjs/toolkit';
import { 
  GetCommercialDropdownAPi, 
  GetResidentialDropdownAPi, 
  GetStoreFrontDropdownAPi, 
  GetSwmsDropdownAPi 
} from '../API/GetDropdownApi';

const GetDropdownSlice = createSlice({
  name: 'DropdownList',
  initialState: {
    // Loading states for each dropdown
    StoreFrontListLoading: false,
    CommercialListLoading: false,
    ResidentialListLoading: false,
    SwmsListLoading: false,

    // Error states for each dropdown
    StoreFrontListError: false,
    CommercialListError: false,
    ResidentialListError: false,
    SwmsListError: false,

    // Data for each dropdown
    StoreFrontDropdownData: [],
    CommercialDropdownData: [],
    ResidentialDropdownData: [],
    SwmsDropdownData: [],
  },
  extraReducers: (builder) => {
    // StoreFront Dropdown
    builder.addCase(GetStoreFrontDropdownAPi.pending, (state) => {
      state.StoreFrontListLoading = true;
    });
    builder.addCase(GetStoreFrontDropdownAPi.fulfilled, (state, action) => {
      state.StoreFrontListLoading = false;
      state.StoreFrontDropdownData = action.payload;
    });
    builder.addCase(GetStoreFrontDropdownAPi.rejected, (state) => {
      state.StoreFrontListLoading = false;
      state.StoreFrontListError = true;
    });

    // Commercial Dropdown
    builder.addCase(GetCommercialDropdownAPi.pending, (state) => {
      state.CommercialListLoading = true;
    });
    builder.addCase(GetCommercialDropdownAPi.fulfilled, (state, action) => {
      state.CommercialListLoading = false;
      state.CommercialDropdownData = action.payload;
    });
    builder.addCase(GetCommercialDropdownAPi.rejected, (state) => {
      state.CommercialListLoading = false;
      state.CommercialListError = true;
    });

    // Residential Dropdown
    builder.addCase(GetResidentialDropdownAPi.pending, (state) => {
      state.ResidentialListLoading = true;
    });
    builder.addCase(GetResidentialDropdownAPi.fulfilled, (state, action) => {
      state.ResidentialListLoading = false;
      state.ResidentialDropdownData = action.payload;
    });
    builder.addCase(GetResidentialDropdownAPi.rejected, (state) => {
      state.ResidentialListLoading = false;
      state.ResidentialListError = true;
    });

    // Swms Dropdown
    builder.addCase(GetSwmsDropdownAPi.pending, (state) => {
      state.SwmsListLoading = true;
    });
    builder.addCase(GetSwmsDropdownAPi.fulfilled, (state, action) => {
      state.SwmsListLoading = false;
      state.SwmsDropdownData = action.payload;
    });
    builder.addCase(GetSwmsDropdownAPi.rejected, (state) => {
      state.SwmsListLoading = false;
      state.SwmsListError = true;
    });
  },
});

export default GetDropdownSlice.reducer;
