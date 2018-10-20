const express = require('express');
const router = express.Router()
const { Movie, validate } = require('../models/Movie')

router.get('/', async (req, res) => {
    const movie = await Movie.find({})
    res.send(movie)
})

module.exports = router
