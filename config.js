// create LINE SDK config from env variables
const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    verify: false,
  };
  
  module.exports = config;