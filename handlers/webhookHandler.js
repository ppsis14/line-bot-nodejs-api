const line = require('@line/bot-sdk');
// const config = require('./config.js');

// create LINE SDK client
const client = new line.Client({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    verify: true,
});

const webhook = (req, res) => {
    // console.log(`User id: ${req.body.events[0].source.userId}`);
    res.sendStatus(200)
    return Promise
    .all(req.body.events.map(handleEvent))
    .catch((err) => {
        console.error(err + "handlerEnvet not pass");
        res.status(503).end();
    });
};

// event handler
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return Promise.resolve(null);
    }
  
    // create a echoing text message
    const echo = { type: 'text', text: event.message.text + "pooh" };
  
    // use reply API
    return client.replyMessage(event.replyToken, echo);
}

module.exports = webhook;