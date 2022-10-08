require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 5000;

const Seeker = require('./routes/seeker');
const Accounts = require('./routes/account_seeker');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Seeker);
app.use(Accounts);

app.listen(port, () => {
    console.log('Server is running at port:', port);
});