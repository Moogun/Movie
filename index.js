const winston = require('winston')
const express = require('express');
const app = express();

require('./startup/logging')
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()

// throw new Error('sth sth')
// const p = Promise.reject(new Error(' miserable'))
// p.then(() => {
//     console.log('done');
// })

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
