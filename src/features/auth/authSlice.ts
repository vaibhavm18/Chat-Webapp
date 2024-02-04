import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  username: string | null;
  token: string | null;
  isLogin: boolean;
  _id: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  token: null,
  username: null,
  _id: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (
      state,
      { payload }: PayloadAction<Omit<AuthState, "isLogin">>
    ) => {
      state.isLogin = true;
      state.token = payload.token;
      state.username = payload.username;
      state._id = payload._id;
      if (state.token) {
        localStorage.setItem("token", state.token);
      }
    },

    removeCredential: (state) => {
      state.isLogin = false;
      state.token = null;
      state.username = null;
      state._id = null;
      localStorage.removeItem("token");
    },
  },
});

export const profile = (state: { auth: AuthState }) => state.auth;
export const isAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isLogin;
export const getToken = (state: { auth: AuthState }) => state.auth.token;

export const { setCredential, removeCredential } = authSlice.actions;
export default authSlice.reducer;
