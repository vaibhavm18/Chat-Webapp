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
      if (payload._id in state.newChats) {
        state.newChats[payload._id].push(payload);
      } else {
        state.newChats[payload._id] = [payload];
      }
    },
    addOldChats: (state, { payload }: PayloadAction<message[]>) => {
      if (payload.length === 0) {
        return;
      }

      if (!(payload[0]._id in state.newChats)) {
        state.newChats[payload[0]._id] = [];
      }

      payload.forEach((val) => {
        state.newChats[payload[0]._id].push(val);
      });
    },
  },
});

export const { addNewChat, addOldChats } = groupChatSlice.actions;
export default groupChatSlice.reducer;
