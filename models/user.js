const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchemaJoi = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().required(),
});

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
});

const User = model("user", userSchema);

module.exports = { User, userSchemaJoi };
