const { User } = require("../models/user");

const addUser = async (req) => {
  const results = await User.create(req.body);
  return results;
};

module.exports = addUser;
