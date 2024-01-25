const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const { SECRET_KEY } = process.env;

const register = async(req, res, next) => { 
  const {username, password} = req.body;

  try {
    const createdUser = await User.create({username, password});

    jwt.sign({userId: createdUser._id }, SECRET_KEY, {}, (err, token) => {
      if(err) throw err;
      
      res.cookie('token', token).status(201).json('ok');
    });

  } catch (error) {
    next(error);
  }



}

module.exports = {
  register,
}