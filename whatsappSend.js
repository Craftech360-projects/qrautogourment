const fs = require('fs');
const logger = require('./logger');
logger.log('This is a log message.');

for (let index = 200; index <222; index++) {
  // var detectPhonenumber = require('detect-phonenumber');
  let data = require('./data4.json');
  var people = data[index];
  const { name, emailId, code, phoneNumber } = people;
  if(phoneNumber) {
  const dynamicImageUrl = `https://github.com/Craftech360-projects/qrautogourment/blob/main/images/${code}.png?raw=true`;

  // var https = require('follow-redirects').https;

  const axios = require('axios');
  let data1 = {
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2IwZDMwMTE5N2FjNDY0YzA3ZTUwYiIsIm5hbWUiOiJDcmFmdGVjaDM2MCIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NTNiMGQzMDExOTdhYzQ2NGMwN2U1MDUiLCJhY3RpdmVQbGFuIjoiQkFTSUNfTU9OVEhMWSIsImlhdCI6MTY5ODM2ODgxNn0.D4J5c6TI2m8HRpDWTD0bI238BwRvtg4GrGcn28-Wg1U",
    campaignName: "abilash s",
    destination:  `${phoneNumber}`,
    userName: name,
    templateParams: [
      name
    ],
    media: {
      url: dynamicImageUrl,
      filename: "demo-file"
    }
  };

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://backend.aisensy.com/campaign/t1/api',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data1
  };


  console.log(config);
  axios.request(config)
    .then((response) => {
      logger.log(JSON.stringify(response.data));
      logger.log(phoneNumber);
      logger.log(name);
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  };
}