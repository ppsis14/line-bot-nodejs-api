'use strict';

const line = require('@line/bot-sdk')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
// listen on port
const port = process.env.PORT || 4000
require('dotenv').config()

// create LINE SDK config from env variables
const configBot = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(configBot);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(configBot), (req, res) => res.sendStatus(200))

// => {
//   Promise
//     .all(req.body.events.map(handleEvent))
//     .then((result) => res.json(result))
//     .catch((err) => {
//       console.error(err);
//       res.status(5003).end();
//     });
// });

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

app.listen(port)

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.post('/webhook', (req, res) => res.sendStatus(200))

