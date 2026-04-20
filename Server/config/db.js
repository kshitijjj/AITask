import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const ConnectDB=async()=>{
    try {
        await mongoose.connect(process.env.mongodbURI);
        console.log("DB connected with the backend server");
    } catch (error) {
        console.log(error.message);
    }
}

export default ConnectDB;
