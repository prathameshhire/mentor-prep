import Review from "../models/ReviewModel.js";

export const fetchPaginatedReviewsByMentor = async (mentorId, page, limit) => {
    const reviews = await Review.find({ mentor_id: mentorId })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('mentor_id')
        .populate('mentee_id');
    return reviews;
};

export const createNewReview = async (_review) => {
    const review = await Review.create(_review);
    return review;
}

export const deleteReview = async (reviewId, menteeId) => {
    const review = await Review.findOne({ _id: reviewId, mentee_id: menteeId });
    if (!review) {
        return null;
    }
    await Review.deleteOne({ _id: reviewId });
    return review;
};