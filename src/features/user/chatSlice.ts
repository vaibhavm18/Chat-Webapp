import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface ChatState {
  newChats: {
    [key: string]: message[];
  };
  oldChats: {
    [key: string]: message[];
  };
}
// <blockquote class="twitter-tweet" data-media-max-width="560"><p lang="hi" dir="ltr">Karmanye vadhikaraste Ma Phaleshu Kadachana,<br>Ma Karmaphalaheturbhurma Te Sangostvakarmani <a href="https://t.co/JsUrfaDaqt">https://t.co/JsUrfaDaqt</a> <a href="https://t.co/TPLw5dBxxk">pic.twitter.com/TPLw5dBxxk</a></p>&mdash; aloo paratha (@alooooparatha1) <a href="https://twitter.com/alooooparatha1/status/1747569344349888786?ref_src=twsrc%5Etfw">January 17, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
export type message = {
  messageId: string;
  id: string;
  user: {
    username: string;
    id: string;
  };
  chatMessage: string;
  date: string;
};

const initialState: ChatState = {
  newChats: {},
  oldChats: {},
};

const personalChatSlice = createSlice({
  name: 'userChat',
  initialState,
  reducers: {
    addNewChat: (state, {payload}: PayloadAction<message>) => {
      if (payload.id in state.newChats) {
        state.newChats[payload.id].push(payload);
      } else {
        state.newChats[payload.id] = [payload];
      }
    },
    addOldChats: (state, {payload}: PayloadAction<message[]>) => {
      if (payload.length === 0) {
        return;
      }

      if (!(payload[0].id in state.newChats)) {
        state.newChats[payload[0].id] = [];
      }
      payload.forEach(val => {
        state.newChats[payload[0].id].push(val);
      });
    },
  },
});

export const {addNewChat, addOldChats} = personalChatSlice.actions;
export default personalChatSlice.reducer;
