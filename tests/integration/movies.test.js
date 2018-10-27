const request = require('supertest');
const { Movie } = require('../../models/Movie');
const { Genre } = require('../../models/Genre');
const { User } = require('../../models/User');
const mongoose = require('mongoose')

let server;

describe('/api/movies', () => {
    beforeEach(() => { server = require('../../index')})
    afterEach(async () => {
        await Movie.remove({})
        await Genre.remove({})
        await server.close()
    })

    describe('GET /', () => {
        it('should return all movies', async () => {
            const genreId = new mongoose.Types.ObjectId().toHexString()
            await Movie.collection.insertMany([
                {
                    title: 'movie1',
                    genreId: genreId,
                    "numberInStock": 10,
                    "dailyRentalRate": 10
                },
                {
                    title: 'movie2',
                    genreId: genreId,
                    "numberInStock": 10,
                    "dailyRentalRate": 10
                }
            ])
            const res = await request(server).get('/api/movies')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some(m => m.title === 'movie1')).toBeTruthy()
            expect(res.body.some(m => m.title === 'movie2')).toBeTruthy()
        })
    })

    describe('GET /:id', () => {
        it('should return a movie if valid id is passed', async () => {
            const genre = new Genre({name: 'genre1'})
            await genre.save()

            const movie = new Movie({title: 'Movie1',
            genre: {
                _id: genre._id,
                name: genre.name
            },
            dailyRentalRate: 10, numberInStock: 10})
            await movie.save()

            const res = await request(server).get('/api/movies/' + movie._id)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('title', movie.title)
            // expect(res.body).toHaveProperty('Movie1', movie.title)
        })

        it('should return 404 if no genre matched found', async () => {
            const res = await request(server).get('/api/movies/1')
            expect(res.status).toBe(404)
        })
    })

    describe('POST /', () => {

        it('should return 401 if a client is not logged in', async () => {
            let token = ''
            const genre = new Genre({name: 'genre1'})
            await genre.save()
            const movie = new Movie({title: 'Movie1',
            genre: {
                _id: genre._id,
                name: genre.name
            },
            dailyRentalRate: 10, numberInStock: 10})

            await movie.save()
            const res = await request(server)
            .post('/api/movies')
            .set('x-auth-token', token)
            .send({title: movie.title})

            expect(res.status).toBe(401)

        })

        it('should return 400 if movie title length is shorter than 5', async () => {
            let token = new User().generateAuthToken()
            const genre = new Genre({name: 'genre1'})
            await genre.save()
            const movie = new Movie({title: 'Movie1',
            genre: {
                _id: genre._id,
                name: genre.name
            },
            dailyRentalRate: 10, numberInStock: 10})
            await movie.save()
            movie.title = 'movi'
            const res = await request(server)
            .post('/api/movies')
            .set('x-auth-token', token)
            .send({title: movie.title})

            expect(res.status).toBe(400)
        })

        it('should return 400 if movie title length is longer than 50 characters ', async () => {

            let token = new User().generateAuthToken()
            const genre = new Genre({name: 'genre1'})
            await genre.save()
            const movie = new Movie({title: 'Movie1',
            genre: {
                _id: genre._id,
                name: genre.name
            },
            dailyRentalRate: 10, numberInStock: 10})
            await movie.save()
            movie.title = new Array(52).join('a')
            const res = await request(server)
            .post('/api/movies')
            .set('x-auth-token', token)
            .send({title: movie.title})

            expect(res.status).toBe(400)
        })

        it('should save the movie if it is valid', async () => {
            const token = new User().generateAuthToken()

            const genre = new Genre({name: 'genre1'})
            await genre.save()

            const res = await request(server)
            .post('/api/movies')
            .set('x-auth-token', token)
            .send({title: 'Movie1',
            genre: {
                _id: genre._id,
                name: genre.name
            },
            dailyRentalRate: 10, numberInStock: 10})
expect(res.status).toBe(200)
            const movie = Movie.find({title: 'Movie1'})
            expect(movie).not.toBeNull()
            expect(movie).toHaveProperty('title', movie.title)
        })

        it('should return the movie if it is valid', async () => {
            const token = new User().generateAuthToken()

            const genre = new Genre({name: 'genre1'})
            await genre.save()

            const res = await request(server)
            .post('/api/movies')
            .set('x-auth-token', token)
            .send({title: 'Movie1',
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
                dailyRentalRate: 10, numberInStock: 10})

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('_id')
        })
    })

})
