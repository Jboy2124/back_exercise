require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    async verifyToken(req, res, next) {
        try {
            const header = req.body.token || 
                            req.query.token || 
                            req.headers['x-access-token'] || 
                            req.headers['authorization'];

            const token = header.split(" ")[1];
            if(!token) {
                return res.status(403).send("Invalid Token")
            } else {
                const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
                // req.user = verifiedToken;
                req.token = verifiedToken;
            }
        } catch (error) {
            return res.status(401).send('Unauthorized');
        }
        return next();
    }
}
