require('express-async-errors');
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

const error = require('./middlewares/error')


const mongoose = require('mongoose')

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
