import Post from "../models/PostModel.js";

// fetch all posts
export const fetchAllPosts = async (skip, limit, query = {}) => {
    const posts = await Post.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('author');
    return posts;
}

// fetch one post
export const fetchOnePost = async (id) => {
    const post = await Post.findById(id).populate('author');
    return post ? post : null;
}

// fetch posts of a user
export const fetchUserPosts = async (id, skip, limit) => {
    const query = { author: id };
    const posts = await fetchAllPosts(skip, limit, query);
    return posts;
}

// create a post
export const createOnePost = async(_post) => {
    const post = await Post.create(_post);
    return post;
}

// Update a post
export const updateOnePost = async (filter, options) => {
    const post = await Post.findOneAndUpdate(filter, options);
    return post;
}

// Delete a post
export const deleteOnePost = async (filter) => {
    const post = await Post.findOneAndDelete(filter);
    return post;
}
