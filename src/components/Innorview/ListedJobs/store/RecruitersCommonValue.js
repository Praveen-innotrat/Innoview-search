import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  activeTab: "dashboard",
  statusOneId: "",
  statusTwoId: "",
  statusThreeId: "",
  statusFourId: "",
  statusFiveId: "",
  statusSixId: "",
  statusSevenId: "",
  statusEightId: "",
  statusNineId: "",
  jobCardViewId: "",
};

const recruiterSlice = createSlice({
  name: "recruiter",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setStatusOneId(state, action) {
      state.statusOneId = action.payload;
    },
    setStatusTwoId(state, action) {
      state.statusTwoId = action.payload;
    },
    setStatusThreeId(state, action) {
      state.statusThreeId = action.payload;
    },
    setStatusFourId(state, action) {
      state.statusFourId = action.payload;
    },
    setStatusFiveId(state, action) {
      state.statusFiveId = action.payload;
    },
    setStatusSixId(state, action) {
      state.statusSixId = action.payload;
    },
    setStatusSevenId(state, action) {
      state.statusSevenId = action.payload;
    },
    setStatusEightId(state, action) {
      state.statusEightId = action.payload;
    },
    setStatusNineId(state, action) {
      state.statusNineId = action.payload;
    },
    setJobCardViewId(state, action) {
      state.jobCardViewId = action.payload;
    },
  },
});

export const {
  setUserId,
  setActiveTab,
  setStatusOneId,
  setJobCardViewId,
  setStatusTwoId,
  setStatusThreeId,
  setStatusFourId,
  setStatusFiveId,
  setStatusSixId,
  setStatusSevenId,
  setStatusEightId,
  setStatusNineId,
} = recruiterSlice.actions;

export default recruiterSlice.reducer;
