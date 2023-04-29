import { Router } from "express";
import { check } from "express-validator";

import {
  createTodo,
  deleteTodo,
  getTodoByUserId,
  completed,
} from "../controllers/todo.js";
import { checkToken } from "../middleware/CheckJwtToken.js";

const router = Router();

router.use(checkToken);

router.get("/:userId", getTodoByUserId);

router.post("/:userId", [check("title").not().isEmpty()], createTodo);

router.patch("/:todoId", completed);

router.delete("/:todoId", deleteTodo);

export default router;
