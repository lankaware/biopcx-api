import jsonwebtoken from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {

    //return next()
    
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
        // const userPassw = decode.passw
        return next()
    } catch (error) {
        return false
    }
}

export default verifyToken