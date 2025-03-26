const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  platform: String, // YouTube, Twitter, etc.
  data: String, // Form data
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});



module.exports = mongoose.model('Form', formSchema);
