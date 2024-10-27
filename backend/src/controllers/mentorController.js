import { fetchAllMentors, updateOneMentor, fetchOneMentor } from "../db/mentorMethods.js";


// ROUTE 1: Get all mentors: GET 'api/mentors".
export const getAllMentors = async (req, res) => {
    let success = false;

    try {

        // Pagination parameters
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        delete req.query.page;
        delete req.query.limit;

        // Query parameters
        const query = req.query;

        // Fetch all mentors
        const mentors = await fetchAllMentors(skip, limit, query);

        success = true;

        res.status(200).json({
            success,
            results: mentors.length,
            data: {
                mentors,
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};



// Update mentor information
export const updateMentor = async (req, res) => {
    let success = false;

    try {
        // Check if the user is a mentor and matches the provided id
        if (req.user.role !== "mentor" || req.user.id != req.params.id) {
            res.status(401).json({ success, error: "Unauthorized" });
            return;
        }

        const mentorId = req.params.id;
        const updateData = req.body; 

        // Update mentor information in the database
        const updatedMentor = await updateOneMentor(mentorId, updateData);

        if (!updatedMentor) {
            res.status(404).json({ success, error: "Mentor not found" });
            return;
        }

        success = true;

        res.status(200).json({
            success,
            data: {
                mentor: updatedMentor,
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

export const getOneMentor = async (req, res) =>  {
    
    let success = false;

    try {
       
        const mentor = await fetchOneMentor(req.params.id);

        if (!mentor) {
            res.status(404).json({success, error: "mentor not found"});
            return;
        }

        success = true;
        res.status(200).json({
            success,
            data: {
                mentor,
            },
        });

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}
