const { Client } = require('pg');
const express = require('express');
const session = require('express-session');
const path = require('path');

let pg = new Client({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:dana@localhost:5433/nodelogin",
    ssl: process.env.DATABASE_URL ? {
        require: false,
        rejectUnauthorized: false
    } : false
});

(async () => {
    try {
        await pg.connect();
        const createTableQuery = `create table if not exists accounts (id serial primary key, username varchar(255) not null, password varchar(255) not null);`
        await pg.query(createTableQuery);
    } catch (error) {
        console.error(error);
    }
})();

let app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

app.post('/login', async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    if (username && password) {
        try {
            const query = 'SELECT * FROM accounts WHERE username = $1 AND password = $2;';
            const { rows } = await pg.query(query, [username, password]);
            if (rows.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('welcome');
            } else {
                response.send(`Incorrect Username and/or Password!`);
                response.end();
            }
        } catch (error) {
            throw error;
        }
    } else {
        response.send(`Please enter Username and Password!`);
        response.end();
    }
});

app.post('/register', async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    if (username && password) {
        try {
            const query = 'INSERT INTO accounts (username, password) VALUES ($1, $2);';
            await pg.query(query, [username, password]);
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('welcome');
        } catch (error) {
            throw error;
        }
    } else {
        response.send(`Please enter Username and Password!`);
        response.end();
    }
})

app.get('/welcome', async (request, response) => {
    response.cookie('username', request.session.username);
    response.sendFile(path.join(__dirname, '/public/welcome.html'));
})

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`App listening on port ${port}`));