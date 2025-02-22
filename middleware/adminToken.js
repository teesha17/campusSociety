const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
    
    let token;

    if (process.env.NODE_ENV !== 'development') {
        token = req.cookies.adminToken;
    } else {
        token = req.headers['adminauthorize'];
    }

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateAdmin;
