const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const User = require('./User');
const Tags = require('./Tags');

const FollowTag = sequelize.define('FollowTag', {
  user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: User,
          key: 'user_id',
      },
      onDelete: 'CASCADE',
      primaryKey: true,
  },
  tag_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Tags,
          key: 'tag_id',
      },
      onDelete: 'CASCADE',
      primaryKey: true,
  },
}, {
  tableName: 'FollowTag',
  timestamps: false,
});

module.exports = FollowTag;