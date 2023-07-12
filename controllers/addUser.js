const { User } = require("../models/user");

const addUser = async (req, res) => {
  const addUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: addUser,
  });
};

module.exports = addUser;
