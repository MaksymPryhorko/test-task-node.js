const fs = require("fs").promises;
const path = require("path");

const usersPath = path.resolve("db", "users.json");

const updateListUsers = async (user) => {
  await fs.writeFile(usersPath, JSON.stringify(user));
};

module.exports = updateListUsers;
