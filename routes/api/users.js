const express = require("express");
const { HttpError } = require("../../helpers/");
const users = require("../../models/");
const { validateBody } = require("../../middlewares");

const router = express.Router();

router.get("/users", async (req, res, next) => {
  try {
    const results = await users.getAllUsers();
    if (!results) {
      throw HttpError(404, "Not found");
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.post("/addUser", async (req, res, next) => {
  console.log(req.body);
  try {
    const results = await users.addUser(req);
    if (!results) {
      throw HttpError(404, "Not found");
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
