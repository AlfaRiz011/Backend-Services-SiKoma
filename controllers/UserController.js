const User = require('../models/User');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create User
exports.createUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        sendSuccessResponse(res, 201, 'User created successfully', newUser);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error creating user', error.message);
    }
};

// Get All Users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        sendSuccessResponse(res, 200, 'Users fetched successfully', users);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error fetching users', error.message);
    }
};

// Get User by ID
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return sendErrorResponse(res, 404, 'User not found');
        }
        sendSuccessResponse(res, 200, 'User fetched successfully', user);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error fetching user', error.message);
    }
};

// Update User
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return sendErrorResponse(res, 404, 'User not found');
        }
        sendSuccessResponse(res, 200, 'User updated successfully', user);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error updating user', error.message);
    }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return sendErrorResponse(res, 404, 'User not found');
        }
        sendSuccessResponse(res, 204, 'User deleted successfully');
    } catch (error) {
        sendErrorResponse(res, 500, 'Error deleting user', error.message);
    }
};
