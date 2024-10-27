import { body } from "express-validator";
import { signup, login, adminLogin } from "../controllers/authController.js";
import { Router } from "express";

const router = Router();

router.post('/signup', [
    body('email', 'Enter a valid email').isEmail(),
    body('role', 'Enter a valid role').isIn(["mentor", "mentee"]),
    body('username', 'Enter a valid username').exists(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password should contain atleast 8 characters').isLength({ min: 8 }),
], signup);

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], login);

router.post('/admin/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('role', 'Role should be mentor').equals("admin"),
    body('password', 'Password cannot be blank').exists(),
], adminLogin);


export default router;