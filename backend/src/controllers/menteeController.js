import { updateOneMentee , fetchAllMentees, fetchOneMentee} from "../db/menteeMethods.js";

// ROUTE 1: Get all mentees: GET 'api/mentees". [admin]
export const getAllMentees = async (req, res) => {
    let success = false;

    try {
        // Check if the user is an admin
        if (req.user.role !== "admin") {
            res.status(401).json({ success, error: "Unauthorized" });
            return;
        }

        // Pagination parameters
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        delete req.query.page;
        delete req.query.limit;

        // Query parameters
        const query = req.query;

        // Fetch all mentees
        const mentees = await fetchAllMentees(skip, limit, query);

        success = true;

        res.status(200).json({
            success,
            results: mentees.length,
            data: {
                mentees,
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};


export const updateMentee = async (req, res) => {
    let success = false;

    try {
        // Check if the user is a mentee and matches the provided id
        if (req.user.role !== "mentee" || req.user.id != req.params.id) {
            res.status(401).json({ success, error: "Unauthorized" });
            return;
        }

        const menteeId = req.params.id;
        const updateData = req.body; 

        
        const updatedMentee = await updateOneMentee(menteeId, updateData);

        if (!updatedMentee) {
            res.status(404).json({ success, error: "Mentee not found" });
            return;
        }

        success = true;

        res.status(200).json({
            success,
            data: {
                mentee: updatedMentee,
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

export const getOneMentee = async (req, res) =>  {
    
    let success = false;

    try {
       
        const mentee = await fetchOneMentee(req.params.id);

        if (!mentee) {
            res.status(404).json({success, error: "mentee not found"});
            return;
        }

        success = true;
        res.status(200).json({
            success,
            data: {
                mentee,
            },
        });

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}
