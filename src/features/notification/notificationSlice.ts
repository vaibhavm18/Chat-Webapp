import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface NotificationState {
  notifications: notification[];
}

type notification = {
  _id: string;
  username: string;
};

const initialState: NotificationState = {
  notifications: [],
};

type userId = { id: string };

type input = {
  senderId: notification;
  _id: string;
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotifications: (state, { payload }: PayloadAction<input[]>) => {
      if (payload.length === 0) {
        return;
      }

      state.notifications = [];

      payload.forEach((val) => {
        state.notifications.push({
          _id: val._id,
          username: val.senderId.username,
        });
      });
    },

    addNotification: (state, { payload }: PayloadAction<input>) => {
      state.notifications.push({
        _id: payload._id,
        username: payload.senderId.username,
      });
    },

    removeNotification: (state, { payload }: PayloadAction<userId>) => {
      state.notifications = state.notifications.filter(
        (val) => val._id !== payload.id
      );
    },
  },
});

export const { addNotifications, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
