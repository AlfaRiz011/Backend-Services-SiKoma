const bcrypt = require('bcryptjs');
const Register = require('../models/Register');
const User = require('../models/User');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');
const { sendOtpEmail } = require('../helpers/EmailHelper');  
const { generateOtp } = require('../helpers/OtpHelper.js');  
 
const emailRegex = /^[0-9]+@mahasiswa\.upnvj\.ac\.id$/;

exports.register = async (req, res) => {
    try {
        const { email, password, ...otherData } = req.body;
 
        const hashedPassword = await bcrypt.hash(password, 10);
 
        const registerUser = await Register.findOne({ where: { email } });
 
        if (!registerUser) {
            return sendErrorResponse(res, 404, 'Silahkan Verifikasi terlebih dahulu.');
        }

        if (!registerUser.verified) {
            return sendErrorResponse(res, 400, 'Email belum terverifikasi');
        }
 
        const newUser = await User.create({
            email,
            password: hashedPassword,
            ...otherData,
        });

        sendSuccessResponse(res, 201, 'User created successfully', newUser);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error creating user', error.message);
    }
};

exports.requestOtp = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendErrorResponse(res, 400, 'Email dan password wajib diisi');
    }

    if (!emailRegex.test(email)) {
        return sendErrorResponse(res, 400, 'Email harus diakhiri dengan @mahasiswa.upnvj.ac.id dan diawali angka');
    }

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return sendErrorResponse(res, 400, 'Email sudah terdaftar');
        }

        const existingOtp = await Register.findOne({ where: { email } });
        if (existingOtp && existingOtp.expires_at > new Date()) {
            return sendErrorResponse(res, 400, 'OTP sudah diberikan dan masih berlaku. Silakan tunggu sebelum meminta OTP baru.');
        }

        const otp = generateOtp();
        await sendOtpEmail(email, otp);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newRegister = await Register.create({
            email,
            password: hashedPassword,
            otp_code: otp,
            verified: false,
            expires_at: new Date(Date.now() + 10 * 60 * 1000)  
        });  

        sendSuccessResponse(res, 201, 'OTP sent to your email. Please verify to complete registration.', newRegister,);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error request otp', error.message);
    }
};

 
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const registerUser = await Register.findOne({ where: { email } });
        if (!registerUser) {
            return sendErrorResponse(res, 404, 'User not found');
        }
 
        if (registerUser.otp_code !== otp) {
            return sendErrorResponse(res, 400, 'Invalid OTP');
        }

        await registerUser.update({ verified: true });  

        const hashedPassword = await bcrypt.hash(registerUser.password, 10);
        
        sendSuccessResponse(res, 200, 'Account verified successfully', {
            email: registerUser.email,
            password: hashedPassword
        });
    } catch (error) {
        sendErrorResponse(res, 500, 'Error verifying OTP', error.message);
    }
};