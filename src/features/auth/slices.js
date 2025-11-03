import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  username: null,
  email: null,
  role: null,
  accessToken: null,
};

const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    saveLoginData(state, action) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
    },

    saveAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },

    clearLoginData(state) {
      state.userId = null;
      state.username = null;
      state.email = null;
      state.role = null;
      state.accessToken = null;
    },
  },
});

export const authReducers = authSlice.reducer;
export const authActions = authSlice.actions;
