const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'skibidi',
  database: 'test_db'
});

app.post('/create', (req, res) => {
    db.query("INSERT INTO items (name, price) VALUES ('skibidi toilet', 100)", (err, results) => {
      if (err) throw err;
      console.log('Inserted new item');
      db.query("SELECT * FROM items ORDER BY id DESC LIMIT 1", (err, results) => {
        if (err) throw err;
        res.send(results[0]);
      });
    });
  });

app.get('/data', (req, res) => {
    db.query("SELECT * FROM items WHERE name = 'skibidi toilet' LIMIT 1", (err, results) => {
      if (err) throw err;
      res.send(results[0]);
    });
  });;

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});