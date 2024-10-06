const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const Post = require('./Post'); 

const Tags = sequelize.define('Tag', {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: 'postId',
    },
  },
  tagName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false, 
});

Tags.belongsTo(Post, { foreignKey: 'postId' });

module.exports = Tags;
