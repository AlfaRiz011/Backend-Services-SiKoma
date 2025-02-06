const bcrypt = require('bcryptjs'); 
const User = require('../models/User');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');
 
const emailRegex = /^[0-9]+@mahasiswa\.upnvj\.ac\.id$/;

exports.checkUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if(!emailRegex.test(email)){
            return sendErrorResponse(res, 400, 'Gunakan email UPN');
        }

        const existingUser = await User.findOne({ where: {email} })

        if(existingUser){
            return sendErrorResponse(res, 400, 'User already exists');
        }

        sendSuccessResponse(res, 201, 'User siap dibuat');
    } catch (error) {
        sendErrorResponse(res, 500, 'Gagal memuat user', error.message);
    }
};


exports.register = async (req, res) => {
    try {
        const { email, password, ...otherData} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            ...otherData
        });

        sendSuccessResponse(res, 201, "Berhasil membuat User", newUser);
    } catch (error) {
        sendErrorResponse(res, 500, "Gagal membuat User", error.message);
    }
}