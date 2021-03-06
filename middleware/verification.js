const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decodedUser) => {
            if (err || !decodedUser) return res.status(401).json({error: 'Unauthorized access'});
            req.user = decodedUser;
            next();
        }
    )
}

module.exports = verifyToken;