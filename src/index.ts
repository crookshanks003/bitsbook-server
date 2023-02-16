import dotenv from 'dotenv';
import { createApp } from './app';
import config from './config';

function main() {
    dotenv.config();

    const app = createApp();
    app.listen(config.PORT, async () => {
        console.log(`\nserver started on ${config.PORT}`);
    });
}

main();
