import mongoose from "mongoose";

const menteeSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    preferences: { type: [String] },
    occupation: { type: String },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
}, { timestamps: true });

const Mentee = mongoose.model("Mentee", menteeSchema);

export default Mentee;
