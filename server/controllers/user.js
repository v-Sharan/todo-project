import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import { User } from "../mongodb/schema/user.js";
import { HttpError } from "../utils/HttpError.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, photo, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User exist already, please login.", 422);
    return next(error);
  }
  // const photoUrl = await cloudinary.uploader.upload(photo);
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);

  const createdUser = new User({
    name,
    email,
    userPhoto: photo,
    password: hashPassword,
    todos: [],
  });

  const token = jwt.sign(
    {
      email,
      password,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing in faild, try again later", 201);
    return next(error);
  }
  res.json({ user: createdUser.toObject(), token: token });
};

export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { email, password } = req.body;

  const token = jwt.sign(
    {
      email,
      password,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  const comparyPassword = bcrypt.compareSync(password, existingUser.password);
  console.log(comparyPassword);

  if (!existingUser || comparyPassword) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong.",
        401
      )
    );
  }

  res.json({ user: existingUser, token: token });
};
