import Question from '../models/QuestionModel.js';

export const fetchAllQuestions = async (skip, limit, query={}) => {
    const questions = await Question.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('askedBy')
        .populate({
            path: 'answeredBy.mentor_id',
            model: 'Mentee'
        });
    return questions;
}

export const fetchQuestionsAskedByMentee = async (skip, limit, mentee_id) => {
    const questions = await fetchAllQuestions(skip, limit, { askedBy: mentee_id });
    return questions;
}

export const createNewQuestion = async (_question) => {
    const question = await Question.create(_question);
    return question;
}

export const findOneQuestion = async (id) => {
    const question = await Question.findById(id)
        .populate('askedBy')
        .populate({
            path: 'answeredBy.mentor_id',
            model: 'Mentee'
        });
    return question;
}

export const updateQuestion = async (filter, options) => {
    let question = await Question.findOne(filter);
    if (!question) {
        return null;
    }
    question = await Question.findOneAndUpdate(filter, options);
    return question;
}
