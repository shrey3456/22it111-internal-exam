import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://22it111:shrey123@cluster0.i02l0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log("Connected with mongodb");
  } catch (error) {
    console.error(`Error while connecting with database: ${error.message}`);
  }
};

export default connectDb;
