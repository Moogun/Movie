const winston = require('winston')
const express = require('express');
const app = express();

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
// require('./startup/validation')()

if (process.env.NODE_ENV === 'production') {
    require('./startup/prod')(app)
}



// throw new Error('sth sth')
// setTimeout(() => {
//     throw new Error('hello world');
//   }, 250);
// const p = Promise.reject(new Error(' miserable'))
// p.then(() => {
//     console.log('done');
// })

const port = process.env.PORT || 3000;
// app.listen(port, () => winston.info(`Listening on port ${port}...`));
// const server = app.listen(port, () => winston.add(
    // new winston.transports.Console((`Listening on port ${port}...`))
// ));
app.listen(port, () => winston.add(
    new winston.transports.Console((`Listening on port ${port}...`))
));


// module.exports = server
