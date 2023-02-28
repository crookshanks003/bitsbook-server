import mongoose, { Query } from 'mongoose';
import config from '../config';

export async function connectDB() {
    const uri = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.fnpieiy.mongodb.net/${config.MONGO_COLLECTION}?retryWrites=true&w=majority`;

    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, { family: 4 });
}

//execute multiple queries in a transaction
export async function execTransaction(...queries: Query<any, any>[]) {
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(() =>
            Promise.all(queries.map((query) => query.session(session))),
        );
    } catch (error) {
        throw error;
    } finally {
        session.endSession();
    }
}

export * from './users';
export * from './clubs';
export * from './clubRoles';
