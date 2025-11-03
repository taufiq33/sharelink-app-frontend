import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducer";

const appStore = configureStore({
  reducer: rootReducers,
});

export const getAccessToken = () => appStore.getState().auth.accessToken;

export default appStore;
