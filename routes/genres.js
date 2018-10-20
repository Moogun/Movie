const { Genre, validate } = require('../models/Genre')

module.exports = (app) => {
    app.get('/api/genres', async (req, res) => {
        const genres = await Genre.find({})
        res.send(genres)
    })

    app.post('/api/genres', async (req, res) => {
        console.log('req', req.body);
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const genre = new Genre({
            name: req.body.name
        })
        await genre.save()
        res.send(genre)
    })

    app.put('/api/genres/:id', async (req, res) => {
        const { error } = validate(req.body)
        if ( error ) return res.status(400).send(error.details[0].message)

        const genre = await Genre.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        }, {new: true})

        if (!genre) return res.status(404).send('The genre was not found')

        res.send(genre)
     })

    app.delete('/api/genres/:id', async (req, res) => {
        const genre = await Genre.findOneAndDelete(req.params.id)
        if (!genre) return res.status(404).send('The genre was not found')

        res.send(genre)
    })

    app.get('/api/genres/:id', async (req, res) => {
        const genre = await Genre.findById(req.params.id)
        if(!genre) return res.status(404).send('The genre was not found')
        res.send(genre)
    })
}
