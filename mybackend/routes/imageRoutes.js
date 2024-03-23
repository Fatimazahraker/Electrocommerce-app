const cloudinary = require('cloudinary');
const router = require('express').Router();
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})


// Handle preflight OPTIONS request
router.options('/:public_id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).send();
});

router.delete('/:public_id', async(req, res)=> {
  const {public_id} = req.params;
  try {
     
      await cloudinary.uploader.destroy(public_id);
      res.status(200).send();
  } catch (e) {
      res.status(400).send(e.message)
  }
  console.log('Deleting Image Public ID:', public_id);
})


module.exports = router;