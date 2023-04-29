import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    completed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", TodoSchema);
