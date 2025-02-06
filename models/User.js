const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database'); 
const User = sequelize.define('User', {
  user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
  },
  full_name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  profile_pic: {
      type: DataTypes.STRING,
  },
  study_prog: {
      type: DataTypes.STRING,
  },
  faculty: {
      type: DataTypes.STRING,
  },
  nim: {
      type: DataTypes.STRING,
  },
}, {
  tableName: 'users',
  timestamps: false,
});
 
module.exports = User;