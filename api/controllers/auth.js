const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const register = async(req, res, next) => { 
  const {username, password} = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const createdUser = await User.create({...req.body, password: hashPassword,});

    jwt.sign({userId: createdUser._id, username }, SECRET_KEY, {}, (err, token) => {
      if(err) throw err;
      
      res.cookie('token', token, {sameSite: 'none', secure: true}).status(201).json({
        id: createdUser._id,
        username,
      });
    });

  } catch (error) {
    next(error);
  }

}


const profile = async(req, res, next) => {
  try {
    const token = req.cookies?.token;
    jwt.verify(token, SECRET_KEY, {}, (err, userData) => {
      if(err) throw err;

      res.json(userData);
    })
  } catch (error) {
    next(error);
  }
}

const login = async(req, res, next) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if (user) {
      const passwordCompare = bcrypt.compare(password, user.password);
      if (passwordCompare) {
        jwt.sign({userId:user._id, username}, SECRET_KEY, {}, (err, token) => {
          res.cookie('token', token, {sameSite:'none', secure:true}).json({
            id: user._id,
          });
        });
      }
    }

  } catch (error) {
    next(error);
  }
}

const logout = async(req, res, next) => {
  try {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(204).json({ 
      message: "No Content" 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  profile,
  login,
  logout
}