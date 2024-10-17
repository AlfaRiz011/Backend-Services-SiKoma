const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const Admin = require('./Admin');
const User = require('./User');

const FollowAdmin = sequelize.define('FollowAdmin', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'userId',
        },
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Admin,
          key: 'adminId',
        },
      },
}, {
  timestamps: false, 
});


FollowAdmin.belongsTo(User, { foreignKey: 'userId' });
FollowAdmin.belongsTo(Admin, { foreignKey: 'adminId' });

module.exports = FollowAdmin;