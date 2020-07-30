const { customerModel } = require("../models/customer");
const { generateToken } = require("../utils/jwt");
const Joi = require("joi");

async function loginCustomer(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;

  const existingUser = await customerModel.findOne({ username });
  if (!existingUser) {
    return res.status(400).json("Invalid username or password");
  }

  const validPassword = await existingUser.validatePassword(password);
  if (!validPassword) {
    return res.status(400).json("Invalid username or password");
  }

  const token = generateToken(existingUser._id, existingUser.isAdmin);
  return res.status(201).json({ token, username });
}

function validate(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().required().min(3).max(1024),
  });
  return schema.validate(req);
}

module.exports = {
  loginCustomer,
};
