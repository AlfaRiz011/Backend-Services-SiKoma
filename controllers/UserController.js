const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const { Readable } = require('stream');
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

        const auth = new GoogleAuth({
            keyFile: process.env.SERVICE_ACCOUNT_FILE,
            scopes: process.env.SCOPES,
        });

        const drive = google.drive({ version: 'v3', auth: auth });
 
        if (user.profile_pic) {
            const oldFileId = user.profile_pic;
            try { 
                await drive.files.get({ fileId: oldFileId }); 
                await drive.files.delete({ fileId: oldFileId });
                console.log('Old profile picture deleted successfully');
            } catch (err) {
                if (err.code === 404) {
                    console.warn(`File not found for deletion: ${oldFileId}`);
                } else {
                    console.error('Error deleting old profile picture:', err.message);
                }
            }
        }
 
        if (!req.file) {
            user.profile_pic = "";  
        } else {
            const file = req.file;
            const stream = Readable.from(file && file.buffer ? [file.buffer] : []);

            const fileMetadata = {
                name: `${new Date().getTime()}-${file.originalname}`,
                parents: [process.env.DESTINATION_FOLDER_USERS_ID],
            };

            const media = {
                mimeType: file.mimetype,
                body: stream,
            };

            const response = await drive.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: 'id, webViewLink',
            });

            const fileId = response.data.id;
 
            await drive.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: 'writer',
                    type: 'anyone',
                },
            });
 
            user.profile_pic = process.env.CONST_DRIVE_LINK + fileId;
        }

        await user.save();

        sendSuccessResponse(res, 200, 'Profile picture updated successfully', user);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error updating profile picture', error.message);
    }
};
