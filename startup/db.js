const winston = require('winston');
const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect('mongodb://localhost/movie', {useNewUrlParser: true})
       .then(() => winston.info('connected to MongoDB'))
       // .catch(err => console.log('Err', err))
}
