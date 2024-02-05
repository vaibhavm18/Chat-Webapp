import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatState } from "../user/chatSlice";

export interface GroupMessage {
  _id: string;
  groupId: string;
  message: string;
  sender: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

const initialState: ChatState<GroupMessage> = {
  newChats: {},
  oldChats: {},
};

const groupChatSlice = createSlice({
  name: "groupChats",
  initialState,
  reducers: {
    addNewChat: (state, { payload }: PayloadAction<GroupMessage>) => {
      if (payload.groupId in state.newChats) {
        state.newChats[payload.groupId].push(payload);
      } else {
        state.newChats[payload.groupId] = [payload];
      }
    },
    addOldChats: (state, { payload }: PayloadAction<GroupMessage[]>) => {
      if (payload.length === 0) {
        return;
      }

      if (!(payload[0].groupId in state.newChats)) {
        state.newChats[payload[0].groupId] = [];
      }

      payload.forEach((val) => {
        state.newChats[payload[0].groupId].push(val);
      });
    },
  },
});

export const { addNewChat, addOldChats } = groupChatSlice.actions;
export default groupChatSlice.reducer;
