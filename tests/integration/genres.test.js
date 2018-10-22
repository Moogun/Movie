const request = require('supertest');
const { Genre } = require('../../models/Genre');
let server;

describe('/api/genres', () => {

    beforeEach(() => { server = require('../../index')})
    afterEach(async () => {
        server.close()
        await Genre.remove({})
    })

    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                {name: 'genre1'},
                {name: 'genre2'}
            ])

            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy()
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy()
        })
    })

    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            const genre = new Genre({name: 'genre1'})
            await genre.save()

            const res = await request(server).get('/api/genres/' + genre._id )
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('name', genre.name)
            // expect(res.body._id).toMatchObject(genre._id)
            // res.body._id is string
            // this will fail cause genre._id prop is an obj

        })
    })

    it('should return 404 if no genre matched found', async () => {
        const res = await request(server).get('/api/genres/1')
        expect(res.status).toBe(404)
    })
})
