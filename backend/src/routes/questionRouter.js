import { getAllQuestions, answerQuestion, createQuestion, getAllMenteeQuestions, markSolved } from "../controllers/questionController.js";
import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { body } from "express-validator";

const router = Router();

router.get("/", validateToken, getAllQuestions);
router.get("/me", validateToken, getAllMenteeQuestions);
router.post("/", validateToken, [
    body("question", "Enter a valid question").exists().isLength({ min: 3 }),
    body("desc", "Enter a valid question").exists().isLength({ min: 10 }),
], createQuestion);
router.put("/:id/answer", validateToken, answerQuestion);
router.put("/:id/done", validateToken, markSolved);

export default router;
