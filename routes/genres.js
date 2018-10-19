const { Genre, validate } = require('../models/Genre')

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Romance'}
]

module.exports = (app) => {
    app.get('/api/genres', (req, res) => {
        res.send(genres)
    })

    app.post('/api/genres', (req, res) => {
        console.log('req', req.body);
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const genre = {
             id: genres.length + 1,
             name: req.body.name
        }
        genres.push(genre)
        res.send(genre)
    })

    app.put('/api/genres/:id', (req, res) => {
        // let 0 = genres.filter(f => f.id == req.body.id)
        //
        const genre = genres.find(c => c.id === parseInt(req.params.id))
        if (!genre) return res.status(404).send('The genre was not found')

        const { error } = validate(req.body)
        if ( error ) return res.status(400).send(error.details[0].message)

        genre.name = req.body.name
        res.send(genre)
     })

    app.delete('/api/genres/:id', (req, res) => {
        const genre = genres.find(c => c.id === parseInt(req.params.id))
        if (!genre) return res.status(404).send('The genre was not found')

        const index = genres.indexOf(genre)
        genres.splice(index, 1)
        res.send(genres)
    })

    app.get('/api/genres/:id', (req, res) => {
        const genre = genres.find(c => c.id === parseInt(req.params.id))
        if(!genre) return res.status(404).send('The genre was not found')
        res.send(genre)
    })
}
