import { configureStore } from "@reduxjs/toolkit";
import recruiterReducer from "./RecruitersCommonValue";

const store = configureStore({
  reducer: {
    recruiter: recruiterReducer,
  },
});
export default store;
