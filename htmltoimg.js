const nodeHtmlToImage = require('node-html-to-image');
const fs = require('fs');
const data = require('./birjus.json');
const QRCode = require('qrcode');



const outputDirectory = './images';
const qrcodeDirectory = './qrcode';
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

if (!fs.existsSync(qrcodeDirectory)) {
  fs.mkdirSync(qrcodeDirectory);
}

let codeNumber = 2726;
let peopleCollection = []

const generateImages = async () => {
  for (let index = 0; index < data.length; index++) {

    let item = data[index];
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
    top: 35%;
    left: 21%;
    max-width: 550px;
    white-space: normal;
  }

  
  #name {
    font-size: xx-large;
    color: white;
  }

    #qrimg {
      position: absolute;
      top: 41%;
      left: 20%;
      width: 130px
    }

   

    #code {
      position: absolute;
      top: 54%;
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
  var imageString = `https://raw.githubusercontent.com/Craftech360-projects/qrautogourment/main/images/{{code}}.png?raw=true`;


    var htmlString=
    `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>GOURMETLUXE</title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
    body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
    table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
    img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
    p { display:block;margin:13px 0; }</style><!--[if mso]>
  <noscript>
  <xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
  </xml>
  </noscript>
  <![endif]--><!--[if lte mso 11]>
  <style type="text/css">
    .mj-outlook-group-fix { width:100% !important; }
  </style>
  <![endif]--><style type="text/css">@media only screen and (min-width:480px) {
      .mj-column-per-100 { width:100% !important; max-width: 100%; }
    }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:479px) {
    table.mj-full-width-mobile { width: 100% !important; }
    td.mj-full-width-mobile { width: auto !important; }
  }</style><style type="text/css"></style></head><body style="word-spacing:normal;"><div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:500px;"><img alt="Full Screen Image" src="https://github.com/Craftech360-projects/qrautogourment/blob/main/images/GL23EF0001.png?raw=true" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="500" height="auto"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`
  const Mailjet = require('node-mailjet');
  const mailjet = Mailjet.apiConnect(
    'f8c199da7a532fcb35fc83fce0e9ec55',
    '60d75ea08bc4ff13fa68f30b531d6942',
  );


  // const request = mailjet
  //         .post('send', { version: 'v3.1' })
  //         .request({
  //           Messages: [
  //             {
  //               From: {
  //                 Email: "abilash@craftech360.com",
  //                 Name: "abilash"
  //               },
  //               To: [
  //                 {
  //                   Email: "sanjay@craftech360.com",
  //                   Name: "passenger 1"
  //                 }
  //               ],
  //               Subject: "Your email flight plan!",
  //               HTMLPart: htmlString,

  //             }
  //           ]
  //         })

  // request
  //     .then((result) => {
  //         console.log(result.body)
  //     })
  //     .catch((err) => {
  //         console.log(err.statusCode)
  //     })


  // peopleCollection.forEach(async (person) => {

// FOR MAIL SENDING IN LOOP 

  //   const { name, email, code } = person;
  //   const dynamicImageUrl = `https://github.com/Craftech360-projects/qrautogourment/blob/main/images/${code}.png?raw=true`;


  //   var htmlString =
  //     `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>GOURMETLUXE</title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
  //   body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
  //   table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
  //   img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
  //   p { display:block;margin:13px 0; }</style><!--[if mso]>
  // <noscript>
  // <xml>
  // <o:OfficeDocumentSettings>
  //   <o:AllowPNG/>
  //   <o:PixelsPerInch>96</o:PixelsPerInch>
  // </o:OfficeDocumentSettings>
  // </xml>
  // </noscript>
  // <![endif]--><!--[if lte mso 11]>
  // <style type="text/css">
  //   .mj-outlook-group-fix { width:100% !important; }
  // </style>
  // <![endif]--><style type="text/css">@media only screen and (min-width:480px) {
  //     .mj-column-per-100 { width:100% !important; max-width: 100%; }
  //   }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:479px) {
  //   table.mj-full-width-mobile { width: 100% !important; }
  //   td.mj-full-width-mobile { width: auto !important; }
  // }</style><style type="text/css"></style></head><body style="word-spacing:normal;"><div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:500px;"><img alt="Full Screen Image" src="https://github.com/Craftech360-projects/qrautogourment/blob/main/images/${code}.png?raw=true" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="500" height="auto"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`


  //   async function sendMail() {
  //     console.log(`logging at async ${String(code)}, ${String(name)}, ${String(email)}`);

  //     var result = mailjet
  //       .post('send', { version: 'v3.1' })
  //       .request({
  //         Messages: [
  //           {
  //             From: {
  //               Email: "rsvp@eventfaqs.com",
  //               Name: "GOURMET LUXE 2023"
  //             },
  //             To: [
  //               {
  //                 Email: `${email}`,
  //                 Name: `${name}`
  //               }
  //             ],
  //             Subject: "Your Ticket to Gourmet Luxe 2023: See You tomorrow!",
  //             HTMLPart: htmlString,

  //           }
  //         ]
  //       });
  //     return result;
  //   }


  //   try {
  //     await sendMail().then((result) => {
  //       console.log(JSON.stringify(result));
  //       console.log("indside the try block");
  //       console.log(`Email sent successfully to ${String(name)} (${String(email)}):${result}`);
  //     })
  //       .catch(err => {
  //         console.log("inside the try's catch block");
  //         console.log(`error in catch block${err}`);
  //       });

  //   } catch (err) {
  //     console.error(`Error sending email to ${name} (${email}): ${err.statusCode}`);
  //   }

  //   // send whatsapp
  // })
});





// For name 

{/*     <div id="name-container" class="flex flex-wrap"><p id="name" class="">Kushal shetty</p></div> */}