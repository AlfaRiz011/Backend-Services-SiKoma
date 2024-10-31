const { connectDB } = require('./Database');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Post = require('../models/Post');
const Tag = require('../models/Tags');
const Like = require('../models/Like');
const Notification = require('../models/Notification');
const Register = require('../models/Register');
const FollowAdmin = require('../models/FollowAdmin');
const FollowTag = require('../models/FollowTag');
const EventParticipant = require('../models/EventParticipant');
const PostTag = require('../models/PostTag');
const PostRecommendation = require('../models/PostRecommendation');


const init = async () => {
  await connectDB();

  await User.sync();
  await Admin.sync();
  await Post.sync();
  await Tag.sync();
  await Like.sync();
  await Notification.sync();  
  await Register.sync();
  await FollowAdmin.sync();
  await FollowTag.sync();
  await EventParticipant.sync();
  await PostTag.sync();
  await PostRecommendation.sync();

  console.log('All models were synchronized successfully.');
};

init();
