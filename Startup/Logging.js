const winston = require('winston');
require('winston-mongodb');
const Logger =winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'Errors.log',
            level: 'info'
        })
    ]
});
winston.exceptions.handle(
    new winston.transports.File({
        filename: 'uncaughtExceptions.log',
        level: 'info'
    }),
);
process.on('unhandledRejection', (ex) => {
    throw ex;
});

module.exports=Logger;


