// process.on(‘uncaughtException’) to catch unhandled exceptions, and
// process.on(‘unhandledRejection’) to catch rejected promises.
// should log the exception and exit the process,
// because the process may be in an unclean state
// In production, use a process manager to automatically restart a Node process.

const winston = require('winston')
require('winston-mongodb')
require('express-async-errors');

module.exports = function () {
    process.on('uncaughtException', (ex) => {
       console.log('we got an uncaughtException');
       winston.error(ex.message, ex)
       // process.exit(1)
    })

    process.on('unhandledRejection', (ex) => {
       console.log('we got an unhandled rejection');
       winston.error(ex.message, ex)
       // process.exit(1)
    })


    const logger = winston.createLogger({
       level: 'info',
       format: winston.format.json(),
       transports: [
           new winston.transports.File({filename: 'error.log', level: 'error'}),
           new winston.transports.File({ filename: 'combined.log' }),
           // new winston.transports.MongoDB({db: 'mongodb://localhost:27017/movie'})
       ],
       exceptionHandlers: [
           new winston.transports.File({filename: 'exceptions.log'})
       ]
    })

    if (process.env.NODE_ENV !== 'production') {
       logger.add(new winston.transports.Console({
           format: winston.format.simple()
       }))
    }
}
