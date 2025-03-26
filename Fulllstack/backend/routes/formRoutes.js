const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const jwt = require('jsonwebtoken');

router.post('/submit', async (req, res) => {
  const { token, platform, data } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const form = new Form({ platform, data, user: decoded.id });
    await form.save();
    res.json({ message: 'Form submitted successfully' });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

router.get('/user-forms', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];  // Safely check for authorization header
  
  if (!token) {
    return res.status(400).json({ message: 'Token is missing' });  // Handle case where token is not present
  }

  try {
    // Decode token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch forms submitted by the user
    const forms = await Form.find({ user: decoded.id });

    if (forms.length === 0) {
      return res.status(404).json({ message: 'No forms found for this user' });
    }


    res.json(forms);  // Send back the forms
  } catch (err) {
    // Handle errors such as invalid token
    console.error(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
});


module.exports = router;
