const config = require('config')

module.exports = function () {
    // setting env var in terminal
    // export movie_jwtPrivate Key=skey

    if (!config.get('jwtPrivateKey')) {
        // console.error('Fatal Errror', 'jwtPrivateKey is not defined');
        throw new Error('Fatal Errror', 'jwtPrivateKey is not defined');
        process.exit(1)
    }
}
