const mongoose = require('mongoose')
const { Schema } = mongoose

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const Genre = mongoose.model('genres', genreSchema)
module.exports = Genre
