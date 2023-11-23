import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type authState = {
  username: string | null;
  id: string | null;
};

const initialState: authState = {
  username: null,
  id: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addCredential: (state: authState, action: PayloadAction<authState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },

    removeCredential: (state: authState) => {
      state.username = null;
      state.id = null;
    },
  },
});

export const { addCredential } = authSlice.actions;

export const authReducer = authSlice.reducer;
