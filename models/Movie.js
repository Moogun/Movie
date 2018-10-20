const Joi = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose
const { genreSchema } = require('./Genre')

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }

})

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    }
    return Joi.validate(movie, schema)
}

const Movie = mongoose.model('movies', movieSchema)
exports.Movie = Movie
exports.movieSchema = movieSchema
exports.validate = validateMovie
