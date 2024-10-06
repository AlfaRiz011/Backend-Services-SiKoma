const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');

const Admin = sequelize.define('Admin', {
  adminId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  organizationName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  profilePic: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  dateCreated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, 
});

module.exports = Admin;
