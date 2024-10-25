import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listedJobs: [],
  defaultKey: "iot",
  selectedJobJD: {},
};

const jobListingSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setListedJob(state, action) {
      state.listedJobs = action.payload;
    },
    setSelectedJD(state, action) {
      state.selectedJobJD = action.payload;
    },
    setDefaultKey(state, action) {
      state.defaultKey = action.payload;
    },
  },
});

export const { setListedJob, setSelectedJD, setDefaultKey } =
  jobListingSlice.actions;

export default jobListingSlice.reducer;
