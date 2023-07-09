const fs = require("fs").promises;
const path = require("path");

const usersPath = path.resolve("db", "users.json");

const getAllUsers = async () => {
  const data = await fs.readFile(usersPath);
  const users = JSON.parse(data);
  return users;
};

module.exports = getAllUsers;
