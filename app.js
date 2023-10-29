var htmlToImage = require('html-to-image');

const elementToCapture = document.getElementById('htmltoimage'); 
htmlToImage.toPng(elementToCapture)
  .then(function (dataUrl) {
    const img = new Image();
    img.src = dataUrl;
    document.body.appendChild(img); 
  })
  .catch(function (error) {
    console.error('Error capturing image:', error);
  });
