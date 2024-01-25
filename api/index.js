const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/auth');
const testRouter = require('./routes/test');

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.use('/', authRouter);
app.use('/', testRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message, })
});

module.exports = app;