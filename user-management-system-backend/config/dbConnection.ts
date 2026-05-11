import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log('DB Connected Successfully');
    }
    catch(error){
        console.log('Error while connecting to DB',error);
        process.exit(1);
    }
}