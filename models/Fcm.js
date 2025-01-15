const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const User = require('./User'); 

const Fcmdata = sequelize.define('Fcmdata', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    token_fcm: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'fcmdata',
    timestamps: false,
});

Fcmdata.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }); 
module.exports = Fcmdata;