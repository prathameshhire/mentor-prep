import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { getAllMentors, updateMentor, getOneMentor } from "../controllers/mentorController.js";

const router = Router();

router.get('/', validateToken, getAllMentors);
router.get('/:id', validateToken, getOneMentor);
router.put("/:id", validateToken, updateMentor);

export default router;
