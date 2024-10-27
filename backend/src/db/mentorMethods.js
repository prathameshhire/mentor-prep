import Mentor from "../models/MentorModel.js";

// Fetch all mentors
export const fetchAllMentors = async (skip, limit, query = {}) => {
    const mentors = await Mentor.find(query)
        .skip(skip)
        .limit(limit)
        .populate('user_id');
    return mentors;
};

export const createNewMentor = async (id) => {
    const mentor = await Mentor.create({ user_id: id });
    return mentor;
}

export const fetchOneMentor = async (id) => {
    const mentor = await Mentor.findOne({ user_id: id }).populate('user_id');
    return mentor ? mentor : null;
}

export const updateOneMentor = async (filter, data) => {
    const options = { $set: updateData };
    const updatedMentor = await updateUser(filter, options);
    return updatedMentor;
};


