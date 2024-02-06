const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/auth');

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.use('/api', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message, })
});

module.exports = app;