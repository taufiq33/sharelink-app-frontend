import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  unreadCount: 0,
  lastFetchedAt: null,
};

export const notificationsSlice = createSlice({
  initialState,
  name: "notifications",
  reducers: {
    saveNotifications(state, action) {
      state.items = action.payload;
      state.lastFetchedAt = new Date().toISOString();
      state.unreadCount = state.items.filter(
        (item) => item.isRead === false
      ).length;
    },

    markAsRead(state, action) {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            isRead: true,
          };
        } else {
          return item;
        }
      });
      state.unreadCount--;
    },

    markAsReadAll(state) {
      state.items = state.items.map((item) => ({ ...item, isRead: true }));
      state.unreadCount = 0;
    },
  },
});

export const notificationsActions = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
