const express = require("express");
const { ctrlWrapper } = require("../../helpers/");
const { getAllUsers, addUser } = require("../../controllers");
const { validateBody } = require("../../middlewares");
const { userSchemaJoi } = require("../../models/user");

const router = express.Router();

router.get("/users", ctrlWrapper(getAllUsers));

router.post("/addUser", validateBody(userSchemaJoi), ctrlWrapper(addUser));

module.exports = router;
