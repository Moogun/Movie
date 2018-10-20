require('express-async-errors');
const winston = require('winston')
require('winston-mongodb')
const error = require('./middlewares/error')

const config = require('config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Joi = require('joi')
Joi.objectId = require('joi-objectId')(Joi)

const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')

const mongoose = require('mongoose')

 // process.on(‘uncaughtException’) to catch unhandled exceptions, and
 // process.on(‘unhandledRejection’) to catch rejected promises.
 // should log the exception and exit the process,
 // because the process may be in an unclean state
 // In production, use a process manager to automatically restart a Node process.
 
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
// setting env var in terminal
// export movie_jwtPrivate Key=skey

if (!config.get('jwtPrivateKey')) {
    console.error('Fatal Errror', 'jwtPrivateKey is not defined');
    process.exit(1)
}

app.use(bodyParser.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)

app.use(error)

mongoose.connect('mongodb://localhost/movie', {useNewUrlParser: true})
   .then(() => console.log('connected to MongoDB'))
   .catch(err => console.log('Err', err))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
