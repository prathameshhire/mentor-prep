import { fetchQuestionsAskedByMentee, createNewQuestion, fetchAllQuestions, findOneQuestion, updateQuestion } from "../db/questionMethods.js";

export const getAllQuestions = async (req, res) => {

    let success = false;

    try {
       
        if (req.user.role != "mentor" || req.user.role != "admin") {
            res.status(401).json({success, error: "Unauthorized"});
            return;
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        delete req.query.page;
        delete req.query.limit;

        const query = req.query;

        const questions = await fetchAllQuestions(skip, limit, query);
        success = true;

        res.status(200).json({
            success,
            data: {
                questions,
            },
        });

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}

export const getAllMenteeQuestions = async (req, res) => {

    let success = false;

    try {

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        delete req.query.page;
        delete req.query.limit;

        const questions = await fetchQuestionsAskedByMentee(skip, limit, req.user.id);
        success = true;

        res.status(200).json({
            success,
            data: {
                questions,
            },
        });

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}

export const createQuestion = async (req, res) => {

    let success = false;

    try {

        if (req.user.role != "mentee") {
            res.status(401).json({ success, error: "Unauthorized" });
        }
       
        const { question, desc } = req.body;

        const newQuestion = {
            question,
            desc,
            askedBy: req.user.id,
        }

        const savedQuestion = await createNewQuestion(newQuestion);
        success = true;

        res.status(201).json({
            success,
            data: {
                savedQuestion,
            },
        });

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}

export const answerQuestion = async (req, res) => {

    let success = false;
    
    try {

        if (req.user.role != "mentor") {
            res.status(401).json({ success, error: "Unauthorized" });
        }
       
        const { answer } = req.body;

        const question = await findOneQuestion(req.params.id);

        if (!question) {
            res.status(404).json({ success, error: "Question not found" });
        }

        const filter = { _id: question._id };
        const options = { answeredBy: [...question.answeredBy, { answer, mentor_id: req.user.id }] }

        const newQuestion = await updateQuestion(filter, options);
        success = true;

        res.status(200).json({
            success,
            data: {
                newQuestion,
            },
        });

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}

export const markSolved = async (req, res) => {

    let success = false;
    
    try {

        if (req.user.role != "mentee") {
            res.status(401).json({ success, error: "Unauthorized" });
        }

        const question = await findOneQuestion(req.params.id);

        if (!question) {
            res.status(404).json({ success, error: "Question not found" });
        }

        const filter = { _id: question._id };
        const options = { isAnswered: true }

        const newQuestion = await updateQuestion(filter, options);
        success = true;

        res.status(200).json({
            success,
            data: {
                newQuestion,
            },
        });

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}
