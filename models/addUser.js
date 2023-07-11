const { User } = require("../models/user");

const addUser = async (req) => {
  const results = await User.create();
  return results;
};

module.exports = addUser;
