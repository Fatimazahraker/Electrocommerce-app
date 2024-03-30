const mongoose = require('mongoose');

// Define the schema for a product
const ProductSchema = mongoose.Schema({
    // Name of the product
    name: {
        type: String,
        required: [true, "Name can't be blank"] // Name is required
    },
    // Description of the product
    description: {
        type: String,
        required: [true, "Description can't be blank"] // Description is required
    },
    // Price of the product
    price: {
        type: String,
        required: [true, "Price can't be blank"] // Price is required
    },
    // Category of the product
    category: {
        type: String,
        required: [true, "Category can't be blank"] // Category is required
    },
    // Array of picture URLs for the product
    pictures: {
        type: Array,
        required: [true, "Pictures can't be blank"] // Pictures are required
    }
}, { minimize: false });

// Create a model using the schema
const Product = mongoose.model('Product', ProductSchema);

// Export the model for use in other files
module.exports = Product;
