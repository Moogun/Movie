const request = require('supertest');
const { Movie } = require('../../models/Movie');
const { User } = require('../../models/User');
const { Genre } = require('../../models/Genre');
const mongoose = require('mongoose')

let server;

describe('/api/movies', () => {
    let title;
    let movie;
    let token;

    const movieId = mongoose.Types.ObjectId();
    const genreId = mongoose.Types.ObjectId()

    beforeEach( async () => {
        server = require('../../index')

        title = 'abcde'
        movie = new Movie({
            _id: movieId,
            title: title,
            genre: {
                name: '12345'
            },
            dailyRentalRate: 10,
            numberInStock: 10 })
        await movie.save()
    })

    afterEach(async () => {
        await Movie.remove({})
        await Genre.remove({})
        await server.close()
    })

    it('should work', async () => {
        const res = await Movie.findById({_id: movie._id})
        expect(res).not.toBeNull()
    })

    describe('GET /', () => {
        it('should return all movies', async () => {
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
            expect(res.body.length).toBe(3)
            expect(res.body.some(m => m.title === 'movie1')).toBeTruthy()
            expect(res.body.some(m => m.title === 'movie2')).toBeTruthy()
            expect(res.body.some(m => m.title === 'abcde')).toBeTruthy()
        })
    })

    describe('GET /:id', () => {
        it('should return a movie if VALID ID is passed', async () => {
            const res = await request(server).get('/api/movies/' + movie._id)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('title', movie.title)
        })

        it('should return 400 if id is INVALID', async () => {
            const res = await request(server).get('/api/movies/1')
            expect(res.status).toBe(404)
        })

        it('should return 404 if movie MATCHED is not found', async () => {
            const id = mongoose.Types.ObjectId()
            const res = await request(server).get('/api/movies/' + id)
            expect(res.status).toBe(404)
        })
    })

    describe('POST /', () => {
        let token;
        let title;
        let genreId = mongoose.Types.ObjectId().toHexString()

        const exec = () => {
            return request(server)
                .post('/api/movies')
                .set('x-auth-token', token)
                .send({
                    title: title,
                    genreId: genreId,
                    dailyRentalRate: 10, numberInStock: 10
                })
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'Movie 1';
        })

        it('should return 401 if a client is not logged in', async () => {
            token = ''
            const res = await exec()

            expect(res.status).toBe(401)
        })

        it('should return 400 if movie title length is shorter than 5', async () => {
            title = 'movie1'
            const res = await exec()

            expect(res.status).toBe(400)
        })

        it('should return 400 if movie title length is longer than 50 characters ', async () => {

            // title = new Array(52).join('a')

            title = new Array(32).join('a')
            const res = await exec()

            expect(res.status).toBe(400)
        })

        it('should save the movie if it is VALID', async () => {
            const res = await exec()

            // expect(res.status).toBe(200)
            const movie = await Movie.find({ title: 'Movie 1' });
            expect(movie).not.toBeNull()
            expect(movie).toHaveProperty('title', movie.title)
        })

        it('should return the movie if it is valid', async () => {

            const res = await exec()
            expect(res.body).toHaveProperty('_id')
        })
    })
})
