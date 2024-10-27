import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["mentor", "mentee", "admin"], required: true },
    profile: {
        name: { type: String, required: true },
        bio: { type: String },
        avatar: { data: Buffer, contentType: String },
        contact: {
            phone: { type: String },
        },
        social_media: {
            twitter: { type: String },
            linkedin: { type: String },
        },
    },
    isNew: {type: Boolean, default: true},
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
