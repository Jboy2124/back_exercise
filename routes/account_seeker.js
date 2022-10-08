const express = require('express');
const router = express.Router();
const Account = require('../controllers/http/handlers/account_seeker');

module.exports = router
    .post('/account', Account.post)
    .post('/login', Account.login);