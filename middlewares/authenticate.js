const jwt = require('jsonwebtoken')
require('dotenv').config()

const isAuthenticated = (req, res, next) => {
    if (res.locals.loggedin) {
        next()
    } else {
        return res.status(401).json('You do not have access')
    }
}

const generateJwtToken = (user) => {
    const jwtToken = jwt.sign(
        user, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: 3600 * 1000 }
    )

    return jwtToken
}

const checkJwtToken = (req, res, next) => {
    if (req.cookies.jwt) {
        jwt.verify(
         req.cookies.jwt,
         process.env.ACCESS_TOKEN_SECRET,
         (err, user) => {
          if (err) {
           res.clearCookie("jwt")
           return res.status(400).json(err)
          }
          res.locals.user = user;
          res.locals.loggedin = 1
          next()
         })
    } else {
        next()
    }
}

module.exports = { isAuthenticated, checkJwtToken, generateJwtToken }