const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Romance'}
]

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.post('/api/genres', (req, res) => {
    console.log('req', req.body);
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
