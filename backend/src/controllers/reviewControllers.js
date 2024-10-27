import { fetchPaginatedReviewsByMentor, deleteReview, createNewReview } from "../db/reviewMethods.js";

// Get paginated reviews of a mentor
export const getPaginatedReviewsByMentor = async (req, res) => {
    let success = false;

    try {
        const mentorId = req.params.mentorId;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        // Fetch paginated reviews of the mentor
        const reviews = await fetchPaginatedReviewsByMentor(mentorId, page, limit);

        success = true;

        res.status(200).json({
            success,
            results: reviews.length,
            data: {
                reviews,
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

export const createReview = async (req, res) => {

    let success = false; 
    
    try {
       
        const { title, desc, rating, mentor_id } = req.body;

        const newReview = {
            title,
            desc,
            rating,
            mentor_id,
            mentee_id: req.user.id,
        };

        const review = await createNewReview(newReview);
        success = true;

        res.status(201).json({
            success,
            data: {
                review,
            },
        });

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}

export const deleteReviewByMentee = async (req, res) => {
    let success = false;

    try {
        const reviewId = req.params.reviewId;
        const menteeId = req.user.id; 

        // Delete the review by mentee
        const deletedReview = await deleteReview(reviewId, menteeId);

        if (!deletedReview) {
            res.status(404).json({ success, error: "Review not found or unauthorized" });
            return;
        }

        success = true;

        res.status(200).json({
            success,
            data: {
                review: deletedReview,
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};