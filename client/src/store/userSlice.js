import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    UserData: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { UserData } = userSlice.actions;

export default userSlice.reducer;
