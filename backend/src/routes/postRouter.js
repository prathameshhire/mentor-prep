import { deletePost, getAllPosts, updatePost, createPost } from "../controllers/postController.js";
import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { body } from "express-validator";

const router = Router();

router.get("/", validateToken, getAllPosts);
router.post("/", [
    body('title', 'title should not be empty').exists().isLength({ min: 3 }),
    body('content', 'content should not be empty').exists().isLength({ min: 3 }),
    body('tags', 'enter a valid author').isArray({}),
], validateToken, createPost);
router.put("/:id", validateToken, updatePost);
router.delete("/:id", validateToken, deletePost);

export default router;
