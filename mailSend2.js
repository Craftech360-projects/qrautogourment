const fs = require('fs');
// const data = require('./data1.json');
// const data = require('./data4.json');
// const data = require('./data5.json');
// const data = require('./data3.json');
const data = require('./addon.json');
// const data=[{
//   name:"Amar Jog",
//   phoneNumber:"",
//   emailId:"amarjog@gmail.com",
//   code:"GL23EF2725"
// },
// {
//   name:"Kushal shetty",
//   phoneNumber:"",
//   emailId:"kushal@foodiesindia.com",
//   code:"GL23EF2726"
// }

// {
//   name:"Mr Kapoor",
//   phoneNumber:"9821046055",
//   code:"GL23EF1912"
// },
// {
//   name:"Dear Mazar",
//   phoneNumber:"9821222599",
//   code:"GL23EF1913"
// }
// ]
const logger = require('./logger');
logger.log('This is a log message.');
for (let index = 3; index < 11 ; index++) {
  var people= data[index];
  const { name, emailId, code } = people;
  const dynamicImageUrl = `https://github.com/Craftech360-projects/qrautogourment/blob/main/images/${code}.png?raw=true`;

  var htmlString =
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
}</style><style type="text/css"></style></head><body style="word-spacing:normal;"><div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:500px;"><img alt="Full Screen Image" src="https://github.com/Craftech360-projects/qrautogourment/blob/main/images/${code}.png?raw=true" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="500" height="auto"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`

console.log(htmlString);
const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
  'f8c199da7a532fcb35fc83fce0e9ec55',
  '60d75ea08bc4ff13fa68f30b531d6942',
);
const request = mailjet.post('send', { version: 'v3.1' }).request({
  Messages: [
    {
      From: {
        Email: 'rsvp@eventfaqs.com',
        Name: 'GOURMET LUXE 2023',
      },
      To: [
        {
          Email: emailId,
          Name: name,
        },
      ],
      Subject: 'Your Ticket to Gourmet Luxe 2023: See You Today',
      HTMLPart:  htmlString ,
    },
  ],
});

request.then(x=>{
  console.log(x.body);
  logger.log(name);
  logger.log(emailId);
  logger.log(JSON.stringify(x.body));
}
  ).catch(err=>{
    console.log(err);
  })
};