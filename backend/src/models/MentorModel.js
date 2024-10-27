import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    expertise: { type: [String] },
    description: { type: String },
    rating: { type: Number, default: 0 },
    yearsOfExperience: { type: Number },
    currentPostTitle: { type: String },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    price: { type: Number },
    pricingModel: { String, enum: ["subscription", "hourly", "fixed"] },
}, { timestamps: true });

const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;
