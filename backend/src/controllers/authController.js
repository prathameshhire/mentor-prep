import bcrypt from 'bcrypt';
import signToken from "../utils/token.js";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { fetchUserByEmail, createUser, fetchUserByUsername } from "../db/userMethods.js";
import { createNewMentee } from "../db/menteeMethods.js";
import { createNewMentor } from "../db/mentorMethods.js";

dotenv.config();

const saltRounds = Number(process.env.SALT_ROUNDS);

// ROUTE 1: Create a user using: POST 'api/auth/signup". No login required
export const signup = async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const {email, username, password, role, name} = req.body;

        let user = await fetchUserByEmail(email);
        if (user) {
            return res.status(400).json({success, error: "Email already exists"});
        }

        user = await fetchUserByUsername(username);
        if (user) {
            return res.status(400).json({success, error: "Username already exists"});
        }

        // Salting password
        const salt = await bcrypt.genSalt(saltRounds);
        const secPass = await bcrypt.hash(password, salt);

        // Creating a new user
        user = await createUser({
            username: username,
            password: secPass,
            email: email,
            role: role,
            profile: {
                name: name,
            },
        });

        if (role == "mentor") {
            await createNewMentor(user._id);
        }

        if (role == "mentee") {
            await createNewMentee(user._id);
        }

        const authtoken = signToken(user._id, user.role, user.username);

        success = true;
        res.status(201).json({success, user, authtoken});

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error");

    }

}

// ROUTE 2: Authenticate a user using: POST 'api/auth/login". No login required
export const login = async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const {email, password} = req.body;

        // Finding if user exists
        let user = await fetchUserByEmail(email);
        if (!user) {
            return res.status(400).json({success, error: "User not found"});
        }

        // Matching user password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Incorrect credentials"});
        }

        const authtoken = signToken(user._id, user.role, user.username);

        success = true;
        res.status(200).json({success, user, authtoken});

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error");

    }

}

// ROUTE 3: Authenticate a user using: POST 'api/auth/admin/login". No login required
export const adminLogin = async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const {email, password, role} = req.body;

        if (role != "admin") {
            return res.status(400).json({success, error: "Unauthorized"});
        }

        // Finding if user exists
        let user = await fetchUserByEmail(email);
        if (!user) {
            return res.status(400).json({success, error: "Incorrect credentials"});
        }

        // Matching user password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Incorrect credentials"});
        }

        const authtoken = signToken(user._id, user.role);

        success = true;
        res.status(200).json({success, authtoken});

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error");

    }

}
