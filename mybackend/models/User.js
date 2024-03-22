const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: [true, 'is required'],
    unique: true,
    validate: {
      validator: function(str){
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
      },
      message: props => `${props.value} is not a valid email`
    }
  },

  password: {
    type: String,
    required: [true, 'is required']
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  cart: {
    type: Object,
    default: {
      total: 0,
      count: 0
    }
  },

  notifications: {
    type: Array,
    default: []
  },

  orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]

});


//before saving => hash the password
UserSchema.pre('save', function (next) {

  const user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);

      user.password = hash;
      next();
    })

  })

})

UserSchema.pre('remove', function(next){
  this.model('Order').remove({owner: this._id}, next);
})


const User = mongoose.model('User', UserSchema);

module.exports = User;