const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database'); 
const Admin = sequelize.define('Admin', {
  admin_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
  },
  organization_name: {
      type: DataTypes.STRING,
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  profile_pic: {
      type: DataTypes.STRING,
  },
  bio: {
      type: DataTypes.TEXT,
  },
  posts_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
  },
}, {
  tableName: 'admins',
  timestamps: false,
});
 
module.exports = Admin;