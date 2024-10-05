// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/Database');

const userRoutes = require('./routes/User');
const adminRoutes = require('./routes/Admin');
const postRoutes = require('./routes/Post');
const tagsRoutes = require('./routes/Tags');
const notificationRoutes = require('./routes/Notification');
const likeRoutes = require('./routes/Like');

dotenv.config();

const app = express();

connectDB();

app.use(express.json()); 

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/likes', likeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
