const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
  profilePicture: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nim: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  faculties: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studyProgram: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateCreated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, 
});


module.exports = User;
