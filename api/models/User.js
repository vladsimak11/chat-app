const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {versionKey: false, timestamps: true});

const User = model("user", UserSchema);

module.exports = {
  User,
}

