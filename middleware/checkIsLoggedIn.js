const jwt = require('jsonwebtoken');

const verifyAuthToken = (req, res, next) => {
    try {
        const token = req.cookies['auth-token'];
        if (!token) {
            return res.status(401).json({ message: 'Not logged in' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user details to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = verifyAuthToken;
