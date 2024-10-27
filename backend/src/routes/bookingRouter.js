import { createBooking, getAllBookings, getAllMenteeBookings, getAllMentorBookings } from "../controllers/bookingController.js";
import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { body } from "express-validator";

const router = Router();

router.get('/', validateToken, getAllBookings);
router.get('/mentor/:id', validateToken, getAllMentorBookings);
router.get('/mentee/:id', validateToken, getAllMenteeBookings);
router.get('/', validateToken, [
    body("dateOfSession").isDate().exists(),
    body("mentor_id").isMongoId().exists(),
],createBooking);

export default router;
