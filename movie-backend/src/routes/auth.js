const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./src/models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).send('User registered');
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, 'secretKey'); // Use a secure key
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

module.exports = router;