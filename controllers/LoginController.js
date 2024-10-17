const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendSuccessResponseLogin, sendErrorResponse } = require('../helpers/ResponseHelper');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return sendErrorResponse(res, 401, 'Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendErrorResponse(res, 401, 'Invalid email or password');
        }

        const token = jwt.sign({ id: user.userId, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        sendSuccessResponseLogin(res, 200, 'Login successful', token, user);
    } catch (error) {
        console.error('Login error:', error);
        sendErrorResponse(res, 500, 'Server error');
    }
};
