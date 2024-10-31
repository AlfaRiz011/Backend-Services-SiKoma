const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');
const { generateUniqueUsername } = require('../helpers/UsernameHelper');  
 

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

exports.getUserByEmail = async(req, res) => {
    const { email } = req.body;

    if(!email){
        return sendErrorResponse(res, 400, 'Email Query Needed');
    }
    
    try{
        const user = await User.findOne({where : { email }});

        if(!user){
            return sendErrorResponse(res, 400, 'User not found');
        }
        sendSuccessResponse(res, 200, 'User fetched successfully', user);
    } catch(error) {
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

