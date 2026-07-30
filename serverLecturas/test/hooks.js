import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/lecturasapp_test');
});

after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});