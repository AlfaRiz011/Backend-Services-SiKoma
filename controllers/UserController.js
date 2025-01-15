const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

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

exports.getUserByEmail = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return sendErrorResponse(res, 400, 'Email Query Needed');
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return sendErrorResponse(res, 400, 'User not found');
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

exports.updateProfilePic = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return sendErrorResponse(res, 404, 'User not found');
        }

        if (user.profile_pic) {
            const oldPicPath = path.join(__dirname, '../uploads/user/', user.profile_pic);

            if (fs.existsSync(oldPicPath)) {
                fs.unlink(oldPicPath, (err) => {
                    if (err) {
                        console.error('Error deleting old profile picture:', err);
                    } else {
                        console.log('Old profile picture deleted successfully');
                    }
                });
            } else {
                console.warn('Old profile picture not found, skipping deletion');
            }
        }

        // Cek apakah ada file yang diunggah
        if (!req.file) {
            user.profile_pic = "";   
        } else {
            user.profile_pic = req.file.filename;   
        }
        await user.save();

        sendSuccessResponse(res, 200, 'Profile picture updated successfully', user);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error updating profile picture', error.message);
    }
};