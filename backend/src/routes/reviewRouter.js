import express from "express";
import validateToken from "../middlewares/validateToken.js"; // Assuming you have a validateToken middleware
import { body } from "express-validator";
import { deleteReviewByMentee, getPaginatedReviewsByMentor, createReview } from "../controllers/reviewControllers.js";

const router = express.Router();

// ROUTE: Get all reviews of a mentor: GET '/reviews/mentor/:mentorId"
router.get("/:mentorId", validateToken, getPaginatedReviewsByMentor);
router.post("/", [
    body('title', 'title should not be empty').exists().isLength({ min: 3 }),
    body('desc', 'desc should not be empty').exists().isLength({ min: 3 }),
    body('rating', 'enter a valid rating').isNumeric().isIn([1, 2, 3, 4, 5]),
    body('mentor_id', 'enter a valid mentor').exists().isMongoId(),
], validateToken, createReview);
router.delete("/:reviewId", validateToken, deleteReviewByMentee);

export default router;
