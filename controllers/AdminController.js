const Admin = require('../models/Admin');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Admin
exports.createAdmin = async (req, res) => {
    try{
        const newAdmin = new Admin(req.body);
        await newAdmin.save();
        sendSuccessResponse(res, 201, 'Admin created successfully', newAdmin);
    } catch(error){
        sendErrorResponse(res, 500, 'Error creating admin', error.message);
    }
};

//Get All Admin
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        sendErrorResponse(res, 200, 'Admins fetced successfully', admins);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error fetching admins', error.message);
    }
};

//Get Admin by ID
exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error fetching admin', error.message);
    }
};

//Update Admin
exports.updateAdmin = async (req, res) => {
    try {
        const admin = await findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!admin){
            return sendErrorResponse(res, 404, 'Admin not found');
        }
        sendSuccessResponse(res, 200, 'Admin updated successfully', admin);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error updating admmin');
    }
};


//Delete Admin
exports.deleteAdmin = async (req, res) => {
  try {
        const admin = await findByIdAndDelete(req.params.id);
        if(!admin){
            return sendErrorResponse(res, 404, 'Admin  not found');
        }
        sendSuccessResponse(res, 200, 'Admin deleted successfully');
  } catch (error) {
        sendErrorResponse(res, 500, 'Error deleting admin');
  }  
};