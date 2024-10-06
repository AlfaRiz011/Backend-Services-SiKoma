// Post.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const Admin = require('./Admin'); 

const Post = sequelize.define('Post', {
  postId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Admin,
      key: 'adminId',
    },
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  postDesc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, 
});

Post.belongsTo(Admin, { foreignKey: 'authorId' });

module.exports = Post;
