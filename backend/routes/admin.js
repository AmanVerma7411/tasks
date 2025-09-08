
import express from "express";
import { getAllUsers, createQuiz, getQuizzes, deleteUser } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(protect, isAdmin); 
router.get("/users", getAllUsers);
router.post("/quizzes", createQuiz);
router.get("/quizzes", getQuizzes);
router.delete("/users/:id", deleteUser);

export default router;
