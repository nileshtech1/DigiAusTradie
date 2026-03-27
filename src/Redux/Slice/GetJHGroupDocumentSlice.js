import { createSlice } from '@reduxjs/toolkit';
import { GetFranchiseDocumentApi, GetRiskAssesmentDocumentApi } from '../API/GetJHGroupDocumentApi';

const GetJHGroupSlice = createSlice({
  name: 'JHGroupDoc',
  initialState: {
    GetFranchiseLoading: false,
    FranchiseError: false,
    FranchiseDoc: [],
    
    GetRiskAssessmentLoading: false,
    RiskAssessmentError: false,
    RiskAssessmentDoc: [],
  },

  extraReducers: (builder) => {
    builder
      // Franchise Document Cases
      .addCase(GetFranchiseDocumentApi.pending, (state) => {
        state.GetFranchiseLoading = true;
        state.FranchiseError = false;
      })
      .addCase(GetFranchiseDocumentApi.fulfilled, (state, action) => {
        state.GetFranchiseLoading = false;
        state.FranchiseDoc = action.payload;
      })
      .addCase(GetFranchiseDocumentApi.rejected, (state) => {
        state.GetFranchiseLoading = false;
        state.FranchiseError = true;
      })

      // Risk Assessment Document Cases
      .addCase(GetRiskAssesmentDocumentApi.pending, (state) => {
        state.GetRiskAssessmentLoading = true;
        state.RiskAssessmentError = false;
      })
      .addCase(GetRiskAssesmentDocumentApi.fulfilled, (state, action) => {
        state.GetRiskAssessmentLoading = false;
        state.RiskAssessmentDoc = action.payload;
      })
      .addCase(GetRiskAssesmentDocumentApi.rejected, (state) => {
        state.GetRiskAssessmentLoading = false;
        state.RiskAssessmentError = true;
      });
  },
});

export default GetJHGroupSlice.reducer;
