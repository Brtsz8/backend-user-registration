const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']
    if(!token) {return res.status(401).json({message: "NO TOKEN PROVIDED!"})}

    jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
        if(err) {return res.status(401).json({message: "INVALID TOKEN"})}
        req.userId = decoded.id
        next()
    })
}

module.exports = authMiddleware