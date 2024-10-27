import { getAllMentees, getOneMentee, updateMentee } from "../controllers/menteeController.js";
import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";

const router = Router();

router.get('/', validateToken, getAllMentees);
router.get('/:id', validateToken, getOneMentee);
router.put("/:id", validateToken, updateMentee);

export default router;
