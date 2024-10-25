import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./JoblistingSlice.js";

const store = configureStore({
  reducer: {
    job: jobReducer,
  },
});
export default store;
