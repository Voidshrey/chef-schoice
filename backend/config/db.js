import mongoose from 'mongoose';

async function connectDB() {
    try {
      let conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`DB connected on ${conn.connection.host}`);
    } catch (error) {
      console.log(error.message);
    }
  }

export default connectDB;