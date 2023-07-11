const { User } = require("../models/user");

const getAllUsers = async () => {
  const results = await User.find();
  return results;
};

module.exports = getAllUsers;
