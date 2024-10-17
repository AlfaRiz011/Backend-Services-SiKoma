const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const User = require('./User');
const Tags = require('./Tags');

const FollowTag = sequelize.define('FollowTag', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'userId',
        },
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Tags,
          key: 'tagId',
        },
      },
}, {
  timestamps: false, 
});


FollowTag.belongsTo(User, { foreignKey: 'userId' });
FollowTag.belongsTo(Tags, { foreignKey: 'tagId' });

module.exports = FollowTag;