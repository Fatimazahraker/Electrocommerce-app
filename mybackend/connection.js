require('dotenv').config();

const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database using the provided environment variables.
 * Environment Variables:
 *   - MONGO_USERNAME: String (required) - MongoDB username
 *   - MONGO_PW: String (required) - MongoDB password
 * Connection String Format:
 *   - mongodb+srv://<username>:<password>@cluster0.ladaigl.mongodb.net/Electrocommerce?retryWrites=true&w=majority&appName=Cluster0
 *   - The connection string includes the username, password, database name (Electrocommerce), and MongoDB cluster details.
 *   - The appName parameter is optional.
 *   - This function catches any connection errors and logs them to the console.
 */
const connectionStr = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.ladaigl.mongodb.net/Electrocommerce?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(connectionStr, { useNewUrlParser: true })
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log(err));

mongoose.connection.on('error', err => {
    console.log(err);
});
