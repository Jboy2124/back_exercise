require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    async signin(payload) {
        try {
            const token = jwt.sign({ data: payload }, process.env.JWT_SECRET_KEY, {
                algorithm: 'HS384',
                expiresIn: process.env.JWT_EXPIRY
            })
            return token;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async verify(token) {
        try {
            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
            return verifiedToken;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}