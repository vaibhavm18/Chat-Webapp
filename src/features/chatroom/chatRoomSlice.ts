import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ChatRoomState = {
  typeOfChat: "Group" | "Personal" | null;
  id: string | null;
  name: string | null;
};

const initialState: ChatRoomState = {
  id: null,
  name: null,
  typeOfChat: null,
};

const chatRoomSlice = createSlice({
  name: "chatroom",
  initialState,
  reducers: {
    setChatRoom: (state, { payload }: PayloadAction<ChatRoomState>) => {
      state.id = payload.id;
      state.typeOfChat = payload.typeOfChat;
      state.name = payload.name;
    },
    removeChatRoom: (state) => {
      console.log("Hello God!");
      state.id = null;
      state.name = null;
      state.typeOfChat = null;
    },
  },
});

export const { setChatRoom, removeChatRoom } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
