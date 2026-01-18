const jwt = require('jsonwebtoken');


const verifyAuth
 = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access token is missing or invalid' });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: user.userId,
            role: user.role,
        };
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = {
    verifyAuth,
};

