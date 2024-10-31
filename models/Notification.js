const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const Post = require('./Post');  
const User = require('./User');  

const UserNotification = sequelize.define('UserNotification', {
  notif_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: User,
          key: 'user_id',
      },
      onDelete: 'CASCADE',
  },
  post_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Post,
          key: 'post_id',
      },
      onDelete: 'CASCADE',
  },
  is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
  },
}, {
  tableName: 'UserNotification',
  timestamps: false,
});

module.exports = UserNotification;
