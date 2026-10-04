const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/telugu_wedding_db';
    
    // Check if placeholder is still present
    if (mongoUri.includes('<username>') || mongoUri.includes('<password>')) {
      console.warn('\n⚠️ [MongoDB Atlas Warning]: Default placeholder found in MONGO_URI.');
      console.warn('👉 Please update .env with your MongoDB Atlas credentials (cluster0.htde3ft.mongodb.net).');
      console.warn('⚡ In the meantime, the application will run in In-Memory / Fallback mode so RSVPs and features work seamlessly!\n');
      return false;
    }

    const conn = await mongoose.connect(mongoUri);
    isConnected = true;
    console.log(`✨ [MongoDB Connected]: ${conn.connection.host} / Database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error(`❌ [MongoDB Connection Error]: ${error.message}`);
    console.warn('⚡ Operating in in-memory fallback mode for local testing without Atlas connectivity.');
    return false;
  }
};

const isDbConnected = () => isConnected;

module.exports = { connectDB, isDbConnected };
