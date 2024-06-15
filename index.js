const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const session = require('express-session');
const bodyParser = require('body-parser');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // Add this line to enable parsing of JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'skibidi',
  database: 'test_db'
});

app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
  }));

app.get('/papers', (req, res) => {
    const sql = 'SELECT * FROM papers';

    db.query(sql, (error, results) => {
        if (error) {
        console.error(error);
        res.status(500).send('Server error');
        } else {
        res.json(results);
        }
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
        if (err) throw err;
        // Continue to next step
        // Inside the db.query callback
        if (results.length > 0) {
            const user = results[0];
            if (password === user.password) {
                res.send('Login successful');
                console.log('Login successful');
                console.log(user.id);
                req.session.userId = user.id;
            } 
            else {
                res.send('Incorrect password');
            }
        } 
        else {
            res.send('User not found');
        }
    });
  });


app.post('/addUser', (req, res) => {
    const { username, password } = req.body;
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, password], (err, result) => {
        if (err) throw err;
        console.log('User added successfully');
        res.send('User added successfully');
    });
});

app.post('/addPaper', (req, res) => {
    console.log(req.body); // Add this line
    const { title, date, author, description} = req.body;
    const query = "INSERT INTO papers (title, date, author, description) VALUES (?, ?, ?, ?)";
    db.query(query, [title, date, description, author], (err, result) => {
        if (err) throw err;
        console.log('Paper added successfully');
        res.send('Paper added successfully');
    });
});




app.get('/dataUsers', (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });;

app.get('/dataPapers', (req, res) => {
    db.query("SELECT * FROM papers", (err, results) => {
        if (err) throw err;
        res.send(results);
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