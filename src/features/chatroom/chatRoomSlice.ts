import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ChatRoomState = {
  typeOfChat: "Group" | "Personal";
  id: string | null;
  name: string | null;
};

const initialState: ChatRoomState = {
  id: null,
  name: null,
  typeOfChat: "Personal",
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
      state.id = null;
      state.name = null;
      state.typeOfChat = "Group";
    },
  },
});

export const { setChatRoom, removeChatRoom } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
