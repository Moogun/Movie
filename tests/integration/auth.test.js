const request = require('supertest');
const { Genre } = require('../../models/Genre');
const { User } = require('../../models/User');

describe('auth middleware', () => {
    beforeEach(() => { server = require('../../index')})
    afterEach( async () => {
        await server.close()
        await Genre.remove({})
    })

    it('should return 401 if no token is provided', async () => {
        const token = ''
        const res = await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({name: 'auth test0'})

        expect(res.status).toBe(401)
    })

    it('should return 400 if token is invalid', async () => {
        const token = 'a'
        const res = await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({name: 'auth test1'})

        expect(res.status).toBe(400)
    })

    it('should return 200 if token is valid', async () => {
        const token = new User().generateAuthToken()
        const res = await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({name: 'auth test2'})

        expect(res.status).toBe(200)
    })

})
