import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { HttpError } from "../utils/HttpError.js";
import { User } from "../mongodb/schema/user.js";
import { Todo } from "../mongodb/schema/todo.js";

export const getTodoByUserId = async (req, res, next) => {
  const { userId } = req.params;

  let user;
  try {
    user = await User.findById(userId).populate("todos");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not find a User",
      500
    );
    return next(error);
  }

  if (!user || !user.todos.length === 0) {
    const error = new HttpError(
      "Could not find a User for the provided id.",
      404
    );
    return next(error);
  }

  const completed = user.todos.filter((todo) => todo.completed === true);
  const todo = user.todos.filter((todo) => todo.completed === false);

  res.json({ Todo: todo, completed_todo: completed });
};

export const createTodo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { userId } = req.params;

  const { title } = req.body;

  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Creating Todo failed, try again later.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Couldn't find user for provided id", 404);
    return next(error);
  }

  const createdTodo = new Todo({
    title,
    creator: userId,
    completed: false,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTodo.save({ session: sess });
    user.todos.push(createdTodo);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating Todo failed, Please try again.", 500);
    return next(error);
  }

  res.status(201).json({ Todo: createdTodo,message:"Todo Added" });
};

export const deleteTodo = async (req, res, next) => {
  const { todoId } = req.params;

  let todo;
  try {
    todo = await Todo.findById(todoId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not delete a todo",
      500
    );
    return next(error);
  }

  if (!todo) {
    const error = new HttpError("Could not find todo for this id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await todo.deleteOne({ session: sess });
    todo.creator.todos.pull(todo);
    await todo.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not delete a Todo",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted Todo." });
};

export const completed = async (req, res, next) => {
  const { todoId } = req.params;

  let todo;
  try {
    todo = await Todo.findById(todoId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not delete a todo",
      500
    );
    return next(error);
  }

  if (!todo) {
    const error = new HttpError("Could not find todo for this id", 404);
    return next(error);
  }

  await todo.updateOne({ completed: true });

  res.json({ message: "updated as completed" });
};
