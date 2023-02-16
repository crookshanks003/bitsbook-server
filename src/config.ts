function getConfigFromEnv(name: string, def?: string | number) {
    const value = process.env[name];
    if (!value && !def) throw new Error(`config ${name} is required`);
    return value || def;
}

const PORT = getConfigFromEnv('PORT', 5000);

export default {
    PORT,
};
