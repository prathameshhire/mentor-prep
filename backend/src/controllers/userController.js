import { fetchAllUsers, fetchUserById, updateUser } from "../db/userMethods.js";

// ROUTE 1: Create a user using: GET 'api/users". [admin]
export const getAllUsers = async (req, res) => {

    let success = false;

    try {
       
        if (req.user.role !== "admin") {
            res.status(401).json({success, error: "Unauthorized"});
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        delete req.query.page;
        delete req.query.limit;

        const users = await fetchAllUsers(skip, limit);
        success = true;

        res.status(200).json({success,
            results: users.length,
            data: {
                users,
            },
        });

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
};

// ROUTE 2: Update a user using: PUT 'api/users/:id". [Login Required]
export const updateUserController = async (req, res) => {

    let success = false;

    try {

        if (req.user.id != req.params.id) {
            res.status(405).json({success, error: "Cannot update account"});
            return;
        }
       
        const { bio, phone, twitter, linkedin } = req.body;

        const filter = { _id: req.params.id };
        const options = {};

        const user = await fetchUserById(req.params.id);

        options.profile = user.profile || {};
        
        if (bio) {
            options.profile.bio = bio;
        }
        
        if (req.file) {
            options.profile.avatar = req.file.filename;
        }

        options.profile.contact = user.profile.contact || {};

        if (phone) {
            options.profile.contact.phone = phone;
        }

        options.profile.social_media = user.profile.social_media || {};

        if (twitter) {
            options.profile.social_media.twitter = twitter;
        }

        if (linkedin) {
            options.profile.social_media.linkedin = linkedin;
        }

        let updatedUser = await updateUser(filter, options);
        const isAllUpdated = (
            updatedUser.profile.bio &&
            updatedUser.profile.avatar &&
            updatedUser.profile.contact.phone &&
            updatedUser.profile.social_media.twitter &&
            updatedUser.profile.social_media.linkedin
        );

        if (isAllUpdated) {
            updatedUser = await updateUser(filter, { isNew: false });
        }

        success = true;

        res.status(200).json({
            success,
            data: {
                updatedUser,
            },
        });

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}
