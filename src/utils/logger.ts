import winston, { format } from 'winston';

const levels = {
    severe: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    verbose: 5,
    debug: 6,
};

const logFormat = format.combine(format.json(), format.prettyPrint());

export const logger = winston.createLogger({
    levels,
    format: logFormat,
    transports: [new winston.transports.Console()],
});
