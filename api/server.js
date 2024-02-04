const mongoose = require("mongoose");
const { Message } = require("./models/Message");
const WebSocketServer = new require('ws');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');

const app = require('./index');



const { DB_HOST, SECRET_KEY } = process.env;

mongoose.set('strictQuery', true);

const server = app.listen(3000);

mongoose.connect(DB_HOST)
  .then(() => {
      console.log("Database connection successful!")
  })
  .catch( error => {
    console.log(error.message);
    process.exit(1);
  });


  const wss = new WebSocketServer.Server({ server });

  wss.on('connection', (connection, req) => {

    function notifyAboutOnlinePeople() {
      [...wss.clients].forEach(client => {
        client.send(JSON.stringify({
          online: [...wss.clients].map(c => ({userId: c.userId, username: c.username})),
        }));
      });
    }

    connection.isAlive = true;

    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        notifyAboutOnlinePeople();
      }, 1000);
    }, 2000);
  
    connection.on('pong', () => {
      clearTimeout(connection.deathTimer);
    });

    const cookies = req.headers.cookie;
    if (cookies) {
      const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
      if (tokenCookieString) {
        const token = tokenCookieString.split('=')[1];
        if (token) {
          jwt.verify(token, SECRET_KEY, {}, (err, userData) => {
            if (err) throw err;
            const {userId, username} = userData;
            connection.userId = userId;
            connection.username = username;
          });
        }
      }
    }

    connection.on('message', async (message) => {
      const messageData = JSON.parse(message.toString());
      const {recipient, text, file} = messageData;

      let filename = null;

      if(file) {
        console.log('size', file.data.length);
        const parts = file.name.split('.');
        const ext = parts[parts.length - 1];
        filename = Date.now() + '.'+ext;
        const path = __dirname + '\\uploads\\' + filename;
        const bufferData = new Buffer(file.data.split(',')[1], 'base64');
        fs.writeFile(path, bufferData, () => {
        console.log('file saved:'+path);
      });
      }
    
      if(recipient && (text || file)) {
        const messageDoc = await Message.create({
          sender: connection.userId,
          recipient,
          text,
          file: file ? filename : null,
        });
        [...wss.clients].filter(c => c.userId === recipient).forEach(c => c.send(JSON.stringify({
          text, 
          sender: connection.userId,
          recipient,
          file: file ? filename : null,
          _id: messageDoc._id,
        })))
      }
    });

    notifyAboutOnlinePeople();
  });
