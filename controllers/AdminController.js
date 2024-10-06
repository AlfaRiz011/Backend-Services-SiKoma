const Admin = require('../models/Admin'); 
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Admin
exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body); 
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

// Delete Admin
exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id); 
        if (!admin) {
            return sendErrorResponse(res, 404, 'Admin not found');
        }
        await admin.destroy(); 
        sendSuccessResponse(res, 200, 'Admin deleted successfully');
    } catch (error) {
        sendErrorResponse(res, 500, 'Error deleting admin', error.message);
    }
};
