const winston = require('winston');
const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect('mongodb://localhost/movie', {useNewUrlParser: true})
       .then(() => winston.add(new winston.transports.Console('connected to db')))
       // .catch(err => console.log('Err', err))
}
