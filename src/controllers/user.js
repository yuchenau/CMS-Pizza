const userModel = require('../models/user');
const { 
    generateToken
 } = require('../utils/jwt');

async function addUser(req, res) {
    const { username, password } = req.body;
    const existingUser = await userModel.findOne({username});
    if (existingUser) {
        return res.status(400).send('Username already exists');
    }
    const user = new userModel({
        username, 
        password
    });
    await user.hashPassword();
    await user.save();
    const token = generateToken(user._id);
    // return only username and token
    return res.status(201).send({username, token});
}

module.exports = {
    addUser
}