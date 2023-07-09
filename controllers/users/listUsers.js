const usersOperations = require("../../model");

const listUsers = async (req, res) => {
  const contacts = await usersOperations.listUsers();
  res.json({
    message: "success",
    code: 200,
    data: contacts,
  });
};

module.exports = listUsers;
