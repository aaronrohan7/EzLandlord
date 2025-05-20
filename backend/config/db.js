const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'EzLandLord'
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Log when the connection is lost
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Log when the connection is reconnected
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

    // Log any errors that occur after initial connection
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;