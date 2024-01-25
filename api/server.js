const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const app = require('./index');

const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful!")
    });
  })
  .catch( error => {
    console.log(error.message);
    process.exit(1);
  });