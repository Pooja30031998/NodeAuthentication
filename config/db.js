import mongoose from "mongoose";

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Mongodb connected using mongoose");
  } catch (err) {
    console.log("Error while connecting to db");
    console.log(err);
  }
};
