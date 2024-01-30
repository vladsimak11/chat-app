const {Schema, model} = require("mongoose");

const MessageSchema = new Schema({
  sender: {type: Schema.Types.ObjectId, ref: 'User'},
  recipient: {type: Schema.Types.ObjectId, ref: 'User'},
  text: String,
}, {timestamps:true});

const MessageModel = model('Message', MessageSchema);

module.exports = MessageModel;
