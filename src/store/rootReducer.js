import { combineReducers } from "@reduxjs/toolkit";
import { authReducers } from "@/features/auth/slices";
import { notificationsReducer } from "@/features/notification/slices";

const rootReducers = combineReducers({
  auth: authReducers,
  notifications: notificationsReducer,
});

export default rootReducers;
