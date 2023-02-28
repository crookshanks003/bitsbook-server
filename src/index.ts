import { connectDB } from './models';
import { createApp } from './app';
import config from './config';
import 'reflect-metadata';

function main() {
    connectDB()
        .then(() => {
            console.log('Connected to mongoDB');
            const app = createApp();
            app.listen(config.PORT, async () => {
                console.log(`\nserver started on ${config.PORT}`);
            });
        })
        .catch((err) => {
            console.error(err);
        });
}

main();
