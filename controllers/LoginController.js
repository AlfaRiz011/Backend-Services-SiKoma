const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendSuccessResponseLogin, sendErrorResponse } = require('../helpers/ResponseHelper');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try { 
        const user = await User.findOne({ where: { email } });
        const admin = await Admin.findOne({ where: { email } });
 
        const account = user || admin;
        if (!account) {
            return sendErrorResponse(res, 401, 'Invalid credentials');
        }
 
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return sendErrorResponse(res, 401, 'Invalid credentials');
        }
 
        const id = user ? account.user_id : account.admin_id;
        const token = jwt.sign(
            { id, email: account.email, role: user ? 'user' : 'admin' },  
            process.env.JWT_SECRET,
            { expiresIn: '100h' }
        );
 
        sendSuccessResponseLogin(res, 200, 'Login successful', token, account);
    } catch (error) {
        console.error('Login error:', error);
        sendErrorResponse(res, 500, 'Server error');
    }
};

