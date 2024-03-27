// Import required modules
const cloudinary = require('cloudinary');
const router = require('express').Router();
require('dotenv').config();

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Define a route to handle image deletion
router.delete('/:public_id', async (req, res) => {
  // Extract the public_id of the image from the request parameters
  const { public_id } = req.params;
  try {
    // Delete the image from Cloudinary using the public_id
    await cloudinary.uploader.destroy(public_id);
    // Send a success response
    res.status(200).send();
  } catch (e) {
    // If an error occurs during deletion, send an error response
    res.status(400).send(e.message);
  }
});

// Export the router for use in other files
module.exports = router;
