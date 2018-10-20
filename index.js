const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Joi = require('joi')
const genres = require('./routes/genres')
const customers = require('./routes/customers')

const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)

mongoose.connect('mongodb://localhost/movie')
   .then(() => console.log('connected to MongoDB'))
   .catch(err => console.log('Err', err))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
