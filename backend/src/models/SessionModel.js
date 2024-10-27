import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
    numberOfParticipants: { type: Number, default: 0 },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentee' }],
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);

export default Session;
