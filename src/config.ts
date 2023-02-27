function getConfigFromEnv(name: string, def?: string | number) {
    const value = process.env[name];
    if (!value && !def) {
        console.error(`Error: config ${name} is required`);
        process.exit(1);
    }
    return value || def;
}

const PORT = getConfigFromEnv('PORT', 5000);
const MONGO_USER = getConfigFromEnv('MONGO_USER');
const MONGO_PASSWORD = getConfigFromEnv('MONGO_PASSWORD');
const MONGO_COLLECTION = getConfigFromEnv('MONGO_COLLECTION', 'test');

export default {
    PORT,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_COLLECTION,
};
