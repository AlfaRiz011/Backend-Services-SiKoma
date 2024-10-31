const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/Database');
const Post = require('./Post');
const Tag = require('./Tags');

const PostTag = sequelize.define('PostTag', {
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'post_id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
    },
    tag_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Tag,
            key: 'tag_id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
    },
}, {
    tableName: 'PostTag',
    timestamps: false,
});

module.exports = PostTag;