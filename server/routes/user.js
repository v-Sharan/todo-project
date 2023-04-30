import { Router } from "express";
import { check } from "express-validator";
import { createUser, loginUser, getUserByID } from "../controllers/user.js";

const router = Router();

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    check("userPhoto").not().isEmpty(),
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

router.get("/:userId", getUserByID);

export default router;
