const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');

const Otp = sequelize.define('Otp', {
    otp_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verified:{
        type: DataTypes.BOOLEAN,
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'Otp',
    timestamps: false,
});

module.exports = Otp;
