const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const User = require('./User'); 
const Post = require('./Post'); 

const Like = sequelize.define('Like', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId',
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: 'postId',
    },
  },
}, {
  timestamps: false, 
});

Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Post, { foreignKey: 'postId' });

module.exports = Like;
