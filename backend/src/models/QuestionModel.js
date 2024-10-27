import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    desc: { type: String, required: true },
    askedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentee', required: true },
    isAnswered: { type: Boolean, default: false },
    answeredBy: [
        {
            mentor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentee', required: true },
            answer: { type: String }
        }
    ],
}, { timestamps: true });

const Review = mongoose.model("Question", questionSchema);

export default Review;
