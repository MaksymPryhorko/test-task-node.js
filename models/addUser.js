const { v4 } = require("uuid");
const getAllUsers = require("./getAllUsers");
const updateListUsers = require("./updateListUsers");
const userSchema = require("../schemas/");

const addUser = async ({ name, age, email }) => {
  const allUsers = await getAllUsers();
  const newUser = { id: v4(), name, age, email };
  allUsers.push(newUser);
  await updateListUsers(allUsers);
  return newUser;
};

module.exports = addUser;
