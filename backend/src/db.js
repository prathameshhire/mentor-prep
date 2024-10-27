import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI

const connectToMongo = async () => {
    try {
        const options = {};
        await mongoose.connect(MONGODB_URI, options);
        console.log('Connected to Database');
    } catch (error) {
        console.log('MongoDB connection error : ', error);
        process.exit(1);
    }
}

export default connectToMongo;
