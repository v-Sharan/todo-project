import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Todo: null,
  completed_todo: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    todoStore: (state, action) => {
      state.Todo = action.payload.Todo;
      state.completed_todo = action.payload.completed_todo;
    },
  },
});

export const { todoStore } = todoSlice.actions;

export default todoSlice.reducer;
