const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const Admin = require('./Admin'); 

const Post = sequelize.define('Post', {
  post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  description: {
      type: DataTypes.TEXT,
      allowNull: false,
  },
  image: {
      type: DataTypes.STRING,
  },
  admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: Admin,
          key: 'admin_id',
      },
  },
  type: {
      type: DataTypes.ENUM('information', 'event'),
      allowNull: false,
  },
  event_name: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  event_date: {
      type: DataTypes.DATE,
      allowNull: true,
  },
  event_time: {
      type: DataTypes.TIME,
      allowNull: true,
  },
}, {
  tableName: 'Post',
  timestamps: false,
});

Post.belongsTo(Admin, {
  foreignKey: 'admin_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
}); 
module.exports = Post;
