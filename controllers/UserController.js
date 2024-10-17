const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');
const { generateUniqueUsername } = require('../helpers/UsernameHelper');  

// Create User
exports.createUser = async (req, res) => {
  try {
    const { email, password, username, ...otherData } = req.body;
    
    const finalUsername = username || await generateUniqueUsername();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username: finalUsername,
      ...otherData,
    });

    sendSuccessResponse(res, 201, 'User created successfully', newUser);
  } catch (error) {
    sendErrorResponse(res, 500, 'Error creating user', error.message);
  }
};
  
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        sendSuccessResponse(res, 200, 'Users fetched successfully', users);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error fetching users', error.message);
    }
};
 
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return sendErrorResponse(res, 404, 'User not found');
        }
        sendSuccessResponse(res, 200, 'User fetched successfully', user);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error fetching user', error.message);
    }
};
 
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return sendErrorResponse(res, 404, 'User not found');
        }

        await user.update(req.body);
        sendSuccessResponse(res, 200, 'User updated successfully', user);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error updating user', error.message);
    }
};
 
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return sendErrorResponse(res, 404, 'User not found');
        }

        await user.destroy();
        sendSuccessResponse(res, 204, 'User deleted successfully');
    } catch (error) {
        sendErrorResponse(res, 500, 'Error deleting user', error.message);
    }
};
