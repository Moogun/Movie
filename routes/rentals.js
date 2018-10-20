const express = require('express');
const router = express.Router()
const { Rental, validate } = require('../models/Rental')
const { Movie } = require('../models/Movie')
const { Customer } = require('../models/Customer')
const Fawn = require('fawn')
const mongoose = require('mongoose')

Fawn.init(mongoose)

router.get('/', async (req, res) => {
    const rental = await Rental.find({})
    res.send(rental)
})

router.post('/', async (req, res) => {
    console.log('req ', req.body.customerId, req.body.movieId);
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId)
    if(!movie) res.status(404).send('No movie found')

    if (movie.numberInStock === 0) return res.status(400).send('Movie not int stock')

    const customer = await Customer.findById(req.body.customerId)
    if(!customer) res.status(404).send('No custoer found')

    const rental = new Rental({
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        }
    })

    new Fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id: movie._id}, {
            $inc: {numberInStock: -1}
        })
        .run()
        
    res.send(rental)
})

router.put('/:id', async (req, res) => {

})

router.delete('/:id', async (req, res) => {
    const rental = await Rental.findOneAndDelete(req.params.id)
    if (!rental) res.status(400).send('Wrong rental Id')
    res.send(rental)
})

router.get('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const rental = await Rental.findById(req.params.id)
    if (!rental) res.status(400).send('Wrong rental Id')
    res.send(rental)
})
module.exports = router
