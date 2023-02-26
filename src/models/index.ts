import mongoose from 'mongoose';
import config from '../config';

export async function connectDB() {
    const uri = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.fnpieiy.mongodb.net/test?retryWrites=true&w=majority`;

    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, { family: 4 });
}
