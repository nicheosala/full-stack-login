import { createPool } from 'mariadb';
import express from 'express';
import session from 'express-session';

let pool = createPool(process.env.JAWSDB_MARIA_URL);
// JAWSDB_MARIA_URL=mariadb://root:mariadbpass@localhost:3306/nodelogin node login.js

const connection = await pool.getConnection();
await connection.query('CREATE DATABASE IF NOT EXISTS `nodelogin`');
await connection.query('USE `nodelogin`');
await connection.query('CREATE TABLE IF NOT EXISTS `accounts` (`id` INT AUTO_INCREMENT PRIMARY KEY, `username` varchar(50) NOT NULL, `password` varchar(255) NOT NULL)');

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
            const query = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
            const rows = await connection.query(query, [username, password]);
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
            const query = 'INSERT INTO `accounts` (`username`, `password`) VALUES (?, ?)';
            await connection.query(query, [username, password]);
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

app.listen(3000);