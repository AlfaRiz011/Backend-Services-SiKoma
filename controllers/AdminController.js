const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin'); 
const path = require('path');
const fs = require('fs');
const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const { Readable } = require('stream');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Admin
exports.createAdmin = async (req, res) => {
    try {
        const { email, password, ...otherData } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newAdmin = await Admin.create({
            email,
            password: hashedPassword,
            ...otherData,
        });

        sendSuccessResponse(res, 201, 'Admin created successfully', newAdmin);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error creating admin', error.message);
    }
};

// Get All Admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll(); 
        sendSuccessResponse(res, 200, 'Admins fetched successfully', admins);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error fetching admins', error.message);
    }
};

// Get Admin by ID
exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id); 
        if (!admin) {
            return sendErrorResponse(res, 404, 'Admin not found');
        }
        sendSuccessResponse(res, 200, 'Admin fetched successfully', admin);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error fetching admin', error.message);
    }
};

exports.getAdminByName = async (req,res) => {
    const { organization_name } = req.query;
    try {
        const admin = await Admin.findOne({where: { organization_name }});
        if (!admin) {
            return sendErrorResponse(res, 404, 'Admin not found');
        }
        sendSuccessResponse(res, 200, 'Admin fetched successfully', admin);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error updating admin', error.message);
    }
}

// Update Admin
exports.updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id); 
        if (!admin) {
            return sendErrorResponse(res, 404, 'Admin not found');
        }
        await admin.update(req.body); 
        sendSuccessResponse(res, 200, 'Admin updated successfully', admin);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error updating admin', error.message);
    }
};
 
exports.uploadAdminImage = async (req, res) => {
    const adminId = req.params.id;

    try {
        const admin = await Admin.findByPk(adminId);
        if (!admin) {
            return sendErrorResponse(res, 404, 'Admin not found');
        }

        const auth = new GoogleAuth({
            keyFile: process.env.SERVICE_ACCOUNT_FILE,
            scopes: process.env.SCOPES,
        });

        const drive = google.drive({ version: 'v3', auth: auth });
 
        if (admin.profile_pic) {
            const oldFileId = admin.profile_pic;
            try {
                await drive.files.delete({ fileId: oldFileId });
                console.log('Old profile picture deleted successfully');
            } catch (err) {
                console.error('Error deleting old profile picture:', err);
            }
        }
 
        if (!req.file) {
            admin.profile_pic = "";  
        } else {
            const file = req.file;
            const stream = Readable.from(file && file.buffer ? [file.buffer] : []);

            const fileMetadata = {
                name: `${new Date().getTime()}-${file.originalname}`,
                parents: [process.env.DESTINATION_FOLDER_ADMINS_ID],
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
 
            admin.profile_pic = process.env.CONST_DRIVE_LINK + fileId;
        }

        await admin.save();

        sendSuccessResponse(res, 200, 'Profile picture updated successfully', admin);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error updating profile picture', error.message);
    }
};
