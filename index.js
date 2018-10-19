const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Joi = require('joi')
const genres = require('./routes/genres')

app.use(bodyParser.json())
genres(app)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
