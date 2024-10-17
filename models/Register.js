const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');

const Register = sequelize.define('Register', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp: {
        type: DataTypes.STRING,  
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,  
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
  timestamps: false, 
});

module.exports = Register;
