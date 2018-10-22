// Unit test for req.user part 
/*
try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
    req.user = decoded
    next()
}
*/

const { User } = require('../../../models/User')
const auth = require('../../../middlewares/auth')
const mongoose = require('mongoose')

describe('auth middleware', () => {
    it('should populate req.user with the payload of a valid JWT', () => {
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        }
        const token = new User(user).generateAuthToken()
        const req = {
            header: jest.fn().mockReturnValue(token)
        }
        const res = {}
        const next = jest.fn()

        auth(req, res, next)

        expect(req.user).toMatchObject(user)
    })
})
