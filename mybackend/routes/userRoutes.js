const router = require('express').Router();
const User = require('../models/User');
// signup

router.post('/signup', async(req, res) => {
  const {name, email, password} = req.body;

  try {
    const findUser = await User.findOne({email});
    if (findUser) {
      return res.status(400).send('Email already exists');
    }
    const user = await User.create({name, email, password});
    res.json(user);
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// login

router.post('/login', async(req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    res.json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})


module.exports = router;
