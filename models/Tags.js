const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');  
const Tag = sequelize.define('Tag', {
  tag_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
}, {
  tableName: 'Tag',
  timestamps: false,
});
 
module.exports = Tag;
