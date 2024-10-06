const { connectDB } = require('./database/Database');
const User = require('./models/User');
const Admin = require('./models/Admin');
const Post = require('./models/Post');
const Tag = require('./models/Tags');
const Like = require('./models/Like');
const Notification = require('./models/Notification');

const init = async () => {
  await connectDB();

  await User.sync();
  await Admin.sync();
  await Post.sync();
  await Tag.sync();
  await Like.sync();
  await Notification.sync();

  console.log('All models were synchronized successfully.');
};

init();
