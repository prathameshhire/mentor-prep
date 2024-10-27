import User from "../models/UserModel.js";

// Fetch list of users
export const fetchAllUsers = async (skip, limit, query = {}) => {
    const users = await User.find(query)
        .skip(skip)
        .limit(limit)
    return users;
}

// Find user by id
export const fetchUserById = async (id) => {
    const user = await User.findById(id);
    return user ? user : null;
}

// Find user by email
export const fetchUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });
    return user ? user : null;
}

// Find user by username
export const fetchUserByUsername = async (username) => {
    const user = await User.findOne({ username: username });
    return user ? user : null;
}

// Create a new user
export const createUser = async (_user) => {
    const user = await User.create(_user);
    return user;
}

// Update a user
export const updateUser = async (filter, options) => {
    const user = await User.findOneAndUpdate(filter, options);
    return user;
}

// Delete a user
export const deleteUser = async (filter) => {
    const user = await User.findOneAndDelete(filter);
    return user;
}

// Get profile details
export const getProfile = async (options) => {
    const user = await User.findOne({options});
    return user ? user.profile : null;
}