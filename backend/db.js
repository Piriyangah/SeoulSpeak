const pg = require('pg');

const client = new pg.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    // Render: requires SSL connection
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection to DB ...');
    }
});

module.exports = client;