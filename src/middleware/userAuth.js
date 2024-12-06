const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({
            error: true,
            message: 'No token provided',
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({
            error: true,
            message: 'Token missing in authorization header',
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                error: true,
                message: 'Invalid or expired token',
            });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = userAuth;
