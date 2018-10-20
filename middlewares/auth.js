const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('Access denied. No token provided')

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        console.log(decoded, decoded);
        req.user = decoded
        next()
    }
    catch (ex) {
        res.status(400).send('Invalid token')
    }
}
