'use strict';
require('dotenv').config()
const line = require('@line/bot-sdk')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const config = require('./config.js');
const webhookHandler = require('./handler/webhook');

// listen on port
const port = process.env.PORT || 4000

// create Express app
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
// app.post('/webhook', line.middleware(configBot), (req, res) => res.sendStatus(200))
app.post('/webhook', line.middleware(config), webhookHandler);

app.listen(port)
