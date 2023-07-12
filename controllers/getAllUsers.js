const { User } = require("../models/user");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({
    message: "success",
    code: 200,
    data: users,
  });
};

module.exports = getAllUsers;
