const userModel = require("../models/user");
const { generateToken } = require("../utils/jwt");

async function loginUser(req, res) {
  const { username, password } = req.body;
  // return a Mongoose document
  const existingUser = await userModel.findOne({ username });
  if (!existingUser) {
    return res.status(400).send("Invalid username or password");
  }
  const validPassword = await existingUser.validatePassword(password);
  // if (existingUser.password !== password)
  if (!validPassword) {
    return res.status(400).send("Invalid username or password");
  }
  const token = generateToken(existingUser._id);
  return res.status(200).send({ username, token });
}

module.exports = {
  loginUser,
};
