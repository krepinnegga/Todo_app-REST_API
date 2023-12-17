import mongoose from "mongoose";
require('dotenv').config();

const connectToDatabase = async () => {
    try {
       const conncetion = await mongoose.connect(process.env.DB_CONNECTION_STRING) 
        if (conncetion) {
            console.log("Database connection established");
        }
    } catch (error) {
        console.log("error connecting to database", error)
        throw error;
    }
}

export default connectToDatabase;