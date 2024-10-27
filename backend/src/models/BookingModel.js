import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    mentee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentee', required: true },
    mentor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
    dateOfSession: { type: Date, required: true },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
