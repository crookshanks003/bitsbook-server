import 'reflect-metadata';
import { connectDB } from './models';
import { createApp } from './app';
import config from './config';

function main() {
    connectDB()
        .then(() => {
            console.log('Connected to mongoDB');
            const app = createApp();
            app.listen(process.env.PORT || 5000, async () => {
                console.log(`\nserver started on ${config.PORT}`);
            });
        })
        .catch((err) => {
            console.error(err);
        });
}

main();
