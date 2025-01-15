const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin'); 
const path = require('path');
const fs = require('fs');
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
  
        if (admin.profile_pic) {
            const oldPicPath = path.join(__dirname, '../uploads/admin/', admin.profile_pic);

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

        if (!req.file) {
            admin.profile_pic = "";   
        } else {
            admin.profile_pic = req.file.filename; 
        }
       
        await admin.save();

        sendSuccessResponse(res, 200, 'Profile picture updated successfully', admin);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error updating profile picture', error.message);
    }
};
