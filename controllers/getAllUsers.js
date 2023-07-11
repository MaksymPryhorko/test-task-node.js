const usersOperations = require("../../model");

const getAllUsers = async (req, res) => {
  const users = await usersOperations.getAllUsers();
  res.json({
    message: "success",
    code: 200,
    data: users,
  });
};

module.exports = getAllUsers;
