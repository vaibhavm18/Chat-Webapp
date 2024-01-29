import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ChatRoomState = {
  typeOfChat: "Group" | "Personal";
  id: string | null;
};

const initialState: ChatRoomState = {
  id: null,
  typeOfChat: "Personal",
};

const chatRoomSlice = createSlice({
  name: "chatroom",
  initialState,
  reducers: {
    setChatRoom: (state, { payload }: PayloadAction<ChatRoomState>) => {
      state.id = payload.id;
      state.typeOfChat = payload.typeOfChat;
    },
  },
});

export const { setChatRoom } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
