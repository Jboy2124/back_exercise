require('dotenv').config();
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOSTNAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    },
    pool: { min: 0, max: 7 }
});

module.exports = knex;