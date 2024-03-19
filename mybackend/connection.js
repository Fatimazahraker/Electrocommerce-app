require('dotenv').config();

const mongoose = require('mongoose');

const connectionStr = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.ladaigl.mongodb.net/Electrocommerce?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(connectionStr, {useNewUrlParser: true})
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

// Electrocommerce
// ZmTQtRtsZo5YxBra

mongoose.connection.on('error', err => {
    console.log(err)
  })