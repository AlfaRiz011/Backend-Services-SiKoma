const express = require('express');
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./database/Database');

const userRoutes = require('./routes/User');
const adminRoutes = require('./routes/Admin');
const postRoutes = require('./routes/Post');
const tagsRoutes = require('./routes/Tags');
const notificationRoutes = require('./routes/Notification');
const likeRoutes = require('./routes/Like');

dotenv.config();

const app = express();

app.use(express.json()); 

const startServer = async () => {
  try {
    await connectDB(); 
    await sequelize.sync(); 
    console.log('Database synced successfully');

  
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
  } catch (error) {
    console.error('Failed to start the server:', error.message);
    process.exit(1); 
  }
};

startServer();
