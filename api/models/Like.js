const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const User = require('./User'); 
const Post = require('./Post'); 

const Like = sequelize.define('Like', {
  user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: User,
          key: 'user_id',
      },
      onDelete: 'CASCADE',
      primaryKey: true,
  },
  post_id: {
      type: DataTypes.INTEGER,
      references: {
          model: Post,
          key: 'post_id',
      },
      onDelete: 'CASCADE',
      primaryKey: true,
  },
}, {
  tableName: 'Like',
  timestamps: false,
});

Like.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Like.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = Like;
