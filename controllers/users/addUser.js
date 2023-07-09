const usersOperations = require("../../model");

const addUser = async (req, res) => {
  const addUser = await usersOperations.addUser(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: addUser,
  });
};

module.exports = addUser;
