const { User } = require("../models/user");

const AddUserForBot = async (newUser) => {
  const addUser = await User.create(newUser);
  return addUser;
};

module.exports = AddUserForBot;
