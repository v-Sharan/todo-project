import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    userPhoto: { type: String, required: true },
    password: { type: String, required: true, minLength: 6 },
    todos: [{ type: mongoose.Types.ObjectId, required: true, ref: "Todo" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);