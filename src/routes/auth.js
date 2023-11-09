const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
