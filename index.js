const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'skibidi',
  database: 'test_db'
});

app.get('/firstItem', (req, res) => {
    db.query("SELECT * FROM items ORDER BY id ASC LIMIT 1", (err, results) => {
      if (err) throw err;
      res.send(results[0]);
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