const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const port = process.env.PORT || 5000;

// Require the connection to the MongoDB database
require('./connection');

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: '*', // Allow all origins for CORS
    methods: '*' // Allow all HTTP methods
});

// Require the User model and route files
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/ProductRoutes');
const imageRoutes = require('./routes/imageRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Register routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/images', imageRoutes);

app.post('/create-payment', async(req, res)=> {
    const {amount} = req.body;
    console.log(amount);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card']
      });
      console.log(amount);
      res.status(200).json(paymentIntent)
    } catch (e) {
      console.log(e.message);
      res.status(400).json(e.message);
     }
  })

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export the app for testing or integration with other modules
module.exports = app;
