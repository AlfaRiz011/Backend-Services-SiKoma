const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const User = require('./User');
const Post = require('./Post');

const PostRecommendation = sequelize.define('PostRecommendation', {
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
    tableName: 'post_recommendation',
    timestamps: false,
});

PostRecommendation.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
PostRecommendation.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });


module.exports = PostRecommendation;