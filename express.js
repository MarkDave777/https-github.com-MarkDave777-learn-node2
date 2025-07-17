// express.js
require('dotenv').config();  // read .env file
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyparser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000; // env var or fallback

// GET /            → welcome
app.get('/', (req, res) => res.send('Hello Express!'));
app.use(bodyparser.json());


// GET /users       → list all
app.get('/users', async (req, res) =>{
    try {
        const raw = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
        res.json(JSON.parse(raw));
    }
    catch (err) {
        res.status(500).json({error: 'Could not read users'});
    }
});

// GET /users/:id   → single user
app.get('/users/:id', async (req, res) =>{
    try {
        const raw = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
        const users = JSON.parse(raw);
        const user  = users[req.params.id];
        if (!user) return res.status(404).json({error: 'User not found'});
        res.json({id: req.params.id, name: user});
    }
    catch (err){
        res.status(500).json({error: 'Server error'});
    }
});


// POST /users   → create a new user
app.post('/users', async (req, res) => {
    try {
        const {name} = req.body;
        if (!name) return res.status(400).json({error: 'name is required'});
        const raw = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
        const users = JSON.parse(raw);
        const ids = Object.keys(users).map(Number);
        const newID = (Math.max(...ids, 0) + 1).toString();

        users[newID] = name;
        await fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));

        res.status(201).json({ id: newID, name});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server Error'});
    }
});


app.listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}`)
);