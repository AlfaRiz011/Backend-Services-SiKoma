const express = require('express');
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./database/Database');
const authenticateToken = require('./middlewares/authMiddleware');  

const userRoutes = require('./routes/User');
const adminRoutes = require('./routes/Admin');
const postRoutes = require('./routes/Post');
const tagsRoutes = require('./routes/Tags');
const notificationRoutes = require('./routes/Notification');
const followRoutes = require('./routes/Follow');
const eventRoutes = require('./routes/Event');
const registerRoutes = require('./routes/Register');
const loginRoutes = require('./routes/Login');

dotenv.config();

const app = express();

app.use(express.json());

const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync();
        console.log('Database synced successfully');
 
        app.use('/api/register', registerRoutes);
        app.use('/api/login', loginRoutes);
 
        app.use('/api/users', authenticateToken, userRoutes);
        app.use('/api/admins', authenticateToken, adminRoutes);
        app.use('/api/posts', authenticateToken, postRoutes);
        app.use('/api/tags', authenticateToken, tagsRoutes);
        app.use('/api/notifications', authenticateToken, notificationRoutes);
        app.use('/api/follow', authenticateToken, followRoutes);
        app.use('/api/event', authenticateToken, eventRoutes);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log("Server running on port ${PORT}");
        });
    } catch (error) {
        console.error('Failed to start the server:', error.message);
        process.exit(1);
    }
};

startServer();