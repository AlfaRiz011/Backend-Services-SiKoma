const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const User = require('./User');
const Tag = require('./Tags');

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
          model: Tag,
          key: 'tag_id',
      },
      onDelete: 'CASCADE',
      primaryKey: true,
  },
}, {
  tableName: 'FollowTag',
  timestamps: false,
});

FollowTag.belongsTo(User, { foreignKey: 'user_id' });
FollowTag.belongsTo(Tag, { foreignKey: 'tag_id' });

module.exports = FollowTag;