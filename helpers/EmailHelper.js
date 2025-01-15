const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
 
const sendOtpEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail.com',  
            auth: {
                user: process.env.MY_EMAIL,  
                pass: process.env.MY_EMAILPASSWORD,   
            },  
        });

        const mailOptions = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendOtpEmail };