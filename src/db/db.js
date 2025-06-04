import dotenv from 'dotenv';
import mongoose from 'mongoose';
import 'dotenv/config'

 const dbConnection = async () => {
  try {
 const res =  await mongoose.connect(`${process.env.MONGODB_URI}`);
  
console.log(`MongoDB connected || Hosted on ${res.connection.host} `);

  } catch (error) {
    console.error("MongoDB Connection Error : ", error);
    // throw error;
    process.exit(1);
  }
};
export default dbConnection;