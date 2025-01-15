const User = require('../models/User');

// Function to generate random username
const generateRandomUsername = () => {
  return `user${Math.floor(100000 + Math.random() * 900000)}`;
};

// Function to ensure generated username is unique
const generateUniqueUsername = async () => {
  let uniqueUsername = generateRandomUsername();
  let userExists = await User.findOne({ where: { username: uniqueUsername } });

  // Loop to generate until a unique username is found
  while (userExists) {
    uniqueUsername = generateRandomUsername();
    userExists = await User.findOne({ where: { username: uniqueUsername } });
  }

  return uniqueUsername;
};

module.exports = {
  generateUniqueUsername,
};
