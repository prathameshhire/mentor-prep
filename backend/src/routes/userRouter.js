import { getAllUsers, updateUserController } from "../controllers/userController.js";
import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import uploadImage from "../middlewares/uploadImage.js";

const router = Router();

router.get('/', validateToken, getAllUsers);
router.put('/:id', validateToken, uploadImage.single("avatar"), updateUserController);

export default router;