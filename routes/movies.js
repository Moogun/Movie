const express = require('express');
const router = express.Router()
const { Movie, validate } = require('../models/Movie')
const { Genre } = require('../models/Genre')

router.get('/', async (req, res) => {
    const movie = await Movie.find({})
    res.send(movie)
})

router.post('/', async (req, res) => {
    console.log('req', req.body);
    const { error } = validate(req.body)
    if (error) res.status(404).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('Invaid genre')

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    await movie.save()
    res.send(movie)
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error) res.status(404).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('Invaid genre')

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {new: true})

    if (!movie) res.status(404).send('No movie found')
    res.send(movie)
})

module.exports = router
