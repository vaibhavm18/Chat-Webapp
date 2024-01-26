import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface GroupState {
  groups: group[];
}

type group = {
  id: string;
  groupname: string;
};

const initialState: GroupState = {
  groups: [],
};

type userId = {
  id: string;
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    addGroup: (state, {payload}: PayloadAction<group[]>) => {
      if (payload.length === 0) {
        return;
      }
      payload.forEach(val => {
        state.groups.push(val);
      });
    },
    removeGroup: (state, {payload}: PayloadAction<userId>) => {
      state.groups = state.groups.filter(val => val.id !== payload.id);
    },
    removeAllGroup: state => {
      state.groups = [];
    },
  },
});

export const {addGroup, removeGroup, removeAllGroup} = groupSlice.actions;
export default groupSlice.reducer;
