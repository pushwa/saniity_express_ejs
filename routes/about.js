const router = require('express').Router();
const client = require("../client");

router.get('/about', (req, res) => {
  client.assets
  .upload('image', fs.createReadStream('myImage.jpg'), {filename: 'myImage.jpg'})
  .then((document) => {
    console.log('The image was uploaded!', document)
  })
  .catch((error) => {
    console.error('Upload failed:', error.message)
  })
  
  res.render('about');
});

module.exports = router;
