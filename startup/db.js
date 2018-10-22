const winston = require('winston');
const mongoose = require('mongoose')
const config = require('config');

module.exports = function () {
    const db = config.get('db')
    mongoose.connect(db, {useNewUrlParser: true})
       .then(() => winston.info(`connected to ${db}`))
       // .then(() => winston.add(new winston.transports.Console(`connected to ${db}`)))
       // .catch(err => console.log('Err', err))
}
