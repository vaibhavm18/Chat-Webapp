import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatState, message } from "../user/chatSlice";

const initialState: ChatState = {
  newChats: {},
  oldChats: {},
};

const groupChatSlice = createSlice({
  name: "groupChats",
  initialState,
  reducers: {
    addNewChat: (state, { payload }: PayloadAction<message>) => {
      if (payload.messageId in state.newChats) {
        state.newChats[payload.messageId].push(payload);
      } else {
        state.newChats[payload.messageId] = [payload];
      }
    },
    addOldChats: (state, { payload }: PayloadAction<message[]>) => {
      if (payload.length === 0) {
        return;
      }

      if (!(payload[0].messageId in state.newChats)) {
        state.newChats[payload[0].messageId] = [];
      }

      payload.forEach((val) => {
        state.newChats[payload[0].messageId].push(val);
      });
    },
  },
});

export const { addNewChat, addOldChats } = groupChatSlice.actions;
export default groupChatSlice.reducer;
