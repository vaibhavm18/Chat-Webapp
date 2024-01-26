import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface UserState {
  users: user[];
}

type user = {
  _id: string;
  username: string;
  friends: number;
  groups: number;
};

const initialState: UserState = {
  users: [],
};

type remove = {
  _id: string;
};

export const userListSlice = createSlice({
  name: 'userslist',
  initialState,
  reducers: {
    addListUsers: (state, {payload}: PayloadAction<user[]>) => {
      if (payload.length === 0) {
        return;
      }
      payload.forEach(val => {
        state.users.push(val);
      });
    },
    removeListUser: (state, {payload}: PayloadAction<remove>) => {
      state.users = state.users.filter(val => val._id !== payload._id);
    },
    removeAllListUsers: state => {
      state.users = [];
    },
  },
});

export const {addListUsers, removeListUser, removeAllListUsers} =
  userListSlice.actions;
export default userListSlice.reducer;
