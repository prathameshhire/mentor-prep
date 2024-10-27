import { fetchAllPosts, createOnePost, deleteOnePost, updateOnePost, fetchOnePost, fetchUserPosts } from "../db/postMethods.js";

export const getAllPosts = async (req, res) => {

    let success = false;

    try {

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        delete req.query.page;
        delete req.query.limit;

        const query = req.query;

        const posts = await fetchAllPosts(skip, limit, query);
        success = true;

        res.status(200).json({
            success,
            results: posts.length,
            data: {
                posts,
            },
        });

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}

export const createPost = async (req, res) => {

    let success = false;

    try {
       
        const { title, content, tags } = req.body;

        const newPost = {};

        if (title) {
            newPost.title = title;
        }

        if (content) {
            newPost.content = content;
        }

        if (tags) {
            newPost.tags = tags;
        }

        newPost.author = req.user.id;
        newPost.isMentor = req.user.role === "mentor";

        const post = await createOnePost(newPost);
        success = true;

        res.status(201).json({
            success,
            data: {
                post,
            },
        })

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}

export const updatePost = async (req, res) => {

    let success = false;

    try {

        const post = await fetchOnePost(req.params.id);

        if (!post) {
            res.status(404).json({success, error: "Post not found"});
        }

        const vote = req.body.vote;
        if (vote == 0) {
            res.status(400).json({success, error: "Upvote cannot be zero"});
        }

        const filter = { _id: req.params.id };
        const options = { upvotes: post.upvotes, downvotes: post.downvotes };

        if (vote > 0) {
            options.upvotes += 1;
        } else {
            options.downvotes += 1;
        }
        const updatedPost = await updateOnePost(filter, options);

        success = true;

        res.status(200).json({
            success,
            data: {
                updatedPost,
            },
        })

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}

export const deletePost = async (req, res) => {

    let success = false;

    try {

        const post = await fetchOnePost(req.params.id);

        if (!post) {
            res.status(404).json({success, error: "Post not found"});
        }

        const deletedPost = await deleteOnePost({ _id: req.params.id });

        success = true;

        res.status(200).json({
            success,
            data: {
                deletedPost,
            },
        })

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}