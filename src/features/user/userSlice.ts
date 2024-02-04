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
      payload.forEach((val) => {
        state.users.push(val);
      });
    },
    removeUser: (state, { payload }: PayloadAction<remove>) => {
      state.users = state.users.filter((val) => val._id !== payload._id);
    },
    removeAllUsers: (state) => {
      state.users = [];
    },
  },
});

export const { addUsers, removeUser, removeAllUsers } = userSlice.actions;
export default userSlice.reducer;
