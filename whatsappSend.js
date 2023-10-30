const fs = require('fs');
const data = require('./data1.json');
const logger = require('./logger');
logger.log('This is a log message.');

for (let index = 0; index < 1; index++) {
  var people= data[index];
  const { name, email, code, phoneNumber } = people;

  const dynamicImageUrl = `https://github.com/Craftech360-projects/qrautogourment/blob/main/images/${code}.png?raw=true`;

  var https = require('follow-redirects').https;

var options = {
  'method': 'POST',
  'hostname': 'backend.aisensy.com',
  'path': '/campaign/t1/api',
  'headers': {
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  "apiKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2IwZDMwMTE5N2FjNDY0YzA3ZTUwYiIsIm5hbWUiOiJDcmFmdGVjaDM2MCIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NTNiMGQzMDExOTdhYzQ2NGMwN2U1MDUiLCJhY3RpdmVQbGFuIjoiQkFTSUNfTU9OVEhMWSIsImlhdCI6MTY5ODM2ODgxNn0.D4J5c6TI2m8HRpDWTD0bI238BwRvtg4GrGcn28-Wg1U",
  "campaignName": "Gourmet Luxe 2023",
  "destination": phoneNumber,
  "userName": name,
  "templateParams": [
    name
  ],
  "media": {
    "url": dynamicImageUrl,
    "filename": "demo-file"
  }
});

req.write(postData);

req.end();

};