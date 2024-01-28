import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GroupState {
  groups: group[];
}

type group = {
  _id: string;
  groupname: string;
  admin: string;
  users: number;
};

const initialState: GroupState = {
  groups: [],
};

type userId = {
  _id: string;
};

export const groupListSlice = createSlice({
  name: "groupList",
  initialState,
  reducers: {
    addGroupLists: (state, { payload }: PayloadAction<group[]>) => {
      if (payload.length === 0) {
        return;
      }
      payload.forEach((val) => {
        state.groups.push(val);
      });
    },
    removeGroupList: (state, { payload }: PayloadAction<userId>) => {
      state.groups = state.groups.filter((val) => val._id !== payload._id);
    },
    removeAllGroupList: (state) => {
      state.groups = [];
    },
  },
});

export const { addGroupLists, removeGroupList, removeAllGroupList } =
  groupListSlice.actions;
export default groupListSlice.reducer;
