const User = require("../models/userModel");

const fetchAllUsers = async () => {
  return await User.find();
};

const addUser = async (userData) => {
  return await User.create(userData);
};

const fetchUserById = async (userData) => {
  return await User.find(userData).exec();
};

module.exports = { fetchAllUsers, addUser, fetchUserById };
