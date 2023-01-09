const jsonwebtoken = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    // return next()
    const authr = req.headers.authorization
    if (!authr) {
        return false
    }
    const [, token] = authr.split(' ')
    if (!token) {
        return false
    }
    try {
        const decoded = jsonwebtoken.verify(token, process.env.SECRET)
        return next()
    } catch (error) {
        return false
    }
}
