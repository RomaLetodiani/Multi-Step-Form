import mongoose from 'mongoose';

const ConnectMongoDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI || '')
      .then(() => console.log('Connected to MongoDB'))
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        // Consider throwing an error to halt server startup if connection is critical.
        process.exit(1);
      });
  } catch (error) {
    console.error('Unexpected error during MongoDB connection:', error);
  }
};
export default ConnectMongoDB;
