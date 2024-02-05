import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ChatState<T> {
  newChats: {
    [key: string]: T[];
  };
  oldChats: {
    [key: string]: T[];
  };
}
// <blockquote class="twitter-tweet" data-media-max-w_idth="560"><p lang="hi" dir="ltr">Karmanye vadhikaraste Ma Phaleshu Kadachana,<br>Ma Karmaphalaheturbhurma Te Sangostvakarmani <a href="https://t.co/JsUrfaDaqt">https://t.co/JsUrfaDaqt</a> <a href="https://t.co/TPLw5dBxxk">pic.twitter.com/TPLw5dBxxk</a></p>&mdash; aloo paratha (@alooooparatha1) <a href="https://twitter.com/alooooparatha1/status/1747569344349888786?ref_src=twsrc%5Etfw">January 17, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
export type message = {
  _id: string;
  sender: {
    username: string;
    _id: string;
  };
  message: string;
  createdAt: string;
};

const initialState: ChatState<message> = {
  newChats: {},
  oldChats: {},
};

type messageArray = {
  message: message[];
  chatId: string;
};

type singleMessage = {
  message: message;
  chatId: string;
};

const personalChatSlice = createSlice({
  name: "userChat",
  initialState,
  reducers: {
    addNewChat: (state, { payload }: PayloadAction<singleMessage>) => {
      if (payload.chatId in state.newChats) {
        state.newChats[payload.chatId].push(payload.message);
      } else {
        state.newChats[payload.chatId] = [payload.message];
      }
    },
    addOldChats: (state, { payload }: PayloadAction<messageArray>) => {
      if (payload.message.length === 0) {
        return;
      }

      if (!(payload.chatId in state.oldChats)) {
        state.oldChats[payload.chatId] = [];
      }

      state.oldChats[payload.chatId] = [];

      for (let index = payload.message.length - 1; index >= 0; index--) {
        state.oldChats[payload.chatId].push(payload.message[index]);
      }
    },
  },
});

export const { addNewChat, addOldChats } = personalChatSlice.actions;
export default personalChatSlice.reducer;
