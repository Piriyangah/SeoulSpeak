const pg = require('pg');
require('dotenv').config();

const client = new pg.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

client.connect(err => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log(`Connected to database: ${process.env.PGDATABASE}`);
    }
});

module.exports = client;
