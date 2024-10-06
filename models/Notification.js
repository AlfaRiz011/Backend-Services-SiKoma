// Notification.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const Post = require('./Post'); // Import Post model
const User = require('./User'); // Import User model

const Notification = sequelize.define('Notification', {
  notificationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  contentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: 'postId',
    },
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId',
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pushTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, 
});

Notification.belongsTo(Post, { foreignKey: 'contentId' });
Notification.belongsTo(User, { foreignKey: 'recipientId' });

module.exports = Notification;
