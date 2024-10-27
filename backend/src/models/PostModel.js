import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isMentor: { type: Boolean, required: true },
    tags: { type: [String] },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
