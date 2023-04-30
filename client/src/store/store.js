import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import todoReducer from "./todoSlice";

export const store = configureStore({
  reducer: { auth: authReducer, userData: userReducer, userTodo: todoReducer },
});
