import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  userId: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: (state, action) => {
      state.isLogin = true;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("token", state.token);
    },
    LogOut: (state) => {
      state.isLogin = false;
      state.userId = null;
      state.token = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    },
  },
});

export const { Login, LogOut } = authSlice.actions;

export default authSlice.reducer;
