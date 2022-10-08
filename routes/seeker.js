const express = require('express');
const router = express.Router();
const Seeker = require('../controllers/http/handlers/seeker');
const Auth = require('../utils/middleware/auth');

module.exports = router
    .get('/', Auth.verifyToken, Seeker.initialLoad)
    .post('/seeker', Auth.verifyToken, Seeker.post)
    .patch('/seeker/:id', Auth.verifyToken, Seeker.patch)
    .get('/seeker', Auth.verifyToken, Seeker.get)