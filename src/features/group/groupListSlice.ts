import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface GroupState {
  grops: group[];
}

type group = {
  id: string;
  groupname: string;
  admin: string;
  users: number;
};

const initialState: GroupState = {
  grops: [],
};

export const groupListSlice = createSlice({
  name: 'groupList',
  initialState,
  reducers: {
    addGroupLists: (state, {payload}: PayloadAction<group[]>) => {
      if (payload.length === 0) {
        return;
      }
      console.log('hi');
      payload.forEach(val => {
        state.grops.push(val);
      });
    },
    removeGroupList: (state, {payload}: PayloadAction<group>) => {
      state.grops = state.grops.filter(val => val.id !== payload.id);
    },
    removeAllGroupList: state => {
      state.grops = [];
    },
  },
});

export const {addGroupLists, removeGroupList, removeAllGroupList} =
  groupListSlice.actions;
export default groupListSlice.reducer;
