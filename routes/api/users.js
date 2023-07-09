const express = require("express");
const { HttpError } = require("../../helpers/");
const users = require("../../models/");
const { validation } = require("../../middlewares");
const { userSchema } = require("../../schemas");

const router = express.Router();

router.get("/users", async (req, res, next) => {
  try {
    const results = await users.getAllUsers();
    if (!results) {
      throw new HttpError(404, "Not found");
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.post("/addUser", async (req, res, next) => {
  try {
    const { error } = validation(userSchema);
    if (error) {
      throw new HttpError(404, error.message);
    }
    const results = await users.addUser(req.body);
    if (!results) {
      throw new HttpError(404, "Not found");
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
