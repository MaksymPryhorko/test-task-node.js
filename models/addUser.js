const { v4 } = require("uuid");
const getAllUsers = require("./getAllUsers");
const listUsers = require("./listUsers");
const userSchema = require("../schemas/");

const addUser = async ({ name, age, email }) => {
  const allUsers = await getAllUsers();
  const newUser = { id: v4(), name, age, email };
  allUsers.push(newUser);
  await listUsers(allUsers);
  return newUser;
};

module.exports = addUser;
