const nodeHtmlToImage = require('node-html-to-image');
const fs = require('fs');
const data = require('./data.json');
const QRCode = require('qrcode');

const outputDirectory = './images';
const qrcodeDirectory = './qrcode';
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}
if (!fs.existsSync(qrcodeDirectory)) {
  fs.mkdirSync(qrcodeDirectory);
}

let codeNumber = 0;
let peopleCollection = []
console.log("people collection is", peopleCollection);

const generateImages = async () => {
  for (let index = 0; index < data.length; index++) {
    let item= data[index];
    const { name, phoneNumber, email } = item;
    codeNumber++;
    const code = `GL23EF${codeNumber.toString().padStart(4, '0')}`;

    const qrCodeData = code;
    // const qrCodePath = `${qrcodeDirectory}/${code}.png`; 
    const qrCodePath = `${__dirname}/qrcode/${code}.png`;
    console.log(qrCodePath);
    await QRCode.toFile(qrCodePath, qrCodeData);

    const image = fs.readFileSync('./emailimage.jpg');
    const base64Image = Buffer.from(image).toString('base64');
    const dataURI = 'data:image/jpeg;base64,' + base64Image;



    const qrCodeImage = fs.readFileSync(`${qrCodePath}`);
    const qrCodxebase64Image = Buffer.from(qrCodeImage).toString('base64');
    const qrCodedataURI = 'data:image/jpeg;base64,' + qrCodxebase64Image;


    const htmlContent = `
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <title>emailimage</title>
  <style>

  #name-container {
    position: absolute;
    top: 37%;
    left: 20%;
    max-width: 250px;
    white-space: normal;
  }

  
  #name {
    font-size: x-large;
    color: white;
  }

    #qrimg {
      position: absolute;
      top: 42%;
      left: 20%;
      width: 130px
    }

   

    #code {
      position: absolute;
      top: 55%;
      left: 22%;
      color: white;
      font-size: large;
    }
  </style>
</head>

<body>
  <div id="htmltoimage">


    <img src="${dataURI}" alt="no image" class="">
    <img src="${qrCodedataURI}" class="" id="qrimg">

    <div id="name-container" class="flex flex-wrap"><p id="name" class="">${name}</p></div>
    <div class="flex flex-wrap"><p id="code" class="" >${code}</p></div>
  </div>
  <!-- <script src=" ./app.js">
      </script> -->
</body>

</html>`

    try {
      await nodeHtmlToImage({
        output: `${outputDirectory}/${code}.png`,
        html: htmlContent,
      });




      console.log(`Image ${index + 1} for ${name} with code ${code} was created successfully!`);

      const personData = { name, phoneNumber, email, code, isAttended: false };
      peopleCollection.push(personData);



    } catch (error) {
      console.error(`Error generating image for ${name}:`, error);
    }



  }

};

generateImages().then(() => {
  console.log("All images generated successfully");
  console.log("Final people collection:", peopleCollection);
  peopleCollection.forEach(person=>{
    //send mail 


    // send whatsapp
  })
});