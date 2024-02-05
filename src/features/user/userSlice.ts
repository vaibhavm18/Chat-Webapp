import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  users: user[];
}

type user = {
  _id: string;
  username: string;
};

const initialState: UserState = {
  users: [],
};

type remove = {
  _id: string;
};

type input = {
  _id: string;
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, { payload }: PayloadAction<user[]>) => {
      if (payload.length === 0) {
        return;
      }

      state.users = [];

      payload.forEach((val) => {
        state.users.push(val);
      });
    },
    addUser: (state, { payload }: PayloadAction<user>) => {
      state.users.push(payload);
    },

    removeUser: (state, { payload }: PayloadAction<remove>) => {
      state.users = state.users.filter((val) => val._id !== payload._id);
    },
    removeAllUsers: (state) => {
      state.users = [];
    },
  },
});

export const { addUsers, addUser, removeUser, removeAllUsers } =
  userSlice.actions;
export default userSlice.reducer;
