const { Client } = require('pg');
const express = require('express');
const session = require('express-session');

let pg = new Client({
    connection: process.env.DATABASE_URL || "postgres://postgres:dana@localhost:5433/nodelogin",
    ssl: {
        require: false,
        rejectUnauthorized: false
    }
});

(async () => {
    try {
        await pg.connect();
        const createTableQuery = `create table if not exists accounts (id serial primary key, username varchar(255) not null, password varchar(255) not null);`
        await pg.query(createTableQuery);
        console.log(`Table 'accounts' successfully created.`);
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
            const {rows} = await pg.query(query, [username, password]);
            if (rows.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                response.send(`Incorrect Username and/or Password!`);
            }
        } catch (error) {
            throw error;
        } finally {
            response.end();
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
            response.redirect('/home');
        } catch (error) {
            throw error;
        } finally {
            response.end();
        }
    } else {
        response.send(`Please enter Username and Password!`);
        response.end();
    }
})

app.get('/home', (request, response) => {
    if (request.session.loggedin) {
        response.send(`Welcome back, ${request.session.username}!`);
    } else {
        response.send(`Please login to view this page!`);
    }
    response.end();
});

app.listen(process.env.PORT || 3000);