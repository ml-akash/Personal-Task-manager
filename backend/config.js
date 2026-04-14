require('dotenv').config();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_secret_key_change_this',
    expiresIn: '7d'
  },
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
};