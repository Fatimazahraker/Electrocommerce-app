const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for a user
const UserSchema = mongoose.Schema({
  // Name of the user
  name: {
    type: String,
    required: true // Name is required
  },
  // Email of the user
  email: {
    type: String,
    required: [true, 'Email is required'], // Email is required
    unique: true, // Email should be unique
    validate: {
      // Validate email format using a regular expression
      validator: function(str) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  // Password of the user
  password: {
    type: String,
    required: [true, 'Password is required'] // Password is required
  },
  // Flag indicating whether the user is an admin
  isAdmin: {
    type: Boolean,
    default: false // Default value for isAdmin is false
  },
  // Cart of the user
  cart: {
    type: Object,
    default: {
      total: 0,
      count: 0
    }
  },
  // Notifications for the user
  notifications: {
    type: Array,
    default: [] // Default value for notifications is an empty array
  },
  // Orders associated with the user
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }]
});

// Before saving the user document, hash the password
UserSchema.pre('save', function(next) {
  const user = this;
  // Check if password has been modified
  if (!user.isModified('password')) return next();
  // Generate a salt and hash the password
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Before removing the user, remove associated orders
UserSchema.pre('remove', function(next) {
  this.model('Order').remove({ owner: this._id }, next);
});

// Create a model using the schema
const User = mongoose.model('User', UserSchema);

// Export the model for use in other files
module.exports = User;
