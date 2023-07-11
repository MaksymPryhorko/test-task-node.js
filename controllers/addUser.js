const usersOperations = require("../models");

const addUser = async (req, res) => {
  console.log(req.body);
  const addUser = await usersOperations.addUser(req);
  res.status(201).json({
    status: "success",
    code: 201,
    data: addUser,
  });
};

module.exports = addUser;
