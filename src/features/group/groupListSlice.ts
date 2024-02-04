import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GroupState {
  groups: group[];
}

type group = {
  _id: string;
  name: string;
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

      if (state.groups.length !== 0) {
        return;
      }

      payload.forEach((val) => {
        state.groups.push(val);
      });
    },

    addGroupList: (state, { payload }: PayloadAction<group>) => {
      state.groups.push(payload);
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
