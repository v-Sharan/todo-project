import { Router } from "express";
import { check } from "express-validator";
import { createUser, loginUser } from "../controllers/user.js";

const router = Router();

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("photo").not().isEmpty(),
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  loginUser
);

export default router;
