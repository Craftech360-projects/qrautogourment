const fs = require('fs');
const data = require('./data.json');
const QRCode = require('qrcode');

const outputDirectory = './images';
const qrcodeDirectory = './qrcode';
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

let codeNumber = 4;
let peopleCollection = []

data.forEach(async (message)=>{
  for (let index = 0; index < data.length; index++) {
    let item = data[index];
    const { name, phoneNumber, email } = item;
    codeNumber++;
    const code = `GL23EF${codeNumber.toString().padStart(4, '0')}`;    
    const personData = {index, name, phoneNumber, email, code, isAttended: false };
    peopleCollection.push(personData);
  }
});

const jsonData = JSON.stringify(peopleCollection, null, 2); // The second argument is for pretty-printing with 2 spaces of indentation.

fs.writeFileSync("data1.json", jsonData);