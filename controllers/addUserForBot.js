const { User } = require("../models/user");

const addUserForBot = async (newUser) => {
  const addUser = await User.create(newUser);
  return addUser;
};

module.exports = addUserForBot;
