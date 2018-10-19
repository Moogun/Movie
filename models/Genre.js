const Joi = require('joi')
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

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

const Genre = mongoose.model('genres', genreSchema)
exports.Genre = Genre
exports.validate = validateGenre
