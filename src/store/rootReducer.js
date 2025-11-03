import { combineReducers } from "@reduxjs/toolkit";
import { authReducers } from "@/features/auth/slices";

const rootReducers = combineReducers({
  auth: authReducers,
});

export default rootReducers;
