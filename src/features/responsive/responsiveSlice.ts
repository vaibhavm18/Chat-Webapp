import { createSlice } from "@reduxjs/toolkit";

interface ResponsiveState {
  chatOpen: boolean;
}

const initialState: ResponsiveState = {
  chatOpen: false,
};

const responsiveSlice = createSlice({
  name: "responsive",
  initialState,
  reducers: {
    chatOpen: (state) => {
      state.chatOpen = true;
    },
    closeChat: (state) => {
      state.chatOpen = false;
    },
  },
});

export const { closeChat, chatOpen } = responsiveSlice.actions;
export default responsiveSlice.reducer;
