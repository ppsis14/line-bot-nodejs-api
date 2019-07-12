'use strict';
require('dotenv').config()
const line = require('@line/bot-sdk')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const config = require('./config.js');
const webhookHandler = require('./handlers/webhookHandler.js');

// listen on port
const port = process.env.PORT || 4000

// create Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// register a webhook handler with middleware
// app.post('/webhook', line.middleware(configBot), (req, res) => res.sendStatus(200))
app.post('/webhook', line.middleware(config), webhookHandler);

app.listen(port)
