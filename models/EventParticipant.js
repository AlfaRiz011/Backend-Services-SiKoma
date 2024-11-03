const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const User = require('./User');
const Post = require('./Post');

const EventParticipant = sequelize.define('EventParticipant', {
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
    tableName: 'EventParticipant',
    timestamps: false,
});

EventParticipant.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
EventParticipant.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
module.exports = EventParticipant;