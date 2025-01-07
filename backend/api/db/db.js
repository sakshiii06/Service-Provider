const mongoose = require('mongoose');
const { Provider } = require('../models/provider');

// Connection URI to MongoDB
const uri = 'mongodb://127.0.0.1:27017/provider_db';

mongoose.set('strictQuery', true);

// Connect to the database
mongoose
  .connect(uri, { useUnifiedTopology: true })
  .then(() => {
    console.log('Successful Connection!!');
    // Generate a unique id
    const uniqueId = Math.floor(Math.random() * 1000000);
    // Create a provider
   
  })
  .then((result) => {
    console.log('Provider created:', result);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });

module.exports = Provider;
